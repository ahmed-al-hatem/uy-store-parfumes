"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import { fetchSuggestions, type Suggestions } from "@/lib/api";
import { formatPrice } from "@/lib/config";

const RECENT_KEY = "uy-recent-searches";
const DEBOUNCE_MS = 250;

function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]).slice(0, 5) : [];
  } catch {
    return [];
  }
}

function writeRecent(list: string[]) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 5)));
  } catch {
    // Storage blocked: recent searches simply are not remembered.
  }
}

type Option =
  | { kind: "recent"; id: string; label: string }
  | { kind: "product"; id: string; item: Suggestions["products"][number] }
  | { kind: "brand"; id: string; slug: string; label: string }
  | { kind: "note"; id: string; label: string };

type SearchBoxProps = {
  value: string;
  /** Debounced: writes the query to the URL. */
  onQuery: (q: string) => void;
  onBrand: (slug: string) => void;
  onNote: (note: string) => void;
};

/**
 * Debounced, accent-insensitive search with an ARIA combobox: instant
 * suggestions (products, houses, notes) while typing, recent searches when empty.
 */
export function SearchBox({ value, onQuery, onBrand, onNote }: SearchBoxProps) {
  const id = useId();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const abort = useRef<AbortController>(undefined);
  const [text, setText] = useState(value);
  const [synced, setSynced] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [focusParam, setFocusParam] = useQueryState("focus", { history: "replace", shallow: true });

  // The URL can change underneath us (back button, "Clear all"): follow it.
  if (value !== synced) {
    setSynced(value);
    setText(value);
  }

  // The header's Search link lands here with ?focus=search.
  useEffect(() => {
    if (focusParam !== "search") return;
    inputRef.current?.focus({ preventScroll: false });
    void setFocusParam(null);
  }, [focusParam, setFocusParam]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const trimmed = text.trim();
  const options: Option[] = trimmed
    ? [
        ...(suggestions?.products ?? []).map((item) => ({ kind: "product" as const, id: `p-${item.slug}`, item })),
        ...(suggestions?.brands ?? []).map((b) => ({ kind: "brand" as const, id: `b-${b.slug}`, slug: b.slug, label: b.name })),
        ...(suggestions?.notes ?? []).map((n) => ({ kind: "note" as const, id: `n-${n}`, label: n })),
      ]
    : recent.map((r) => ({ kind: "recent" as const, id: `r-${r}`, label: r }));
  const expanded = open && options.length > 0;
  const optionId = (i: number) => `${id}-opt-${i}`;

  function remember(q: string) {
    if (!q) return;
    const next = [q, ...readRecent().filter((r) => r.toLowerCase() !== q.toLowerCase())];
    writeRecent(next);
    setRecent(next.slice(0, 5));
  }

  function change(next: string) {
    setText(next);
    setActive(-1);
    setOpen(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onQuery(next.trim());
      abort.current?.abort();
      if (!next.trim()) return setSuggestions(null);
      const controller = new AbortController();
      abort.current = controller;
      fetchSuggestions(next.trim(), controller.signal)
        .then(setSuggestions)
        .catch(() => undefined);
    }, DEBOUNCE_MS);
  }

  function submit(q = trimmed) {
    clearTimeout(timer.current);
    onQuery(q);
    remember(q);
    setOpen(false);
  }

  function choose(option: Option) {
    setOpen(false);
    switch (option.kind) {
      case "recent":
        setText(option.label);
        return submit(option.label);
      case "product":
        remember(trimmed);
        return router.push(`/product/${option.item.slug}`);
      case "brand":
        setText("");
        onQuery("");
        return onBrand(option.slug);
      case "note":
        setText("");
        onQuery("");
        return onNote(option.label);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      if (!options.length) return;
      // Cycle through -1 (the input itself) and every option.
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => {
        const next = i + step;
        if (next >= options.length) return -1;
        if (next < -1) return options.length - 1;
        return next;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (expanded && active >= 0) choose(options[active]);
      else submit();
    } else if (e.key === "Escape") {
      if (expanded) setOpen(false);
      else if (text) change("");
    }
  }

  const optionProps = (option: Option) => {
    const index = options.indexOf(option);
    return {
      id: optionId(index),
      role: "option" as const,
      "aria-selected": active === index,
      onMouseDown: (e: MouseEvent) => e.preventDefault(),
      onClick: () => choose(option),
      onMouseEnter: () => setActive(index),
      className: `flex min-h-touch w-full cursor-pointer items-center gap-13 px-16 text-start text-body-sm lg:px-32 ${
        active === index ? "underline decoration-1 underline-offset-4" : ""
      }`,
    };
  };

  const products = options.filter((o) => o.kind === "product");
  const brands = options.filter((o) => o.kind === "brand");
  const notes = options.filter((o) => o.kind === "note");

  return (
    <div className="relative">
      <div className="flex items-center gap-13 border-b border-line px-16 lg:px-32">
        <SearchIcon aria-hidden="true" />
        <label htmlFor={`${id}-input`} className="sr-only">
          Search by name, house or note
        </label>
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="search"
          role="combobox"
          aria-expanded={expanded}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={expanded && active >= 0 ? optionId(active) : undefined}
          autoComplete="off"
          enterKeyHint="search"
          placeholder="Search by name, house or note"
          value={text}
          onChange={(e) => change(e.target.value)}
          onFocus={() => {
            setRecent(readRecent());
            setOpen(true);
          }}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className="min-h-[52px] w-full bg-transparent text-body placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {text && (
          <button type="button" onClick={() => change("")} aria-label="Clear search" className="inline-flex min-h-touch min-w-touch items-center justify-end">
            <CloseIcon />
          </button>
        )}
      </div>

      <div
        id={`${id}-list`}
        role="listbox"
        aria-label={trimmed ? "Suggestions" : "Recent searches"}
        hidden={!expanded}
        className="absolute inset-x-0 top-full z-30 max-h-[70dvh] overflow-y-auto border-b border-line bg-canvas py-10 data-[open=true]:animate-fade-in"
        data-open={expanded}
      >
        {!trimmed && (
          <div className="flex items-center justify-between px-16 pb-4 lg:px-32" role="presentation">
            <span className="text-caption uppercase">Recent searches</span>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                writeRecent([]);
                setRecent([]);
              }}
              className="min-h-touch text-caption underline decoration-1 underline-offset-4"
            >
              Clear
            </button>
          </div>
        )}
        {!trimmed && options.map((o) => <div key={o.id} {...optionProps(o)}>{o.kind === "recent" && o.label}</div>)}

        {products.length > 0 && <p className="px-16 pb-4 pt-6 text-caption uppercase lg:px-32" role="presentation">Fragrances</p>}
        {products.map((o) =>
          o.kind === "product" ? (
            <div key={o.id} {...optionProps(o)}>
              <span className="relative block size-[44px] shrink-0" style={{ backgroundColor: o.item.images[0].frame }}>
                <Image src={o.item.images[0].src} alt="" width={44} height={44} sizes="44px" className="h-full w-full object-contain" />
              </span>
              <span className="flex-1">
                <span className="block text-caption">{o.item.brandName}</span>
                {o.item.name}
              </span>
              <span className="text-caption">{formatPrice(o.item.priceFrom)}</span>
            </div>
          ) : null,
        )}
        {brands.length > 0 && <p className="px-16 pb-4 pt-10 text-caption uppercase lg:px-32" role="presentation">Houses</p>}
        {brands.map((o) => (o.kind === "brand" ? <div key={o.id} {...optionProps(o)}>{o.label}</div> : null))}
        {notes.length > 0 && <p className="px-16 pb-4 pt-10 text-caption uppercase lg:px-32" role="presentation">Notes</p>}
        {notes.map((o) => (o.kind === "note" ? <div key={o.id} {...optionProps(o)}>Contains {o.label}</div> : null))}
      </div>
    </div>
  );
}
