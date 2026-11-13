import type { Metadata } from "next";
import { PageHero, ServicesDetailed } from "@/components/sections";
import { CtaBand, FaqList, FeatureGrid, Steps } from "@/components/blocks";
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
      <Steps block={p.process} tone="surface" />
      <FeatureGrid block={p.conditions} />
      <FaqList block={p.faq} tone="surface" />
      <CtaBand cta={p.cta} />
    </>
  );
}
