import { DURATION, EASE_LUXE, prefersReducedMotion } from "./motion";

/**
 * Add-to-bag micro-interaction: a copy of the product photo travels from where
 * it is to the header bag icon and fades out there. Transform and opacity only.
 * Resolves when finished (immediately with reduced motion or no visible target).
 */
export function flyToBag(source: Element | null): Promise<void> {
  const target = [...document.querySelectorAll("[data-cart-target]")].find((el) => (el as HTMLElement).offsetParent !== null);
  const img = source?.querySelector("img");
  if (!img || !target || prefersReducedMotion()) return Promise.resolve();

  const from = img.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  if (from.width === 0) return Promise.resolve();

  const ghost = img.cloneNode() as HTMLImageElement;
  ghost.removeAttribute("srcset");
  ghost.src = img.currentSrc || img.src;
  ghost.alt = "";
  ghost.setAttribute("aria-hidden", "true");
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    objectFit: "contain",
    zIndex: "60",
    pointerEvents: "none",
    transformOrigin: "top left",
    margin: "0",
  });
  document.body.appendChild(ghost);

  const scale = Math.max(0.06, to.width / from.width);
  const dx = to.left + to.width / 2 - (from.left + (from.width * scale) / 2);
  const dy = to.top + to.height / 2 - (from.top + (from.height * scale) / 2);

  const animation = ghost.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.6}px, ${dy * 0.35}px) scale(${0.5 + scale / 2})`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0 },
    ],
    { duration: DURATION.slow * 1000, easing: `cubic-bezier(${EASE_LUXE.join(",")})`, fill: "forwards" },
  );

  return animation.finished.then(
    () => ghost.remove(),
    () => ghost.remove(),
  );
}
