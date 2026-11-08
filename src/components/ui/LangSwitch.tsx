"use client";

import { locales, type Locale } from "@/i18n/config";

/** Switches language while keeping the current section (#hash) in view. */
export default function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  return (
    <ul aria-label={label} className="flex items-center gap-1 text-[12px] tracking-[0.2em] uppercase">
      {locales.map((l, i) => (
        <li key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-mute" aria-hidden="true">/</span>}
          {l === lang ? (
            <span aria-current="true" className="text-bone">
              {l}
            </span>
          ) : (
            <a
              href={`/${l}`}
              hrefLang={l}
              lang={l}
              className="text-mute transition-colors hover:text-bone"
              onClick={(e) => {
                e.preventDefault();
                // Full load (each locale has its own root layout); keep the current page and section.
                const { pathname, hash } = window.location;
                const path = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${l}`);
                window.location.assign(new URL(`${path}${hash}`, window.location.origin));
              }}
            >
              {l}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
