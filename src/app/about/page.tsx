import type { Metadata } from "next";
import { HowWeWork, PageHero, TeamSection, WhyWeExist } from "@/components/sections";
import { CtaBand, FactGrid, Purpose } from "@/components/blocks";
import { site } from "@/content/site";

const p = site.pages.about;

export const metadata: Metadata = {
  title: p.title,
  description: p.description,
  alternates: { canonical: "/about" },
  openGraph: { title: p.title, description: p.description, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={p.title} heading={p.heading} intro={p.intro} />
      <WhyWeExist />
      <Purpose eyebrow={p.purpose.eyebrow} items={p.purpose.items} />
      <TeamSection />
      <HowWeWork />
      <FactGrid block={p.glance} />
      <CtaBand cta={p.cta} />
    </>
  );
}
