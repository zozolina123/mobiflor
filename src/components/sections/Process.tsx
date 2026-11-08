"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/dictionaries/ro";
import SectionHeading from "@/components/ui/SectionHeading";

/** `images` has one photo per step. */
export default function Process({ t, images }: { t: Dictionary["process"]; images: StaticImageData[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" aria-labelledby="process-title" className="relative bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 pt-14 md:px-10 md:pt-20">
        <SectionHeading id="process-title" eyebrow={t.eyebrow} title={t.title} />
      </div>

      <div className="mx-auto grid max-w-[1600px] px-5 pb-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Sticky crossfading frame (desktop) */}
        <div className="sticky top-0 hidden h-screen items-center lg:flex" aria-hidden="true">
          <div className="relative aspect-[4/5] max-h-[78vh] w-full overflow-hidden">
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt=""
                fill
                sizes="50vw"
                placeholder="blur"
                className={`object-cover transition-all duration-[1.4s] ease-(--ease-cine) ${
                  i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-coal/60 to-transparent" />
            <span className="absolute bottom-6 left-6 font-display text-8xl font-light text-bone/90 italic">
              {String(active + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <ol className="lg:pt-[8vh] lg:pb-0">
          {t.steps.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-index={i}
              className="flex flex-col justify-center border-t border-line py-14 lg:min-h-[55vh] lg:border-t-0 lg:py-0"
            >
              <div className="relative mb-8 aspect-[4/3] overflow-hidden lg:hidden">
                <Image src={images[i]} alt={s.imageAlt} fill sizes="100vw" placeholder="blur" className="object-cover" />
              </div>
              <span
                className={`font-display text-xl italic transition-colors duration-700 ${i === active ? "text-brass" : "text-mute"}`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")} / {String(t.steps.length).padStart(2, "0")}
              </span>
              <h3
                className={`mt-4 font-display text-4xl font-light transition-colors duration-700 md:text-5xl ${
                  i === active ? "text-bone" : "lg:text-bone/40"
                }`}
              >
                {s.title}
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-sand">{s.body}</p>
              {/* Desktop image alt lives here for screen readers, since the sticky frame is decorative */}
              <span className="max-lg:hidden lg:sr-only">{s.imageAlt}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
