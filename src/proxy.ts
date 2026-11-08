import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";
import { projectSlugs } from "@/content/project-slugs";
import { services } from "@/content/services";

const knownSlugs: Record<string, ReadonlySet<string>> = {
  proiecte: new Set(projectSlugs),
  servicii: new Set(services.map((s) => s.slug)),
};

/** Pick the best supported locale from the Accept-Language header. */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => hasLocale(r.lang))?.lang as Locale | undefined ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) {
    // Unknown project/service slugs: rewrite to an unmatched path so the response is a real 404
    // (the page itself streams before notFound() runs, which would send 200 + noindex).
    const m = pathname.match(/^\/([a-z]{2})\/(proiecte|servicii)\/([^/]+)\/?$/);
    if (m && !knownSlugs[m[2]].has(m[3])) {
      return NextResponse.rewrite(new URL(`/${m[1]}/404`, request.url));
    }
    return;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension.
  matcher: ["/((?!_next|api|sitemap.xml|robots.txt|manifest.webmanifest|icon|opengraph-image|.*\..*).*)"],
};
