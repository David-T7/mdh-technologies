import Link from "next/link";
import { company, site } from "@/content/site";
import { Arrow, Button } from "./Button";
import { ContactForm } from "./ContactForm";
import { MapEmbed } from "./MapEmbed";
import { NameOrigin } from "./NameOrigin";
import { PhoneFrame } from "./PhoneFrame";
import { Confirm } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceList } from "./ServiceList";
import { Statement } from "./Statement";
import { StickyStory } from "./StickyStory";
import { Team } from "./Team";
import { FidelField, Tibeb, geezNumeral } from "./Texture";

const canSend = Boolean(process.env.RESEND_API_KEY);

/* ── 1 · Hero ─────────────────────────────────────────────────────────── */

export function Hero() {
  const h = site.hero;
  return (
    <section aria-labelledby="hero-title" className="ink relative overflow-hidden">
      <FidelField
        rows={9}
        className="fade-edge-l absolute -right-[4%] top-[6%] w-[95%] text-[13vw] text-ink-fg opacity-[0.045] md:w-[62%] md:text-[5.4vw]"
      />

      <div className="wrap relative flex min-h-[calc(100svh-var(--header-h))] flex-col pb-10 pt-10 md:pb-14 md:pt-16">
        <div className="rise flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.8rem] text-ink-muted">
          <p className="eyebrow">{h.eyebrow}</p>
          <p className="eyebrow">Addis Ababa — Est. 2026</p>
        </div>

        <h1
          id="hero-title"
          className="display rise-move mt-auto pt-16 text-[3.5rem] leading-[0.94] sm:text-[4.6rem] md:text-[7rem] xl:text-[9.4rem] wide:text-[10.5rem]"
        >
          <span className="block text-balance">{h.headline}</span>
          <span className="block italic text-gold">{h.headlineEmphasis}</span>
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
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gold" />
          </span>
          <span className="eyebrow">{h.scrollLabel}</span>
        </div>
      </div>
      <Tibeb id="tibeb-hero" className="text-gold/25" />
    </section>
  );
}

/* ── Inner-page hero ──────────────────────────────────────────────────── */

export function PageHero({ eyebrow, heading, intro }: { eyebrow: string; heading: string; intro?: string }) {
  return (
    <section className="ink relative overflow-hidden">
      <FidelField
        rows={5}
        className="fade-edge-l absolute -right-[6%] top-[8%] w-[70%] text-[7vw] text-ink-fg opacity-[0.04] md:w-[48%] md:text-[3.6vw]"
      />
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
      <Tibeb id="tibeb-pagehero" className="text-gold/25" />
    </section>
  );
}

/* ── 2 · Why we exist ─────────────────────────────────────────────────── */

export function WhyWeExist({ expanded = false }: { expanded?: boolean }) {
  const w = site.why;
  return (
    <section aria-labelledby="why-title" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={w.eyebrow} index={geezNumeral(1)} />
        <h2 id="why-title" className="sr-only">
          {w.eyebrow}
        </h2>

        {expanded && (
          <div className="mt-14 grid gap-8 md:grid-cols-12">
            {w.expanded.map((p, i) => (
              <Reveal
                key={i}
                delay={i * 0.06}
                className={`text-lg leading-relaxed md:col-span-4 md:text-xl ${
                  i === 0 ? "md:col-start-1" : ""
                } ${i === 0 ? "text-fg" : "text-muted"}`}
              >
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-16 md:mt-24 md:grid md:grid-cols-12">
          <Statement lines={w.lines} className="md:col-span-11 md:col-start-2" />
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
        <SectionHeading eyebrow={p.eyebrow} index={geezNumeral(2)} />

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
                <Button href={p.ctas[0].href} external>
                  {p.ctas[0].label}
                </Button>
                <Button href={p.ctas[1].href} external variant="line">
                  {p.ctas[1].label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
            <PhoneFrame
              src={p.heroScreenshot}
              alt={p.heroScreenshotAlt}
              glyph="ሀ"
              expectedPath="/public/products/etlh-home.png"
              tone="paper"
              priority={false}
            />
          </Reveal>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <figure className="grid gap-6 border-t border-line pt-10 md:grid-cols-12">
            <span aria-hidden="true" className="display text-[5rem] leading-[0.6] text-gold md:col-span-1">
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
    <section aria-labelledby="story-title" className="ink py-24 md:py-32">
      <div className="wrap">
        <SectionHeading eyebrow={s.eyebrow} index={geezNumeral(3)} />
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
    <section aria-labelledby="services-title" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={s.eyebrow} index={geezNumeral(4)} />
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
              className="grid gap-6 border-t border-line py-14 md:grid-cols-12 md:gap-10 md:py-20"
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
    <section aria-labelledby="principles-title" className="ink py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={p.eyebrow} index={geezNumeral(5)} />
        <h2 id="principles-title" className="sr-only">
          {p.eyebrow}
        </h2>
        <ol className="mt-14 md:mt-20">
          {p.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.05}
              className="grid gap-3 border-t border-ink-line py-10 md:grid-cols-12 md:items-baseline md:gap-10 md:py-14"
            >
              <h3 className="display text-[2.6rem] md:col-span-7 md:text-[4.4rem] xl:text-[5.4rem]">
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
        <SectionHeading eyebrow={t.eyebrow} index={geezNumeral(6)} />
        <h2 id="team-title" className="display mt-8 text-[2.6rem] md:text-[4rem] xl:text-[5rem]">
          {t.heading}
        </h2>
        <div className="mt-16 md:mt-24">
          <Team members={t.members} closing={t.closing} />
        </div>
      </div>
    </section>
  );
}

/* ── 8 · Origin of the name ───────────────────────────────────────────── */

export function NameOriginSection() {
  const n = site.nameOrigin;
  return (
    <section aria-labelledby="name-title" className="ink overflow-hidden py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={n.eyebrow} index={geezNumeral(7)} />
        <h2 id="name-title" className="sr-only">
          {n.eyebrow}
        </h2>
        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <NameOrigin letters={n.letters} />
          </div>
          <Reveal className="md:col-span-4">
            <p className="display text-[1.8rem] leading-[1.15] md:text-[2.2rem]">
              {n.line}
              <Confirm note={n.confirm} className="mt-3" />
            </p>
          </Reveal>
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
        <a href={`mailto:${company.email}`} className="u-link inline-block break-all py-1">
          {company.email}
        </a>
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
    {
      label: "GitHub",
      content: (
        <a href={company.github} target="_blank" rel="noopener noreferrer" className="u-link inline-block py-1">
          github.com/mdhtechnologies
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
    <section aria-labelledby="contact-title" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHeading eyebrow={c.eyebrow} index={geezNumeral(8)} />
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
