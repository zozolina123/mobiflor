"use client";

import { useActionState } from "react";
import { submitQuote, type QuoteField, type QuoteState } from "@/app/actions";
import type { Dictionary } from "@/dictionaries/ro";

const initial: QuoteState = { status: "idle" };

const inputClass =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-lg text-bone placeholder:text-mute/70 transition-colors focus:border-brass focus:ring-0 focus:outline-none aria-[invalid=true]:border-red-400";
const labelClass = "text-[11px] tracking-[0.25em] uppercase text-sand";

export default function ContactForm({ t }: { t: Dictionary["contact"]["form"] }) {
  const [state, action, pending] = useActionState(submitQuote, initial);

  const err = (f: QuoteField) => {
    const code = state.errors?.[f];
    return code ? t[code] : undefined;
  };
  const fieldProps = (f: QuoteField) => ({
    id: `f-${f}`,
    name: f,
    "aria-invalid": err(f) ? true : undefined,
    "aria-describedby": err(f) ? `f-${f}-err` : undefined,
    ...(f !== "consent" && { defaultValue: state.values?.[f] ?? "" }),
  });
  const errorText = (f: QuoteField) =>
    err(f) ? (
      <p id={`f-${f}-err`} className="mt-2 text-sm text-red-300">
        {err(f)}
      </p>
    ) : null;

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-[420px] items-center border border-brass/40 p-10">
        <p className="font-display text-3xl font-light text-bone md:text-4xl">{t.success}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-8 md:grid-cols-2">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="f-name" className={labelClass}>{t.name} *</label>
        <input {...fieldProps("name")} type="text" autoComplete="name" required className={inputClass} />
        {errorText("name")}
      </div>
      <div>
        <label htmlFor="f-phone" className={labelClass}>{t.phone} *</label>
        <input {...fieldProps("phone")} type="tel" autoComplete="tel" required className={inputClass} />
        {errorText("phone")}
      </div>
      <div>
        <label htmlFor="f-email" className={labelClass}>{t.email} *</label>
        <input {...fieldProps("email")} type="email" autoComplete="email" required className={inputClass} />
        {errorText("email")}
      </div>
      <div>
        <label htmlFor="f-type" className={labelClass}>{t.type}</label>
        <select {...fieldProps("type")} className={`${inputClass} [&>option]:bg-ink`}>
          <option value="" disabled>
            {t.typePlaceholder}
          </option>
          {t.types.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="f-message" className={labelClass}>{t.message}</label>
        <textarea {...fieldProps("message")} rows={4} placeholder={t.messagePlaceholder} className={`${inputClass} resize-none`} />
      </div>
      <div className="md:col-span-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-sand">
          <input {...fieldProps("consent")} type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-brass" />
          {t.consent}
        </label>
        {errorText("consent")}
      </div>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p role="alert" className="text-sm text-red-300">
          {state.status === "error" ? t.error : ""}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="bg-brass px-10 py-5 text-[12px] font-medium tracking-[0.25em] uppercase text-ink transition-colors hover:bg-brass-soft disabled:opacity-60"
        >
          {pending ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}
