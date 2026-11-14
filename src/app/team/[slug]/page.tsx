import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CtaBand } from "@/components/blocks";
import { Arrow } from "@/components/Button";
import { Confirm } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Portrait } from "@/components/Team";
import { site, type TeamMember } from "@/content/site";

const members = site.team.members;

function find(slug: string): TeamMember | undefined {
  return members.find((m) => m.slug === slug);
}

export function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const member = find((await params).slug);
  if (!member) return {};
  const title = `${member.name} — ${member.role}`;
  const description = member.profile.summary;
  return {
    title,
    description,
    alternates: { canonical: `/team/${member.slug}` },
    openGraph: { title, description, url: `/team/${member.slug}`, type: "profile" },
  };
}

/**
 * `params` is URL data, so it is read inside a <Suspense> boundary (Cache
 * Components / instant navigation). Both slugs are prerendered by
 * generateStaticParams, so the fallback is rarely seen.
 */
export default function FounderPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div aria-hidden="true" className="band min-h-[80svh]" />}>
      <Profile params={params} />
    </Suspense>
  );
}

async function Profile({ params }: { params: Promise<{ slug: string }> }) {
  const member = find((await params).slug);
  if (!member) notFound();

  const p = member.profile;
  const next = members[(members.indexOf(member) + 1) % members.length];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section suppressHydrationWarning data-spotlight="hero" className="band relative overflow-hidden">
        <div className="wrap relative pb-16 pt-10 md:pb-24 md:pt-14">
          <Link href="/team" className="group rise inline-flex min-h-11 items-center gap-3 text-sm text-ink-muted hover:text-ink-fg">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1">
              <path d="M15 8H2M7 3 2 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <span className="u-link">{site.team.eyebrow}</span>
          </Link>

          <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12 md:items-end md:gap-10">
            <div className="group rise rise-1 md:col-span-5">
              <Portrait
                member={member}
                sizes="(min-width: 640px) 300px, 92vw"
                priority
                className="aspect-square w-full max-w-[300px] rounded-2xl"
              />
            </div>

            <div className="md:col-span-7 md:pb-4">
              <p className="eyebrow rise">
                {member.role}
                <Confirm note={member.confirm} />
              </p>
              <h1 className="display rise-move mt-6 text-[3.4rem] leading-[0.95] md:text-[5.2rem] xl:text-[6.4rem]">
                {member.name}
              </h1>
              <p className="rise rise-1 mt-6 text-lg text-highlight md:text-xl">{p.headline}</p>

              <ul className="rise rise-2 mt-8 flex flex-wrap gap-2">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-ink-line px-4 py-2 text-[0.85rem] text-ink-fg transition-colors hover:border-brand"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <p className="rise rise-2 mt-8 max-w-[52ch] text-lg leading-relaxed text-ink-muted">{p.summary}</p>

              <div className="rise rise-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                {member.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-3 font-medium"
                  >
                    <span className="u-link">{l.label}</span>
                    <Arrow />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
                {member.location && <span className="text-sm text-ink-muted">{member.location}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience timeline ──────────────────────────────────────── */}
      <section aria-labelledby="experience-title" className="py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-[calc(var(--header-h)+3rem)]">
              <SectionHeading eyebrow="Experience" />
              <h2 id="experience-title" className="display mt-8 text-[2.6rem] md:text-[3.4rem]">
                Where the work happened.
              </h2>
            </div>
          </div>
          <ol className="relative md:col-span-7 md:col-start-6">
            <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-line" />
            {p.experience.map((job, i) => (
              <Reveal as="li" key={`${job.org}-${job.title}`} delay={i * 0.05} className="group relative pb-14 pl-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border-2 border-brand bg-bg transition-colors duration-300 group-hover:bg-brand"
                />
                <p className="font-mono text-sm tabular-nums text-muted">{job.period}</p>
                <h3 className="display mt-2 text-[1.9rem] leading-[1.05] md:text-[2.3rem]">{job.title}</h3>
                <p className="mt-1 font-medium">
                  {job.org}
                  {job.place && <span className="font-normal text-muted"> · {job.place}</span>}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-highlight" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Selected work ────────────────────────────────────────────── */}
      {p.projects.length > 0 && (
        <section aria-labelledby="work-title" className="bg-surface py-24 md:py-32">
          <div className="wrap">
            <SectionHeading eyebrow="Selected work" />
            <h2 id="work-title" className="display mt-8 text-[2.6rem] md:text-[3.4rem]">
              Things built along the way.
            </h2>
            <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
              {p.projects.map((proj, i) => (
                <Reveal as="li" key={proj.name} delay={i * 0.06}>
                  <div suppressHydrationWarning data-spotlight className="lift flex h-full flex-col rounded-2xl border border-line bg-card p-7 md:p-9">
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="display text-[2rem] leading-[1.05] md:text-[2.5rem]">{proj.name}</h3>
                      <span className="font-mono text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-4 max-w-[46ch] leading-relaxed text-muted">{proj.summary}</p>
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                      <ul className="flex flex-wrap gap-2">
                        {proj.tags.map((t) => (
                          <li key={t} className="rounded-full bg-surface px-3 py-1 text-[0.8rem] text-muted">
                            {t}
                          </li>
                        ))}
                      </ul>
                      {proj.link && (
                        <a
                          href={proj.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex min-h-11 items-center gap-2 font-medium"
                        >
                          <span className="u-link">{proj.link.label}</span>
                          <Arrow />
                          <span className="sr-only"> {proj.name} (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Education · skills · recognition ─────────────────────────── */}
      <section aria-label="Education, skills and recognition" className="py-24 md:py-32">
        <div className="wrap grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <SectionHeading eyebrow="Education" />
            <ul className="mt-10 space-y-8">
              {p.education.map((e) => (
                <Reveal as="li" key={e.degree}>
                  <p className="font-mono text-sm tabular-nums text-muted">{e.period}</p>
                  <h3 className="display mt-2 text-[1.8rem] leading-[1.1]">{e.degree}</h3>
                  <p className="mt-1 font-medium">{e.school}</p>
                  {e.note && <p className="text-sm text-muted">{e.note}</p>}
                </Reveal>
              ))}
            </ul>

            <div className="mt-16">
              <SectionHeading eyebrow="Languages" />
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.languages.map((l) => (
                  <li key={l} className="rounded-full border border-line px-4 py-2 text-[0.9rem]">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <SectionHeading eyebrow="Skills" />
            <div className="mt-10 space-y-8">
              {p.skills.map((g) => (
                <Reveal key={g.group}>
                  <p className="eyebrow">{g.group}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="cursor-default rounded-full border border-line bg-card px-4 py-2 text-[0.9rem] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-brand"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {p.recognition.length > 0 && (
            <div className="mt-16">
              <SectionHeading eyebrow="Recognition" />
              <ul className="mt-6 border-b border-line">
                {p.recognition.map((r) => (
                  <li
                    key={r.title}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line py-4"
                  >
                    <span className="font-medium">{r.title}</span>
                    <span className="text-sm text-muted">{r.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Next founder ─────────────────────────────────────────────── */}
      {next.slug !== member.slug && (
        <section aria-label="Next founder" className="border-t border-line">
          <Link
            href={`/team/${next.slug}`}
            suppressHydrationWarning data-spotlight
            className="group wrap flex flex-col gap-4 py-16 md:flex-row md:items-end md:justify-between md:py-24"
          >
            <div>
              <p className="eyebrow">Next founder</p>
              <p className="display mt-4 text-[3rem] leading-[0.95] transition-colors duration-300 group-hover:text-highlight md:text-[5rem]">
                {next.name}
              </p>
              <p className="mt-3 text-muted">{next.profile.headline}</p>
            </div>
            <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-on-brand">
              <Arrow className="h-5 w-5" />
            </span>
          </Link>
        </section>
      )}

      <CtaBand
        cta={{
          heading: "Work with us.",
          body: "Have a project or an idea? The founders read every message.",
          primary: { label: "Get in touch", href: "/contact" },
          secondary: { label: "About MDH", href: "/about" },
        }}
      />
    </>
  );
}
