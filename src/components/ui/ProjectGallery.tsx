"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries/ro";

type Props = {
  images: StaticImageData[];
  alts: string[];
  t: Dictionary["project"];
};

/** Masonry grid of project photos; each opens a full-screen lightbox (native <dialog>). */
export default function ProjectGallery({ images, alts, t }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const count = images.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + count) % count)), [count]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setIndex(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [step]);

  // Lock page scroll while the lightbox is open.
  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [isOpen]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="columns-1 gap-4 md:columns-2 lg:columns-3">
        {images.map((img, i) => (
          <li key={img.src} data-reveal style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden bg-char"
              aria-label={`${t.open}: ${alts[i]}`}
            >
              <Image
                src={img}
                alt={alts[i]}
                placeholder="blur"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-[1.4s] ease-(--ease-cine) group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={t.gallery}
        data-lenis-prevent
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-bone backdrop:bg-ink/80"
        onClick={(e) => e.target === e.currentTarget && close()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && index !== null && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between px-5 py-4 text-[12px] tracking-[0.25em] uppercase md:px-10">
              <span aria-live="polite">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button type="button" onClick={close} className="px-3 py-2 text-sand hover:text-bone" autoFocus>
                {t.close} ✕
              </button>
            </div>

            <figure className="relative mx-5 mb-4 min-h-0 flex-1 md:mx-24">
              <Image key={current.src} src={current} alt={alts[index]} fill sizes="100vw" className="object-contain" />
            </figure>
            <p className="px-5 pb-6 text-center text-sm text-sand md:px-10">{alts[index]}</p>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t.prev}
                  className="absolute top-1/2 left-2 -translate-y-1/2 p-4 font-display text-4xl text-bone/70 hover:text-bone md:left-6"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t.next}
                  className="absolute top-1/2 right-2 -translate-y-1/2 p-4 font-display text-4xl text-bone/70 hover:text-bone md:right-6"
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
