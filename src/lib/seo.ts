import { site } from "@/config/site";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries";
import { projects, type Project } from "@/content/projects";
import { services, type Service } from "@/content/services";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

export const projectPath = (lang: Locale, slug: string) => `/${lang}/proiecte/${slug}`;
export const servicePath = (lang: Locale, slug: string) => `/${lang}/servicii/${slug}`;

/** hreflang map for a localized path, e.g. "" → { ro: "/ro", en: "/en", "x-default": "/ro" } */
export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": `/${defaultLocale}${path}`,
  };
}

/** Serialize JSON-LD safely for inline <script> tags. */
export const jsonLd = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});

const businessId = () => absoluteUrl("/#business");
const websiteId = () => absoluteUrl("/#website");

function business(lang: Locale, dict: Dictionary) {
  const { address } = site;
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@type": "FurnitureStore",
    "@id": businessId(),
    name: site.name,
    legalName: site.legalName,
    description: dict.meta.description,
    url: absoluteUrl(`/${lang}`),
    telephone: site.phone,
    email: site.email,
    image: absoluteUrl(`/${lang}/opengraph-image`),
    logo: absoluteUrl("/icon.svg"),
    address: {
      "@type": "PostalAddress",
      ...(address.street && { streetAddress: address.street }),
      addressLocality: address.city,
      addressRegion: address.region,
      ...(address.postalCode && { postalCode: address.postalCode }),
      addressCountry: address.country,
    },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
    ...(sameAs.length && { sameAs }),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name[lang], url: absoluteUrl(servicePath(lang, s.slug)) },
    })),
  };
}

export function buildStructuredData(lang: Locale, dict: Dictionary) {
  const pageUrl = absoluteUrl(`/${lang}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      business(lang, dict),
      {
        "@type": "WebSite",
        "@id": websiteId(),
        url: absoluteUrl("/"),
        name: site.name,
        inLanguage: locales,
        publisher: { "@id": businessId() },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": websiteId() },
        about: { "@id": businessId() },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#portfolio`,
        name: dict.work.title,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(projectPath(lang, p.slug)),
          name: p.title[lang],
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: dict.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export function buildProjectStructuredData(lang: Locale, dict: Dictionary, project: Project) {
  const url = absoluteUrl(projectPath(lang, project.slug));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.project.home, item: absoluteUrl(`/${lang}`) },
          { "@type": "ListItem", position: 2, name: dict.project.projects, item: absoluteUrl(`/${lang}#work`) },
          { "@type": "ListItem", position: 3, name: project.title[lang], item: url },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        url,
        name: project.title[lang],
        description: project.description[lang],
        genre: dict.work.categories[project.category],
        inLanguage: lang,
        creator: { "@type": "FurnitureStore", "@id": businessId(), name: site.name },
        locationCreated: { "@type": "Place", name: site.address.city },
        image: project.images.map((img, i) => ({
          "@type": "ImageObject",
          contentUrl: absoluteUrl(img.src),
          width: img.width,
          height: img.height,
          caption: project.alt[lang][i],
        })),
      },
    ],
  };
}

export function buildServiceStructuredData(lang: Locale, dict: Dictionary, service: Service) {
  const url = absoluteUrl(servicePath(lang, service.slug));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: dict.project.home, item: absoluteUrl(`/${lang}`) },
          { "@type": "ListItem", position: 2, name: dict.service.crumb, item: absoluteUrl(`/${lang}#services`) },
          { "@type": "ListItem", position: 3, name: service.name[lang], item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        url,
        name: service.h1[lang],
        serviceType: service.name[lang],
        description: service.description[lang],
        provider: { "@type": "FurnitureStore", "@id": businessId(), name: site.name },
        areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.name[lang],
          itemListElement: service.offerings[lang].map((o) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: o },
          })),
        },
      },
    ],
  };
}
