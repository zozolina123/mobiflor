type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  className?: string;
};

export default function SectionHeading({ id, eyebrow, title, lede, className = "" }: Props) {
  return (
    <div className={className}>
      <p data-reveal className="mb-5 flex items-center gap-4 text-[12px] tracking-[0.35em] uppercase text-brass">
        <span className="h-px w-10 bg-brass/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        data-reveal
        style={{ "--d": "0.1s" } as React.CSSProperties}
        className="max-w-[20ch] font-display text-[clamp(2.4rem,5vw,4.75rem)] leading-[1] font-light text-bone"
      >
        {title}
      </h2>
      {lede && (
        <p data-reveal style={{ "--d": "0.2s" } as React.CSSProperties} className="mt-6 max-w-xl text-lg leading-relaxed text-sand">
          {lede}
        </p>
      )}
    </div>
  );
}
