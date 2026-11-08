import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { hasLocale, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/dictionaries";
import { getProject, projects } from "@/content/projects";
import { services } from "@/content/services";
import { buildProjectStructuredData, jsonLd, languageAlternates, projectPath, servicePath } from "@/lib/seo";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";
import ProjectGallery from "@/components/ui/ProjectGallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/proiecte/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) return {};
  const dict = await getDictionary(lang);
  const title = project.title[lang];
  // Short, unique description (the long project text would get cut off in search results).
  const description = `${project.summary[lang]}. ${dict.project.metaSuffix}`;
  const path = projectPath(lang, slug);

  return {
    title,
    description,
    alternates: { canonical: path, languages: languageAlternates(`/proiecte/${slug}`) },
    openGraph: {
      type: "article",
      siteName: site.name,
      title,
      description,
      url: path,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/proiecte/[slug]">) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) notFound();
  const dict = await getDictionary(lang);
  const t = dict.project;

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const service = services.find((s) => s.projects.includes(project.slug));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildProjectStructuredData(lang, dict, project))} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brass focus:px-4 focus:py-2 focus:text-ink"
      >
        {dict.a11y.skip}
      </a>
      <Nav lang={lang} nav={dict.nav} a11y={dict.a11y} />

      <main id="main">
        <header className="relative overflow-hidden pt-28 pb-16 md:pt-32 lg:pb-24">
          {/* Ambient backdrop drawn from the cover's tiny inline blur placeholder: no extra request,
              and it can't become the page's largest (LCP) element. */}
          <div
            className="absolute inset-0 scale-125 bg-cover bg-center opacity-35 blur-3xl"
            style={{ backgroundImage: `url("${project.cover.blurDataURL}")` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" aria-hidden="true" />

          <div className="relative mx-auto grid max-w-[1600px] items-end gap-12 px-5 md:px-10 lg:grid-cols-12">
            <div className="lg:col-span-6 lg:pb-10">
              <nav aria-label={t.breadcrumb} className="fade-in mb-8 text-[11px] tracking-[0.25em] uppercase text-sand" style={{ "--d": "0.3s" } as React.CSSProperties}>
                <ol className="flex flex-wrap items-center gap-3">
                  <li>
                    <Link href={`/${lang}`} className="hover:text-bone">
                      {t.home}
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li>
                    <Link href={`/${lang}#work`} className="hover:text-bone">
                      {t.projects}
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page" className="text-brass-soft">
                    {dict.work.categories[project.category]}
                  </li>
                </ol>
              </nav>
              <h1 className="focus-in font-display text-[clamp(2.6rem,5.5vw,5.5rem)] leading-[0.98] font-light text-bone" style={{ "--d": "0.45s" } as React.CSSProperties}>
                {project.title[lang]}
              </h1>
              <p className="fade-in mt-6 text-[12px] tracking-[0.3em] uppercase text-brass-soft" style={{ "--d": "0.6s" } as React.CSSProperties}>
                {project.summary[lang]}
              </p>
            </div>

            <div className="focus-in lg:col-span-6 lg:flex lg:justify-end">
              <Image
                src={project.cover}
                alt={project.alt[lang][0]}
                priority
                fetchPriority="high"
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto max-h-[75vh] w-full object-contain lg:w-auto"
              />
            </div>
          </div>
        </header>

        <section aria-label={t.gallery} className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <div className="mb-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p data-reveal className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-snug font-light text-bone">
                {project.description[lang]}
              </p>
              <dl data-reveal className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="text-[11px] tracking-[0.25em] uppercase text-mute">{t.category}</dt>
                  <dd className="mt-1 text-bone">{dict.work.categories[project.category]}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.25em] uppercase text-mute">{dict.work.photos}</dt>
                  <dd className="mt-1 text-bone">{project.images.length}</dd>
                </div>
                {service && (
                  <div>
                    <dt className="text-[11px] tracking-[0.25em] uppercase text-mute">{t.service}</dt>
                    <dd className="mt-1">
                      <Link href={servicePath(lang, service.slug)} className="text-brass-soft underline-offset-4 hover:underline">
                        {service.h1[lang]}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div data-reveal className="lg:col-span-4 lg:col-start-9">
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-brass">{t.highlights}</h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {project.highlights[lang].map((h) => (
                  <li key={h} className="py-3 text-bone">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ProjectGallery images={project.images} alts={project.alt[lang]} t={t} />
        </section>

        <section aria-labelledby="cta-title" className="bg-coal">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10 md:py-28">
            <div>
              <h2 id="cta-title" data-reveal className="font-display text-[clamp(2.2rem,4.5vw,4rem)] leading-none font-light text-bone">
                {t.ctaTitle}
              </h2>
              <p data-reveal className="mt-5 max-w-lg text-lg text-sand">
                {t.ctaBody}
              </p>
            </div>
            <a
              href={`/${lang}#contact`}
              className="self-start bg-brass px-9 py-5 text-[12px] font-medium tracking-[0.25em] uppercase text-ink transition-colors hover:bg-brass-soft md:self-auto"
            >
              {t.ctaButton}
            </a>
          </div>
        </section>

        <nav aria-label={t.projects} className="mx-auto grid max-w-[1600px] gap-px bg-line md:grid-cols-2">
          {[
            { p: prev, label: t.prevProject, align: "" },
            { p: next, label: t.nextProject, align: "md:text-right" },
          ].map(({ p, label, align }) => (
            <Link key={label} href={projectPath(lang, p.slug)} className={`group relative block overflow-hidden bg-ink px-5 py-14 md:px-10 ${align}`}>
              <Image
                src={p.cover}
                alt=""
                fill
                sizes="50vw"
                className="object-cover opacity-20 transition-all duration-[1.2s] ease-(--ease-cine) group-hover:scale-105 group-hover:opacity-35"
              />
              <span className="relative block text-[11px] tracking-[0.3em] uppercase text-brass">{label}</span>
              <span className="relative mt-3 block font-display text-3xl font-light text-bone md:text-4xl">{p.title[lang]}</span>
            </Link>
          ))}
        </nav>
      </main>

      <Footer lang={lang} t={dict.footer} nav={dict.nav} />
    </>
  );
}
