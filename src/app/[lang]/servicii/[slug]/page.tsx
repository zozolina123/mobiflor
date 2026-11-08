import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { hasLocale, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/dictionaries";
import { getProject, type Project } from "@/content/projects";
import { getService, services } from "@/content/services";
import { buildServiceStructuredData, jsonLd, languageAlternates, servicePath } from "@/lib/seo";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";
import ProjectCard from "@/components/ui/ProjectCard";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/servicii/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = getService(slug);
  if (!hasLocale(lang) || !service) return {};
  const title = service.h1[lang];
  const path = servicePath(lang, slug);

  return {
    title,
    description: service.description[lang],
    alternates: { canonical: path, languages: languageAlternates(`/servicii/${slug}`) },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description: service.description[lang],
      url: path,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description: service.description[lang] },
  };
}

export default async function ServicePage({ params }: PageProps<"/[lang]/servicii/[slug]">) {
  const { lang, slug } = await params;
  const service = getService(slug);
  if (!hasLocale(lang) || !service) notFound();
  const dict = await getDictionary(lang);
  const t = dict.service;

  const related = service.projects.map(getProject).filter((p): p is Project => Boolean(p));
  const cover = related[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildServiceStructuredData(lang, dict, service))} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brass focus:px-4 focus:py-2 focus:text-ink"
      >
        {dict.a11y.skip}
      </a>
      <Nav lang={lang} nav={dict.nav} a11y={dict.a11y} />

      <main id="main">
        <header className="relative overflow-hidden pt-28 pb-16 md:pt-32 lg:pb-24">
          {cover && (
            <div
              className="absolute inset-0 scale-125 bg-cover bg-center opacity-35 blur-3xl"
              style={{ backgroundImage: `url("${cover.cover.blurDataURL}")` }}
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" aria-hidden="true" />

          <div className="relative mx-auto grid max-w-[1600px] items-end gap-12 px-5 md:px-10 lg:grid-cols-12">
            <div className="lg:col-span-6 lg:pb-6">
              <nav aria-label={dict.project.breadcrumb} className="fade-in mb-8 text-[11px] tracking-[0.25em] uppercase text-sand" style={{ "--d": "0.3s" } as React.CSSProperties}>
                <ol className="flex flex-wrap items-center gap-3">
                  <li>
                    <Link href={`/${lang}`} className="hover:text-bone">
                      {dict.project.home}
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li>
                    <Link href={`/${lang}#services`} className="hover:text-bone">
                      {t.crumb}
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page" className="text-brass-soft">
                    {service.name[lang]}
                  </li>
                </ol>
              </nav>
              <h1 className="focus-in font-display text-[clamp(2.6rem,5.2vw,5.25rem)] leading-[0.98] font-light text-bone" style={{ "--d": "0.2s" } as React.CSSProperties}>
                {service.h1[lang]}
              </h1>
              <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-sand">
                {service.intro[lang].map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              <a
                href={`/${lang}#contact`}
                className="mt-10 inline-block bg-brass px-9 py-5 text-[12px] font-medium tracking-[0.25em] uppercase text-ink transition-colors hover:bg-brass-soft"
              >
                {dict.project.ctaButton}
              </a>
            </div>

            {cover && (
              <div className="focus-in lg:col-span-6 lg:flex lg:justify-end">
                <Image
                  src={cover.cover}
                  alt={cover.alt[lang][0]}
                  priority
                  fetchPriority="high"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto max-h-[75vh] w-full object-contain lg:w-auto"
                />
              </div>
            )}
          </div>
        </header>

        <section aria-labelledby="offerings-title" className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <h2 id="offerings-title" data-reveal className="font-display text-[clamp(2rem,3.6vw,3.5rem)] leading-none font-light text-bone">
            {t.offerings}
          </h2>
          <ul className="mt-12 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings[lang].map((o, i) => (
              <li key={o} data-reveal style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties} className="flex items-baseline gap-4 bg-ink py-7 sm:px-6">
                <span className="font-display text-brass italic" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-bone">{o}</span>
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mx-auto max-w-[1600px] px-5 pb-20 md:px-10 md:pb-28">
            <h2 id="related-title" data-reveal className="font-display text-[clamp(2rem,3.6vw,3.5rem)] leading-none font-light text-bone">
              {t.related}
            </h2>
            <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug} data-reveal>
                  <ProjectCard project={p} lang={lang} photosLabel={dict.work.photos} viewLabel={dict.work.view} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="process-title" className="bg-coal">
          <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
            <h2 id="process-title" data-reveal className="font-display text-[clamp(2rem,3.6vw,3.5rem)] leading-none font-light text-bone">
              {t.process}
            </h2>
            <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {dict.process.steps.map((step, i) => (
                <li key={step.title} data-reveal style={{ "--d": `${i * 0.08}s` } as React.CSSProperties} className="border-t border-line pt-6">
                  <span className="font-display text-brass italic" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-normal text-bone">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-sand">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="cta-title" className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
          <div>
            <h2 id="cta-title" data-reveal className="font-display text-[clamp(2.2rem,4.5vw,4rem)] leading-none font-light text-bone">
              {dict.project.ctaTitle}
            </h2>
            <p data-reveal className="mt-5 max-w-lg text-lg text-sand">
              {dict.project.ctaBody}
            </p>
          </div>
          <a
            href={`/${lang}#contact`}
            className="self-start bg-brass px-9 py-5 text-[12px] font-medium tracking-[0.25em] uppercase text-ink transition-colors hover:bg-brass-soft md:self-auto"
          >
            {dict.project.ctaButton}
          </a>
        </section>
      </main>

      <Footer lang={lang} t={dict.footer} nav={dict.nav} />
    </>
  );
}
