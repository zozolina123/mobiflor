import type { Dictionary } from "@/dictionaries/ro";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto grid max-w-[1600px] gap-16 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-12">
      <SectionHeading id="faq-title" eyebrow={t.eyebrow} title={t.title} className="lg:col-span-4" />
      <div className="border-t border-line lg:col-span-7 lg:col-start-6">
        {t.items.map((item, i) => (
          <details key={item.q} data-reveal style={{ "--d": `${i * 0.06}s` } as React.CSSProperties} className="group border-b border-line">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-7 text-left">
              <h3 className="font-display text-2xl font-normal text-bone md:text-3xl">{item.q}</h3>
              <span className="faq-icon relative h-4 w-4 shrink-0 transition-transform duration-500" aria-hidden="true">
                <span className="absolute top-1/2 left-0 h-px w-4 bg-brass" />
                <span className="absolute top-0 left-1/2 h-4 w-px bg-brass" />
              </span>
            </summary>
            <p className="max-w-2xl pb-8 text-lg leading-relaxed text-sand">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
