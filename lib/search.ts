/** Case- and accent-insensitive form: "Hermès" and "hermes" compare equal. */
export function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’'`]/g, "'")
    .toLowerCase()
    .trim();
}

export function tokens(query: string) {
  return normalize(query).split(/\s+/).filter(Boolean);
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Fields a product is searchable by, already normalised. */
export type SearchDoc = { name: string; brand: string; notes: string };

/**
 * Score a document against query tokens. Every token must match somewhere;
 * name matches outrank brand matches, which outrank note matches.
 * Returns 0 when the document does not match.
 */
export function scoreDoc(doc: SearchDoc, queryTokens: string[]) {
  if (!queryTokens.length) return 1;
  let score = 0;
  for (const t of queryTokens) {
    if (doc.name.startsWith(t) || doc.name.includes(` ${t}`)) score += 6;
    else if (doc.name.includes(t)) score += 4;
    else if (doc.brand.includes(t)) score += 3;
    // "rose" should rank Rose above Rosemary, while "ros" still finds both.
    else if (new RegExp(`(^|\\s)${escape(t)}(\\s|$)`).test(doc.notes)) score += 2;
    else if (doc.notes.includes(t)) score += 1;
    else return 0;
  }
  return score;
}
