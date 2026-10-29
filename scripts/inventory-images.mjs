#!/usr/bin/env node
/**
 * Image inventory: ./perfumes  ->  /public/images/products/<slug>/NN.<ext>
 *                              ->  data/product-images.generated.ts
 *
 * Photos are copied byte-for-byte. Nothing is cropped, recoloured or cut out.
 * For each file the script records its real width/height, a tiny blurDataURL,
 * and its edge colour (mean of a thin strip around the four edges), which the
 * product frame uses as its background so empty space blends with the photo.
 *
 * Grouping, in order of precedence:
 *   1. scripts/image-groups.json  "order"    explicit gallery order per product
 *   2. perfumes/products.json                {name, image, gallery} groups
 *   3. file names: "<slug>-1.webp", "<slug>-2.webp" share a product when a
 *      sibling with the same stem exists; any other file is its own product.
 * "exclude" files are skipped; "atmosphere" files go to /public/images/atmosphere.
 *
 * Usage: npm run images
 */
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "perfumes");
const OUT_PRODUCTS = path.join(ROOT, "public", "images", "products");
const OUT_ATMOS = path.join(ROOT, "public", "images", "atmosphere");
const OUT_DATA = path.join(ROOT, "data", "product-images.generated.ts");
const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);

const readJson = async (file, fallback) =>
  existsSync(file) ? JSON.parse(await readFile(file, "utf8")) : fallback;

const config = await readJson(path.join(ROOT, "scripts", "image-groups.json"), {});
const manifest = await readJson(path.join(SRC, "products.json"), []);
const exclude = new Set(config.exclude ?? []);
const atmosphere = new Set(config.atmosphere ?? []);

const files = (await readdir(SRC, { recursive: true }))
  .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
  .map((f) => f.split(path.sep).join("/"))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
const stemOf = (f) => path.basename(f, path.extname(f));
const byStem = new Map(files.map((f) => [stemOf(f), f]));

/** @type {Map<string, string[]>} slug -> file stems in gallery order */
const groups = new Map();
const claimed = new Set();
const claim = (slug, stems) => {
  const list = stems.filter((s) => byStem.has(s) && !claimed.has(s) && !exclude.has(s) && !atmosphere.has(s));
  list.forEach((s) => claimed.add(s));
  if (list.length) groups.set(slug, [...(groups.get(slug) ?? []), ...list]);
};

for (const [slug, stems] of Object.entries(config.order ?? {})) claim(slug, stems);
for (const entry of manifest) {
  if (groups.has(entry.name)) continue;
  claim(entry.name, [entry.image, ...(entry.gallery ?? [])].map(stemOf));
}
for (const f of files) {
  const stem = stemOf(f);
  if (claimed.has(stem) || exclude.has(stem) || atmosphere.has(stem)) continue;
  const m = stem.match(/^(.*)-(\d{1,2})$/);
  const hasSibling =
    m && files.some((o) => o !== f && stemOf(o).startsWith(`${m[1]}-`) && /^\d{1,2}$/.test(stemOf(o).slice(m[1].length + 1)));
  claim(hasSibling ? m[1] : stem, [stem]);
}

const hex = (n) => Math.round(n).toString(16).padStart(2, "0");

async function measure(file) {
  const img = sharp(file).removeAlpha();
  const { width, height } = await img.metadata();
  const band = Math.max(4, Math.round(Math.min(width, height) / 40));
  const strips = [
    { left: 0, top: 0, width, height: band },
    { left: 0, top: height - band, width, height: band },
    { left: 0, top: 0, width: band, height },
    { left: width - band, top: 0, width: band, height },
  ];
  const sum = [0, 0, 0];
  let total = 0;
  for (const region of strips) {
    const { channels } = await sharp(file).removeAlpha().extract(region).stats();
    const px = region.width * region.height;
    channels.slice(0, 3).forEach((c, i) => (sum[i] += c.mean * px));
    total += px;
  }
  const [r, g, b] = sum.map((s) => s / total);
  const blur = await sharp(file).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  return {
    width,
    height,
    frame: `#${hex(r)}${hex(g)}${hex(b)}`,
    luminance: Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b),
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}

await rm(OUT_PRODUCTS, { recursive: true, force: true });
await rm(OUT_ATMOS, { recursive: true, force: true });
await mkdir(path.dirname(OUT_DATA), { recursive: true });

const products = {};
for (const [slug, stems] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
  const dir = path.join(OUT_PRODUCTS, slug);
  await mkdir(dir, { recursive: true });
  products[slug] = [];
  for (const [i, stem] of stems.entries()) {
    const srcFile = path.join(SRC, byStem.get(stem));
    const name = `${String(i + 1).padStart(2, "0")}${path.extname(srcFile).toLowerCase()}`;
    await copyFile(srcFile, path.join(dir, name));
    products[slug].push({ src: `/images/products/${slug}/${name}`, source: byStem.get(stem), ...(await measure(srcFile)) });
  }
}

const atmos = {};
await mkdir(OUT_ATMOS, { recursive: true });
for (const stem of atmosphere) {
  if (!byStem.has(stem)) continue;
  const srcFile = path.join(SRC, byStem.get(stem));
  const name = `${stem}${path.extname(srcFile).toLowerCase()}`;
  await copyFile(srcFile, path.join(OUT_ATMOS, name));
  atmos[stem] = { src: `/images/atmosphere/${name}`, source: byStem.get(stem), ...(await measure(srcFile)) };
}

const banner = "// Generated by scripts/inventory-images.mjs — do not edit by hand. Run `npm run images`.\n";
const body = `import type { SourceImage } from "@/lib/types";

export const productImages: Record<string, SourceImage[]> = ${JSON.stringify(products, null, 2)};

export const atmosphereImages: Record<string, SourceImage> = ${JSON.stringify(atmos, null, 2)};
`;
await writeFile(OUT_DATA, banner + body);

const count = Object.values(products).reduce((n, l) => n + l.length, 0);
console.log(`${Object.keys(products).length} products, ${count} photos, ${Object.keys(atmos).length} atmosphere.`);
const skipped = files.filter((f) => exclude.has(stemOf(f)));
if (skipped.length) console.log(`Excluded: ${skipped.join(", ")}`);
