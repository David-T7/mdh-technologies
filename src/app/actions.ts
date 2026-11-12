"use server";

import { Resend } from "resend";
import { company } from "@/content/site";

export type ContactState = {
  status: "idle" | "sent" | "error" | "invalid";
  message?: string;
};

const clean = (v: FormDataEntryValue | null, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/**
 * Sends the contact form through Resend. Only called when RESEND_API_KEY is set;
 * otherwise the form falls back to a mailto: link in the browser.
 *
 * Env:
 *   RESEND_API_KEY  — required to send
 *   CONTACT_TO      — inbox to receive messages (default: company email)
 *   CONTACT_FROM    — verified sender, e.g. "MDH Website <web@yourdomain>"
 *                     (default: Resend's test sender, which only delivers to
 *                     the Resend account owner's address)
 */
export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real people never fill this hidden field.
  if (clean(form.get("company_website"))) return { status: "sent" };

  const name = clean(form.get("name"), 120);
  const email = clean(form.get("email"), 200);
  const phone = clean(form.get("phone"), 60);
  const organisation = clean(form.get("organisation"), 200);
  const message = clean(form.get("message"), 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "invalid", message: "Please add your name, a valid email and a message." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { status: "error" };

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || "MDH Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO || company.email,
      replyTo: email,
      subject: `Website enquiry — ${name}${organisation ? `, ${organisation}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Organisation: ${organisation || "—"}`,
        "",
        message,
      ].join("\n"),
    });
    if (error) return { status: "error" };
    return { status: "sent" };
  } catch {
    return { status: "error" };
  }
}
