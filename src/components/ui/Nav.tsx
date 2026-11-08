"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/dictionaries/ro";
import LangSwitch from "./LangSwitch";
import { sectionLinks } from "./sectionLinks";

type Props = { lang: Locale; nav: Dictionary["nav"]; a11y: Dictionary["a11y"] };

export default function Nav({ lang, nav, a11y }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = sectionLinks(lang, nav);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-(--ease-cine) ${
        scrolled || open ? "bg-ink/80 backdrop-blur-md border-b border-line" : "border-b border-transparent"
      }`}
    >
      <nav aria-label={a11y.menu} className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
        <a href={`/${lang}`} className="font-display text-2xl tracking-wide text-bone">
          {site.name.split(" ")[0]}
          <span className="text-brass italic"> {site.name.split(" ").slice(1).join(" ")}</span>
        </a>

        <ul className="hidden items-center gap-9 text-[13px] tracking-[0.18em] uppercase text-sand lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-bone">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <LangSwitch lang={lang} label={a11y.language} />
          <a
            href={`/${lang}#contact`}
            className="hidden border border-brass/60 px-5 py-2.5 text-[12px] tracking-[0.2em] uppercase text-brass-soft transition-colors hover:bg-brass hover:text-ink md:inline-block"
          >
            {nav.cta}
          </a>
          <button
            type="button"
            className="relative h-10 w-10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? a11y.closeMenu : a11y.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute left-2 right-2 h-px bg-bone transition-transform duration-500 ${open ? "top-1/2 rotate-45" : "top-[40%]"}`} />
            <span className={`absolute left-2 right-2 h-px bg-bone transition-transform duration-500 ${open ? "top-1/2 -rotate-45" : "top-[60%]"}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-ink/95 px-5 pb-10 pt-6 backdrop-blur-md lg:hidden"
      >
        <ul className="flex flex-col gap-5">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="font-display text-4xl text-bone">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
