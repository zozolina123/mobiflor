import { mailHref, site, telHref, whatsappHref } from "@/config/site";
import type { Dictionary } from "@/dictionaries/ro";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";

export default function Contact({ t }: { t: Dictionary["contact"] }) {
  const channels = [
    { label: t.call, value: site.phone, href: telHref },
    ...(whatsappHref ? [{ label: t.whatsapp, value: site.phone, href: whatsappHref, external: true }] : []),
    { label: t.write, value: site.email, href: mailHref },
  ];
  const { street, city, region } = site.address;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-coal">
      <div className="mx-auto grid max-w-[1600px] gap-20 px-5 py-14 md:px-10 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

          <div className="mt-16" data-reveal>
            <p className="mb-6 text-[11px] tracking-[0.3em] uppercase text-mute">{t.direct}</p>
            <ul className="divide-y divide-line border-y border-line">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-baseline justify-between gap-6 py-5"
                  >
                    <span className="text-[11px] tracking-[0.25em] uppercase text-brass">{c.label}</span>
                    <span className="min-w-0 text-right font-display text-xl break-all text-bone transition-colors group-hover:text-brass-soft md:text-2xl">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>

            <address className="mt-10 not-italic text-sand">
              <span className="mb-2 block text-[11px] tracking-[0.25em] uppercase text-brass">{t.area}</span>
              {street && <span className="block">{street}</span>}
              <span className="block">
                {city}, {region}
              </span>
            </address>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6" data-reveal>
          <ContactForm t={t.form} />
        </div>
      </div>
    </section>
  );
}
