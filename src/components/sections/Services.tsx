import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries/ro";
import { services } from "@/content/services";
import { servicePath } from "@/lib/seo";
import SectionHeading from "@/components/ui/SectionHeading";

type Props = { lang: Locale; t: Dictionary["services"]; more: string };

export default function Services({ lang, t, more }: Props) {
  return (
    <section id="services" aria-labelledby="services-title" className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20">
      <SectionHeading id="services-title" eyebrow={t.eyebrow} title={t.title} className="mb-12" />

      <ul className="grid gap-px border-y border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <li
            key={s.slug}
            data-reveal
            style={{ "--d": `${(i % 3) * 0.1}s` } as React.CSSProperties}
            className="group relative bg-ink py-12 md:px-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brass transition-transform duration-700 ease-(--ease-cine) group-hover:scale-x-100"
            />
            <span className="font-display text-lg text-brass italic" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 font-display text-3xl font-normal text-bone md:text-4xl">
              {/* Stretched link: the whole card opens the service page. */}
              <Link
                href={servicePath(lang, s.slug)}
                className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-brass"
              >
                {s.name[lang]}
              </Link>
            </h3>
            <p className="mt-4 max-w-sm leading-relaxed text-sand">{s.card[lang]}</p>
            <p className="mt-6 text-[11px] tracking-[0.25em] uppercase text-brass" aria-hidden="true">
              {more} →
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
