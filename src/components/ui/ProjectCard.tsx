import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/content/projects";
import { projectPath } from "@/lib/seo";

type Props = { project: Project; lang: Locale; photosLabel: string; viewLabel: string };

/** Static project card (server-rendered) used in grids outside the home-page strip. */
export default function ProjectCard({ project: p, lang, photosLabel, viewLabel }: Props) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden bg-char">
        <Image
          src={p.cover}
          alt={p.alt[lang][0]}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          className="object-cover transition-transform duration-[1.6s] ease-(--ease-cine) group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" aria-hidden="true" />
        <span className="absolute right-4 bottom-4 text-[11px] tracking-[0.25em] uppercase text-bone/90">
          {p.images.length} {photosLabel}
        </span>
      </div>
      <h3 className="mt-5 font-display text-2xl leading-tight font-normal text-bone">
        <Link
          href={projectPath(lang, p.slug)}
          className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-brass"
        >
          {p.title[lang]}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-mute">{p.summary[lang]}</p>
      <p className="mt-3 text-[11px] tracking-[0.25em] uppercase text-brass" aria-hidden="true">
        {viewLabel} →
      </p>
    </article>
  );
}
