"use server";

export type QuoteField = "name" | "phone" | "email" | "type" | "message" | "consent";
export type QuoteState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<QuoteField, "required" | "invalidEmail">>;
  /** Echoed back on error so the form keeps what the visitor typed. */
  values?: Partial<Record<Exclude<QuoteField, "consent">, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get("company") ?? "").trim()) return { status: "success" };

  const get = (k: string) => String(formData.get(k) ?? "").trim().slice(0, 2000);
  const data = {
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    type: get("type"),
    message: get("message"),
    consent: formData.get("consent") === "on",
  };

  const errors: QuoteState["errors"] = {};
  if (!data.name) errors.name = "required";
  if (!data.phone) errors.phone = "required";
  if (!data.email) errors.email = "required";
  else if (!EMAIL_RE.test(data.email)) errors.email = "invalidEmail";
  if (!data.consent) errors.consent = "required";
  if (Object.keys(errors).length) {
    const { name, phone, email, type, message } = data;
    return { status: "error", errors, values: { name, phone, email, type, message } };
  }

  // TODO: deliver the request, e.g. send an email with Resend/Nodemailer or push to a CRM.
  console.info("[quote request]", { ...data, receivedAt: new Date().toISOString() });

  return { status: "success" };
}
