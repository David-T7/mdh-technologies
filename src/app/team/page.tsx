import type { Metadata } from "next";
import { PageHero } from "@/components/sections";
import { Team } from "@/components/Team";
import { CtaBand } from "@/components/blocks";
import { site } from "@/content/site";

const t = site.team;
const title = "Team";
const description = "Meet the founders of MDH Technologies, building software from Addis Ababa.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/team" },
  openGraph: { title, description, url: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero eyebrow={t.eyebrow} heading={t.heading} />
      <section aria-label={t.eyebrow} className="py-20 md:py-28">
        <div className="wrap">
          <Team members={t.members} closing={t.closing} cta={t.profileCta} />
        </div>
      </section>
      <CtaBand cta={site.pages.about.cta} />
    </>
  );
}
