import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Until the real domain is set (NEXT_PUBLIC_SITE_URL), keep crawlers out of the draft.
  if (!site.indexable) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
