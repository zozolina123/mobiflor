"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/** Runs `fn` once the browser is idle, so it never competes with the first paint. */
function whenIdle(fn: () => void) {
  if ("requestIdleCallback" in window) {
    const id = requestIdleCallback(fn, { timeout: 1500 });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(fn, 200);
  return () => clearTimeout(id);
}

/**
 * Inertial smooth scrolling (Lenis) + scroll-reveal observer.
 * Lenis loads after first paint and is skipped with reduced motion.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  // Reveal elements marked with data-reveal as they enter the viewport. Re-scans on each page.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | undefined;
    let cancelled = false;
    const cancelIdle = whenIdle(async () => {
      const { default: LenisCtor } = await import("lenis");
      if (cancelled) return;
      lenis = new LenisCtor({
        lerp: 0.085,
        anchors: { offset: -64 },
        autoRaf: true,
        // Stop any glide when a link is clicked, so Next.js can put the new page at the top.
        stopInertiaOnNavigate: true,
      });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      lenis?.destroy();
    };
  }, []);

  return null;
}
