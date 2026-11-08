import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/dictionaries";
import { buildStructuredData, jsonLd, projectPath } from "@/lib/seo";
import { photo, projects } from "@/content/projects";
import { crops } from "@/content/project-images";
import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Services from "@/components/sections/Services";
import Interlude from "@/components/sections/Interlude";
import Portfolio from "@/components/sections/Portfolio";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildStructuredData(lang, dict))} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brass focus:px-4 focus:py-2 focus:text-ink"
      >
        {dict.a11y.skip}
      </a>
      <Nav lang={lang} nav={dict.nav} a11y={dict.a11y} />
      <main id="main">
        <Hero t={dict.hero} scrollLabel={dict.a11y.scroll} image={crops.hero} />
        <Intro t={dict.intro} />
        <Services lang={lang} t={dict.services} more={dict.service.more} />
        <Interlude image={photo("vitrine-iluminate")} alt={dict.interlude.imageAlt} text={dict.interlude.text} />
        <Portfolio
          t={dict.work}
          items={projects.map((p) => ({
            slug: p.slug,
            href: projectPath(lang, p.slug),
            category: p.category,
            cover: p.cover,
            title: p.title[lang],
            summary: p.summary[lang],
            alt: p.alt[lang][0],
            count: p.images.length,
          }))}
        />
        <Process
          t={dict.process}
          images={[
            photo("dulap-mansarda", 1),
            photo("dressing-organizare-interioara"),
            photo("bucatarie-greige-coloane-negre", 2),
            photo("amenajare-magazin"),
          ]}
        />
        <Faq t={dict.faq} />
        <Contact t={dict.contact} />
      </main>
      <Footer lang={lang} t={dict.footer} nav={dict.nav} />
    </>
  );
}
