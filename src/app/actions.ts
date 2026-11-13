"use server";

import { company } from "@/content/site";

export type ContactState = {
  status: "idle" | "sent" | "error" | "invalid";
  message?: string;
};

const clean = (v: FormDataEntryValue | null, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** Single line only — keeps names and organisations out of headers as multi-line text. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

/** Parses `Name <email@domain>` or a bare `email@domain`. */
function parseAddress(raw: string | undefined, fallbackName: string) {
  const m = raw?.match(/^\s*(?:"?([^"<]*?)"?\s*)?<([^>]+)>\s*$/);
  if (m) return { name: m[1]?.trim() || fallbackName, email: m[2].trim() };
  return raw?.trim() ? { name: fallbackName, email: raw.trim() } : null;
}

/**
 * Sends the contact form through Brevo's transactional email API.
 * Only called when BREVO_API_KEY is set; otherwise the form falls back to a
 * mailto: link in the browser.
 *
 * Env:
 *   BREVO_API_KEY  — required to send (Brevo → SMTP & API → API keys)
 *   CONTACT_FROM   — a sender verified in Brevo, e.g. "MDH Technologies Team <info@mdhtechnologies.com>"
 *   CONTACT_TO     — inbox to receive messages (default: company email)
 */
export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real people never fill this hidden field.
  if (clean(form.get("company_website"))) return { status: "sent" };

  const name = oneLine(clean(form.get("name"), 120));
  const email = clean(form.get("email"), 200);
  const phone = oneLine(clean(form.get("phone"), 60));
  const organisation = oneLine(clean(form.get("organisation"), 200));
  const subject = oneLine(clean(form.get("subject"), 150));
  const message = clean(form.get("message"), 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "invalid", message: "Please add your name, a valid email and a message." };
  }

  const apiKey = process.env.BREVO_API_KEY;
  const sender = parseAddress(process.env.CONTACT_FROM, "MDH Technologies Team");
  if (!apiKey || !sender) {
    console.error("Contact form: BREVO_API_KEY or CONTACT_FROM is not set");
    return { status: "error" };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender,
        to: [{ email: process.env.CONTACT_TO || company.infoEmail }],
        replyTo: { email, name },
        // "[Website]" keeps form messages easy to spot and filter in the inbox
        subject: subject
          ? `[Website] ${subject} — ${name}`
          : `Website enquiry — ${name}${organisation ? `, ${organisation}` : ""}`,
        textContent: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "—"}`,
          `Organisation: ${organisation || "—"}`,
          `Subject: ${subject || "—"}`,
          "",
          message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Contact form: Brevo responded", res.status, await res.text().catch(() => ""));
      return { status: "error" };
    }
    return { status: "sent" };
  } catch (err) {
    console.error("Contact form: Brevo request failed", err);
    return { status: "error" };
  }
}
