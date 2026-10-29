// Motion tokens, mirroring the CSS variables in globals.css (DECISIONS.md D-03).
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;
export const EASE_QUIET = [0.4, 0, 0.2, 1] as const;

export const DURATION = { fast: 0.24, base: 0.48, slow: 0.9 } as const;

/** Distance a revealed block rises, in px. Small on purpose: arrival, not travel. */
export const RISE = 24;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
