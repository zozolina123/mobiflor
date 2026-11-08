import type { Dictionary } from "@/dictionaries/ro";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { photo } from "@/content/projects";

const introImage = photo("apartament-bucatarie-verde-birou-hol", 1);

export default function Intro({ t }: { t: Dictionary["intro"] }) {
  return (
    <section aria-labelledby="intro-title" className="relative mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <p data-reveal className="mb-8 text-[12px] tracking-[0.35em] uppercase text-brass">
            {t.eyebrow}
          </p>
          <h2
            id="intro-title"
            data-reveal
            className="font-display text-[clamp(2.2rem,4.6vw,4.5rem)] leading-[1.04] font-light text-bone"
          >
            {t.title}
          </h2>
          <div className="mt-12 grid gap-6 text-lg leading-relaxed text-sand md:grid-cols-2 md:gap-10">
            {t.body.map((p, i) => (
              <p key={i} data-reveal style={{ "--d": `${0.1 + i * 0.12}s` } as React.CSSProperties}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <ParallaxImage
            src={introImage}
            alt={t.imageAlt}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="aspect-[4/5] w-full"
          />
        </div>
      </div>
    </section>
  );
}
