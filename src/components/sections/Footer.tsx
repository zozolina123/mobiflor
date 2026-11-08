import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries/ro";
import { mailHref, telHref } from "@/config/site";
import { sectionLinks } from "@/components/ui/sectionLinks";
import { services } from "@/content/services";
import { servicePath } from "@/lib/seo";

async function buildYear() {
  "use cache";
  return new Date().getFullYear();
}

type Props = { lang: Locale; t: Dictionary["footer"]; nav: Dictionary["nav"] };

export default async function Footer({ lang, t, nav }: Props) {
  const year = await buildYear();
  const links = sectionLinks(lang, nav);
  const social = Object.entries(site.social).filter(([, href]) => href);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 pt-10 pb-10 md:px-10">
        <p className="font-display text-[clamp(3.5rem,13vw,13rem)] leading-[0.85] font-light text-bone/90" aria-hidden="true">
          {site.name.split(" ")[0]} <span className="text-brass italic">{site.name.split(" ").slice(1).join(" ")}</span>
        </p>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 text-sm text-sand md:grid-cols-2 lg:grid-cols-4">
          <p className="max-w-xs">{t.tagline}</p>
          <nav aria-label={nav.services}>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <a href={servicePath(lang, s.slug)} className="hover:text-bone">
                    {s.name[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex flex-col gap-2 md:items-end">
            <li>
              <a href={telHref} className="hover:text-bone">{site.phone}</a>
            </li>
            <li>
              <a href={mailHref} className="break-all hover:text-bone">{site.email}</a>
            </li>
            {social.map(([name, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-bone">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-xs text-mute md:flex-row md:justify-between">
          <p>
            © {year} {site.legalName}. {t.rights}
          </p>
          <p>
            {site.address.city}, {t.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
