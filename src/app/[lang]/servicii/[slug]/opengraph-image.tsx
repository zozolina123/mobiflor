import { site } from "@/config/site";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/dictionaries";
import { services, getService } from "@/content/services";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

// Both segments: image routes don't receive the parent layout's params at build time.
export function generateStaticParams() {
  return locales.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: rawLang, slug } = await params;
  const lang = hasLocale(rawLang) ? rawLang : "ro";
  const service = getService(slug);
  const dict = await getDictionary(lang);
  const photoSlug = service?.projects[0] ?? "bucatarie-insula-led";
  return renderOgImage({
    photo: `${photoSlug}/${photoSlug}-01.jpg`,
    eyebrow: dict.service.crumb,
    title: service?.h1[lang] ?? dict.hero.title,
  });
}
