import Image, { type StaticImageData } from "next/image";
import { Fragment } from "react";
import type { Dictionary } from "@/dictionaries/ro";

type Props = { t: Dictionary["hero"]; scrollLabel: string; image: StaticImageData };

/** Server-rendered; the scroll parallax/fade is pure CSS (.hero-drift / .hero-lift in globals.css). */
export default function Hero({ t, scrollLabel, image }: Props) {
  const words = t.title.split(" ");

  return (
    <section aria-labelledby="hero-title" className="letterbox relative h-svh min-h-[640px] overflow-hidden">
      <div className="hero-drift absolute inset-0">
        <div className="kenburns absolute inset-0">
          <Image
            src={image}
            alt={t.imageAlt}
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Cinematic grade */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(13_11_9/0.75)_100%)]" aria-hidden="true" />

      <div
        className="hero-lift relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-[14vh] md:px-10"
      >
        <p className="fade-in mb-6 text-[12px] tracking-[0.35em] uppercase text-brass-soft" style={{ "--d": "0.6s" } as React.CSSProperties}>
          {t.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="max-w-[14ch] font-display text-[clamp(3rem,8.5vw,8.5rem)] leading-[0.92] font-light tracking-[-0.01em] text-bone"
        >
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="rise-word">
                <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
              </span>
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="fade-in max-w-md text-base leading-relaxed text-sand md:text-lg" style={{ "--d": "1.4s" } as React.CSSProperties}>
            {t.lede}
          </p>
          <div className="fade-in flex flex-wrap gap-4" style={{ "--d": "1.6s" } as React.CSSProperties}>
            <a
              href="#contact"
              className="bg-brass px-7 py-4 text-[12px] font-medium tracking-[0.22em] uppercase text-ink transition-colors hover:bg-brass-soft"
            >
              {t.primary}
            </a>
            <a
              href="#work"
              className="border border-bone/30 px-7 py-4 text-[12px] tracking-[0.22em] uppercase text-bone transition-colors hover:border-bone"
            >
              {t.secondary}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[5vh] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
        <span className="text-[10px] tracking-[0.4em] uppercase text-sand">{scrollLabel}</span>
        <span className="scroll-cue block h-12 w-px bg-brass" />
      </div>
    </section>
  );
}
