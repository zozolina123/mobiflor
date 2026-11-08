export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Open Graph locale codes. */
export const ogLocale: Record<Locale, string> = {
  ro: "ro_RO",
  en: "en_US",
};
