import Link from "next/link";
import { company, site } from "@/content/site";
import { Arrow, Button } from "./Button";
import { Beliefs } from "./Beliefs";
import { ContactForm } from "./ContactForm";
import { MapEmbed } from "./MapEmbed";
import { PhoneFrame } from "./PhoneFrame";
import { Confirm } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceList } from "./ServiceList";
import { StickyStory } from "./StickyStory";
import { Team } from "./Team";

const canSend = Boolean(process.env.RESEND_API_KEY);

/* ── 1 · Hero ─────────────────────────────────────────────────────────── */

export function Hero() {
  const h = site.hero;
  return (
    <section aria-labelledby="hero-title" suppressHydrationWarning data-spotlight="hero" className="band relative overflow-hidden">
      <div className="wrap relative flex min-h-[calc(100svh-var(--header-h))] flex-col pb-10 pt-10 md:pb-14 md:pt-16">
        <div className="rise flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.8rem] text-ink-muted">
          <p className="eyebrow">{h.eyebrow}</p>
          <p className="eyebrow">Addis Ababa, Ethiopia</p>
        </div>

        <h1
          id="hero-title"
          className="display rise-move mt-auto pt-16 text-[3.5rem] leading-[0.94] sm:text-[4.6rem] md:text-[7rem] xl:text-[9.4rem] wide:text-[10.5rem]"
        >
          <span className="block text-balance">{h.headline}</span>
          <span className="block italic text-highlight">{h.headlineEmphasis}</span>
        </h1>

        <div className="rise rise-2 mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
          <p className="max-w-[46ch] text-[1.08rem] leading-relaxed text-ink-muted md:col-span-6 md:col-start-7 md:text-[1.2rem] xl:col-span-5 xl:col-start-8">
            {h.body}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:col-start-7 xl:col-span-5 xl:col-start-8">
            <Button href={h.primaryCta.href} external>
              {h.primaryCta.label}
            </Button>
            <Button href={h.secondaryCta.href} variant="line">
              {h.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="rise rise-3 mt-14 flex items-center gap-4 text-ink-muted" aria-hidden="true">
          <span className="relative block h-12 w-px overflow-hidden bg-ink-line">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-brand" />
          </span>
          <span className="eyebrow">{h.scrollLabel}</span>
        </div>
      </div>
    </section>
  );
}

/* ── Inner-page hero ──────────────────────────────────────────────────── */

export function PageHero({ eyebrow, heading, intro }: { eyebrow: string; heading: string; intro?: string }) {
  return (
    <section suppressHydrationWarning data-spotlight="hero" className="band relative overflow-hidden">
      <div className="wrap relative pb-16 pt-16 md:pb-24 md:pt-28">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="display rise-move mt-8 max-w-[16ch] text-[3rem] md:text-[5.6rem] xl:text-[7rem]">
          {heading}
        </h1>
        {intro && (
          <p className="rise rise-2 mt-10 max-w-[52ch] text-lg leading-relaxed text-ink-muted md:ml-[41.66%] md:text-xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

/* ── 2 · Why we exist ─────────────────────────────────────────────────── */

export function WhyWeExist() {
  const w = site.why;
  return (
    <section aria-labelledby="why-title" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={w.eyebrow} />
        <h2 id="why-title" className="display mt-8 text-[2.6rem] md:text-[4rem] xl:text-[5rem]">
          {w.heading}
        </h2>
        <div className="mt-14 md:mt-20">
          <Beliefs beliefs={w.beliefs} />
        </div>
      </div>
    </section>
  );
}

/* ── 3 · Flagship product ─────────────────────────────────────────────── */

export function Flagship({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const p = site.product;
  const H = headingLevel;
  return (
    <section aria-labelledby="product-title" className="bg-surface py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={p.eyebrow} />

        <div className="mt-14 grid items-end gap-16 md:mt-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal>
              <p className="display text-[1.6rem] italic text-muted md:text-[2rem]">{p.name}</p>
              <H id="product-title" className="display mt-4 text-[3rem] md:text-[5rem] xl:text-[6.2rem]">
                {p.headline}
              </H>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[48ch] text-lg leading-relaxed text-muted md:text-xl">{p.body}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                {p.ctas.map((cta, i) => (
                  <Button key={cta.href} href={cta.href} external={cta.external} variant={i === 0 ? "primary" : "line"}>
                    {cta.label}
                  </Button>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <PhoneFrame
              src={p.heroScreenshot}
              alt={p.heroScreenshotAlt}
              expectedPath="/public/products/etlh-home.png"
              tone="paper"
              priority={false}
            />
          </Reveal>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <figure className="grid gap-6 border-t border-line pt-10 md:grid-cols-12">
            <span aria-hidden="true" className="display text-[5rem] leading-[0.6] text-highlight md:col-span-1">
              “
            </span>
            <blockquote className="display max-w-[26ch] text-[2rem] leading-[1.1] md:col-span-10 md:text-[3.2rem]">
              {p.principle}
            </blockquote>
            <figcaption className="eyebrow md:col-span-10 md:col-start-2">
              Our principle for {p.name}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 4 · Inside the product ───────────────────────────────────────────── */

export function InsideProduct() {
  const s = site.story;
  return (
    <section aria-labelledby="story-title" className="band py-24 md:py-32">
      <div className="wrap">
        <SectionHeading eyebrow={s.eyebrow} />
        <h2 id="story-title" className="display mt-8 max-w-[14ch] text-[2.6rem] md:text-[4rem] lg:mb-10">
          {s.heading}
        </h2>
        <div className="mt-14 lg:mt-0">
          <StickyStory panels={s.panels} />
        </div>
      </div>
    </section>
  );
}

/* ── 5 · Services ─────────────────────────────────────────────────────── */

export function Services() {
  const s = site.services;
  return (
    <section aria-labelledby="services-title" className="bg-surface py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={s.eyebrow} />
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <h2 id="services-title" className="display text-[2.6rem] md:col-span-7 md:text-[4rem] xl:text-[5rem]">
            {s.heading}
          </h2>
          <p className="max-w-[40ch] text-lg leading-relaxed text-muted md:col-span-4 md:col-start-9">
            {s.intro}
          </p>
        </div>
        <div className="mt-16 md:mt-24">
          <ServiceList items={s.items} cta={s.cta} />
        </div>
        <Link href="/services" className="group mt-10 inline-flex min-h-11 items-center gap-3 font-medium">
          <span className="u-link">All services</span>
          <Arrow />
        </Link>
      </div>
    </section>
  );
}

/** /services — every service expanded to a paragraph. */
export function ServicesDetailed() {
  const s = site.services;
  return (
    <section aria-label="Our services" className="py-20 md:py-32">
      <div className="wrap">
        <ol className="border-b border-line">
          {s.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.number}
              delay={i * 0.04}
              spotlight
              className="grid gap-6 border-t border-line py-14 md:grid-cols-12 md:gap-10 md:px-6 md:py-20"
            >
              <span className="font-mono text-sm tabular-nums text-muted md:col-span-1">{item.number}</span>
              <h2 className="display text-[2.4rem] md:col-span-5 md:text-[3.6rem]">
                {item.title}
                <Confirm note={item.confirm} />
              </h2>
              <div className="md:col-span-5 md:col-start-8">
                <p className="text-lg leading-relaxed text-muted">{item.detail}</p>
                <Link href="/contact" className="group mt-8 inline-flex min-h-11 items-center gap-3 font-medium">
                  <span className="u-link">{s.cta}</span>
                  <Arrow />
                </Link>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 6 · How we work ──────────────────────────────────────────────────── */

export function HowWeWork() {
  const p = site.principles;
  return (
    <section aria-labelledby="principles-title" className="ink py-16 md:py-24">
      <div className="wrap">
        <SectionHeading eyebrow={p.eyebrow} />
        <h2 id="principles-title" className="sr-only">
          {p.eyebrow}
        </h2>
        <ol className="mt-8 md:mt-10">
          {p.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.05}
              className="grid gap-2 border-t border-ink-line py-7 md:grid-cols-12 md:items-baseline md:gap-10 md:py-9"
            >
              <h3 className="display text-[2.3rem] md:col-span-7 md:text-[3.6rem] xl:text-[4.4rem]">
                {item.title}
              </h3>
              <p className="max-w-[34ch] text-lg text-ink-muted md:col-span-4 md:col-start-9 md:text-xl">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 7 · Team ─────────────────────────────────────────────────────────── */

export function TeamSection() {
  const t = site.team;
  return (
    <section aria-labelledby="team-title" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={t.eyebrow} />
        <h2 id="team-title" className="display mt-8 text-[2.6rem] md:text-[4rem] xl:text-[5rem]">
          {t.heading}
        </h2>
        <div className="mt-16 md:mt-24">
          <Team members={t.members} closing={t.closing} cta={t.profileCta} />
        </div>
      </div>
    </section>
  );
}

/* ── 9 · Contact ──────────────────────────────────────────────────────── */

function ContactBlock() {
  const rows = [
    {
      label: "Office",
      content: (
        <address className="not-italic">
          {company.address.lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
          <span className="mt-1 block font-mono text-sm text-muted">Plus code {company.address.plusCode}</span>
        </address>
      ),
    },
    {
      label: "Phone",
      content: (
        <a href={company.phoneHref} className="u-link inline-block py-1">
          {company.phone}
        </a>
      ),
    },
    {
      label: "Email",
      content: (
        <span className="flex flex-col items-start">
          {[company.infoEmail].map((email) => (
            <a key={email} href={`mailto:${email}`} className="u-link inline-block break-all py-1">
              {email}
            </a>
          ))}
        </span>
      ),
    },
    {
      label: "Telegram",
      content: (
        <a href={company.telegram.href} target="_blank" rel="noopener noreferrer" className="u-link inline-block py-1">
          {company.telegram.handle}
        </a>
      ),
    },
  ];

  return (
    <dl className="border-b border-line">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-5">
          <dt className="eyebrow pt-1">{r.label}</dt>
          <dd className="text-[1.05rem]">{r.content}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Contact({ withMap = false, as = "h2" }: { withMap?: boolean; as?: "h1" | "h2" }) {
  const c = site.contact;
  const H = as;
  return (
    <section aria-labelledby="contact-title" className="bg-surface py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={c.eyebrow} />
        <H id="contact-title" className="display mt-8 max-w-[14ch] text-[3rem] md:text-[5rem] xl:text-[6.4rem]">
          {c.headline}
        </H>
        <p className="mt-8 max-w-[44ch] text-lg text-muted">{c.intro}</p>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <ContactBlock />
            {withMap && (
              <div className="mt-10">
                <MapEmbed />
              </div>
            )}
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ContactForm canSend={canSend} />
          </div>
        </div>
      </div>
    </section>
  );
}
