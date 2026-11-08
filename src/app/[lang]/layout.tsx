import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { hasLocale, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/dictionaries";
import { languageAlternates } from "@/lib/seo";
import ScrollReveal from "@/components/ui/ScrollReveal";
import "../globals.css";

const display = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0d0b09",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${site.name}` },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    formatDetection: { telephone: false, email: false, address: false },
    alternates: {
      canonical: `/${lang}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    category: "furniture",
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content stays visible without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
