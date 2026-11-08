import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

/** One entry per locale for a path, each listing all its language versions. */
function localized(path: string, extra: Partial<MetadataRoute.Sitemap[number]>): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([k, v]) => [k, absoluteUrl(v)]),
  );
  return locales.map((lang) => ({ url: absoluteUrl(`/${lang}${path}`), alternates: { languages }, ...extra }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localized("", {
      changeFrequency: "monthly",
      priority: 1,
      images: projects.map((p) => absoluteUrl(p.cover.src)),
    }),
    ...services.flatMap((s) =>
      localized(`/servicii/${s.slug}`, {
        changeFrequency: "monthly",
        priority: 0.9,
      }),
    ),
    ...projects.flatMap((p) =>
      localized(`/proiecte/${p.slug}`, {
        changeFrequency: "yearly",
        priority: 0.8,
        images: p.images.map((img) => absoluteUrl(img.src)),
      }),
    ),
  ];
}
