import type { Metadata } from "next";
import { Contact } from "@/components/sections";
import { Steps, SupportNote } from "@/components/blocks";
import { site } from "@/content/site";

const p = site.pages.contact;

export const metadata: Metadata = {
  title: p.title,
  description: p.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: p.title, description: p.description, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Contact withMap as="h1" />
      <Steps block={p.next} tone="surface" />
      <div className="bg-surface">
        <SupportNote heading={p.support.heading} body={p.support.body} cta={p.support.cta} />
      </div>
    </>
  );
}
