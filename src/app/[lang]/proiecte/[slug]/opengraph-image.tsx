import { site } from "@/config/site";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/dictionaries";
import { getProject, projects } from "@/content/projects";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

// Both segments: image routes don't receive the parent layout's params at build time.
export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  const lang = hasLocale(rawLang) ? rawLang : "ro";
  const project = getProject(slug);
  const dict = await getDictionary(lang);
  return renderOgImage({
    photo: `${slug}/${slug}-01.jpg`,
    eyebrow: project ? dict.work.categories[project.category] : dict.hero.eyebrow,
    title: project?.title[lang] ?? dict.hero.title,
  });
}
