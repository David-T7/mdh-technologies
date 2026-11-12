import type { Metadata } from "next";
import { Contact } from "@/components/sections";
import { site } from "@/content/site";

const p = site.pages.contact;

export const metadata: Metadata = {
  title: p.title,
  description: p.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: p.title, description: p.description, url: "/contact" },
};

export default function ContactPage() {
  return <Contact withMap as="h1" />;
}
