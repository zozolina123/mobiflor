import Link from "next/link";

// Rendered inside the [lang] layout; kept bilingual since the locale may be invalid here.
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-[10rem] leading-none font-light text-brass italic">404</p>
      <h1 className="mt-4 font-display text-4xl text-bone">Pagina nu a fost găsită · Page not found</h1>
      <div className="mt-10 flex gap-6 text-[12px] tracking-[0.25em] uppercase">
        <Link href="/ro" className="border border-brass/60 px-6 py-3 text-brass-soft hover:bg-brass hover:text-ink">
          Acasă
        </Link>
        <Link href="/en" className="border border-line px-6 py-3 text-sand hover:text-bone">
          Home
        </Link>
      </div>
    </main>
  );
}
