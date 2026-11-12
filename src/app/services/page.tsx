import type { Metadata } from "next";
import { Contact, PageHero, ServicesDetailed } from "@/components/sections";
import { site } from "@/content/site";

const p = site.pages.services;

export const metadata: Metadata = {
  title: p.title,
  description: p.description,
  alternates: { canonical: "/services" },
  openGraph: { title: p.title, description: p.description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={p.title} heading={p.heading} intro={p.intro} />
      <ServicesDetailed />
      <div className="border-t border-line">
        <Contact />
      </div>
    </>
  );
}
