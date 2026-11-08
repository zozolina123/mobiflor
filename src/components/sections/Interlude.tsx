import type { StaticImageData } from "next/image";
import ParallaxImage from "@/components/ui/ParallaxImage";

/** Full-bleed cinematic image band with an overlaid line of text. */
export default function Interlude({ image, alt, text }: { image: StaticImageData; alt: string; text: string }) {
  return (
    <div className="relative">
      <ParallaxImage src={image} alt={alt} sizes="100vw" strength={18} className="h-[70svh] min-h-[420px] w-full md:h-[90svh]" />
      <div className="pointer-events-none absolute inset-0 bg-ink/35" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" aria-hidden="true" />
      <p
        data-reveal
        className="absolute inset-x-5 bottom-[12%] mx-auto max-w-5xl text-center font-display text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.08] font-light text-bone italic md:inset-x-10"
      >
        {text}
      </p>
    </div>
  );
}
