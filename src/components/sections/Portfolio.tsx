"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries/ro";
import { categories, type Category } from "@/content/categories";

type Filter = Category | "all";

export type PortfolioItem = {
  slug: string;
  href: string;
  category: Category;
  cover: StaticImageData;
  title: string;
  summary: string;
  alt: string;
  count: number;
};

// Track padding that lines the first card up with the 1600px content column.
const edgePad = "px-5 scroll-px-5 md:px-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))] md:scroll-px-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))]";

/**
 * Horizontal project strip. It scrolls on its own (swipe, trackpad, shift+wheel, drag, arrows, keyboard);
 * a vertical mouse wheel always scrolls the page.
 */
export default function Portfolio({ t, items }: { t: Dictionary["work"]; items: PortfolioItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const visible = filter === "all" ? items : items.filter((p) => p.category === filter);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  // Reset to the start when the filter changes, and keep state in sync on resize.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [filter, update]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 32), behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch and trackpads already scroll natively).
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Pointer already released; dragging still works without capture.
      }
      e.currentTarget.dataset.dragging = "";
    }
    if (d.moved) e.currentTarget.scrollLeft = d.left - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current) return;
    delete e.currentTarget.dataset.dragging;
    // Let the click that ends a drag be swallowed by onClickCapture below.
    setTimeout(() => (drag.current = null), 0);
  };

  const arrowClass =
    "flex h-12 w-12 items-center justify-center border border-line text-xl text-bone transition-colors hover:border-brass hover:text-brass disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-14 md:py-20">
      <div className="mx-auto mb-10 flex w-full max-w-[1600px] flex-col gap-8 px-5 md:px-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-5 flex items-center gap-4 text-[12px] tracking-[0.35em] uppercase text-brass">
            <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h2 id="work-title" className="font-display text-[clamp(2.4rem,5vw,4.75rem)] leading-[1] font-light text-bone">
            {t.title}
          </h2>
          <p className="mt-4 max-w-xl text-sand">{t.lede}</p>
        </div>

        <div role="group" aria-label={t.filterLabel} className="flex flex-wrap gap-2">
          {(["all", ...categories] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`border px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-colors ${
                filter === c ? "border-brass bg-brass text-ink" : "border-line text-sand hover:border-sand hover:text-bone"
              }`}
            >
              {c === "all" ? t.all : t.categories[c]}
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={trackRef}
        // Lenis leaves horizontal gestures here to the browser; vertical wheel still scrolls the page.
        data-lenis-prevent-horizontal
        tabIndex={0}
        aria-label={t.title}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (drag.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        className={`flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] focus-visible:outline-offset-[-2px] data-dragging:cursor-grabbing data-dragging:snap-none data-dragging:select-none md:cursor-grab [&::-webkit-scrollbar]:hidden ${edgePad}`}
      >
        {visible.map((p, i) => (
          <li key={p.slug} className="w-[82vw] shrink-0 snap-start sm:w-[44vw] lg:w-[min(30vw,460px)]">
            <article className="group relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-char">
                <Image
                  src={p.cover}
                  alt={p.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 82vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-[1.6s] ease-(--ease-cine) group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" aria-hidden="true" />
                <span className="absolute top-4 left-4 font-display text-lg text-bone/80 italic" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute right-4 bottom-4 text-[11px] tracking-[0.25em] uppercase text-bone/90">
                  {p.count} {t.photos}
                </span>
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl leading-tight font-normal text-bone">
                  {/* Stretched link: the whole card is clickable; the focus ring is drawn on the stretched area. */}
                  <Link
                    href={p.href}
                    draggable={false}
                    className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-brass"
                  >
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-mute">{p.summary}</p>
                <p className="mt-3 text-[11px] tracking-[0.25em] uppercase text-brass" aria-hidden="true">
                  {t.view} →
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 flex max-w-[1600px] items-center gap-6 px-5 md:px-10">
        <div className="h-px flex-1 bg-line" aria-hidden="true">
          <div className="h-px bg-brass transition-[width] duration-300" style={{ width: `${Math.max(progress * 100, 4)}%` }} />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => page(-1)} disabled={atStart} aria-label={t.prev} className={arrowClass}>
            ←
          </button>
          <button type="button" onClick={() => page(1)} disabled={atEnd} aria-label={t.next} className={arrowClass}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
