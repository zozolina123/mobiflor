/**
 * Business details used across the site, metadata and structured data.
 * Optional fields (street, social, opening hours…) are simply not rendered while unset.
 */
type Site = {
  name: string;
  legalName: string;
  url: string;
  /** Search engines may index the site only once the real domain is configured. */
  indexable: boolean;
  phone: string;
  whatsapp?: string;
  email: string;
  address: { street?: string; city: string; region: string; postalCode?: string; country: string };
  areaServed: string[];
  social: Partial<Record<"facebook" | "instagram" | "tiktok" | "youtube", string>>;
};

export const site: Site = {
  name: "MOBI FLOR",
  legalName: "Antoniciuc Florin Întreprindere Individuală",
  // Canonical origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL to the real domain at launch;
  // until then a Vercel deployment uses its own production address (so share previews work).
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://www.mobiflor.ro"),
  // Draft deployments (no real domain yet) are kept out of search results.
  indexable: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  phone: "+40 749 379 396",
  whatsapp: "40749379396", // digits only, used for wa.me links
  email: "floringeta1975antoni@gmail.com",
  address: {
    city: "Suceava",
    region: "Județul Suceava",
    country: "RO",
  },
  areaServed: ["Suceava", "Județul Suceava"],
  social: {},
};

export const telHref = `tel:${site.phone.replace(/\s+/g, "")}`;
export const mailHref = `mailto:${site.email}`;
export const whatsappHref = site.whatsapp ? `https://wa.me/${site.whatsapp}` : undefined;
