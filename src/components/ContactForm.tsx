"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { company, site } from "@/content/site";
import { Arrow } from "./Button";

const f = site.contact.form;

const fieldCls =
  "peer w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-7 text-lg text-fg outline-none transition-colors placeholder:text-transparent focus:border-gold focus:ring-0";
const labelCls =
  "pointer-events-none absolute left-0 top-7 text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-[0.12em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.12em]";

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const id = `contact-${name}`;
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={name} required={required} rows={5} placeholder={label} className={`${fieldCls} resize-y`} />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={label}
          className={fieldCls}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
    </div>
  );
}

/**
 * When `canSend` is true (RESEND_API_KEY is configured) the form posts to a server
 * action. Otherwise it opens the visitor's email app with the message pre-filled.
 */
export function ContactForm({ canSend }: { canSend: boolean }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {
    status: "idle",
  });

  const openMailto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    const subject = `Website enquiry — ${get("name")}${get("organisation") ? `, ${get("organisation")}` : ""}`;
    const body = [
      get("message"),
      "",
      `${get("name")}`,
      get("organisation"),
      get("phone"),
      get("email"),
    ]
      .filter((l, i) => l || i < 2)
      .join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (state.status === "sent") {
    return (
      <div role="status" className="border-t border-line pt-10">
        <p className="display text-[2.2rem] leading-tight md:text-[3rem]">{f.success}</p>
      </div>
    );
  }

  return (
    <form
      action={canSend ? action : undefined}
      onSubmit={canSend ? undefined : openMailto}
      className="grid gap-8"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <Field name="name" label={f.name} required autoComplete="name" />
        <Field name="email" label={f.email} type="email" required autoComplete="email" />
        <Field name="phone" label={f.phone} type="tel" autoComplete="tel" />
        <Field name="organisation" label={f.organisation} autoComplete="organization" />
      </div>
      <Field name="message" label={f.message} required textarea />

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-14 items-center justify-between gap-6 bg-gold px-7 font-medium text-ink transition-colors hover:bg-[#e6a641] disabled:opacity-60 md:justify-start"
        >
          {pending ? f.sending : f.submit}
          <Arrow />
        </button>
        {!canSend && <p className="text-sm text-muted">{f.mailtoNote}</p>}
      </div>

      <p aria-live="polite" className="min-h-6 text-sm">
        {state.status === "invalid" && state.message}
        {state.status === "error" && (
          <>
            {f.error}{" "}
            <a href={`mailto:${company.email}`} className="u-link text-accent">
              {company.email}
            </a>
          </>
        )}
      </p>
    </form>
  );
}
