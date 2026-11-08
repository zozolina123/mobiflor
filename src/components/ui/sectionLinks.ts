import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries/ro";

/** Home-page section links; absolute so they also work from project pages. */
export const sectionLinks = (lang: Locale, nav: Dictionary["nav"]) => [
  { href: `/${lang}#services`, label: nav.services },
  { href: `/${lang}#work`, label: nav.work },
  { href: `/${lang}#process`, label: nav.process },
  { href: `/${lang}#faq`, label: nav.faq },
  { href: `/${lang}#contact`, label: nav.contact },
];
