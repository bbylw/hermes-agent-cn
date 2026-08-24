import { useEffect } from "react";
import type { CSSProperties } from "react";

/** Inline style helper for the staggered reveal delay custom property (`--d`). */
export const delay = (seconds: string): CSSProperties => ({ "--d": seconds }) as CSSProperties;

/**
 * Observes every `.reveal` element once on mount and adds `.in` when it enters
 * the viewport. Observer options mirror the vanilla page exactly:
 * threshold .12, rootMargin '0px 0px -40px 0px'.
 */
export function useRevealOnScroll(): void {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
