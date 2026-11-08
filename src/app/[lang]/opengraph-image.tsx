import { site } from "@/config/site";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/dictionaries";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(hasLocale(lang) ? lang : "ro");
  return renderOgImage({ photo: "_crops/mobila-la-comanda-suceava.jpg", eyebrow: dict.hero.eyebrow, title: dict.hero.title });
}
