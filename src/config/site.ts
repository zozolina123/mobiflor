/**
 * Business details used across the site, metadata and structured data.
 * Optional fields (street, social, opening hours…) are simply not rendered while unset.
 */
type Site = {
  name: string;
  legalName: string;
  url: string;
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
  // Production domain, no trailing slash. PLACEHOLDER until the real domain is registered.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mobiflor.ro",
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
