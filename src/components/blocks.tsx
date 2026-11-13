import type { Block, CtaBand as CtaBandCopy, Faq, Fact, Feature, Link, Step } from "@/content/site";
import { Arrow, Button } from "./Button";
import { Confirm } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * Reusable page sections for the inner pages. All copy comes from
 * src/content/site.ts — these only decide the layout.
 */

type Tone = "plain" | "surface" | "ink";

const tones: Record<Tone, string> = {
  plain: "",
  surface: "bg-surface",
  ink: "ink",
};

function Section({
  tone = "plain",
  label,
  children,
}: {
  tone?: Tone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={label} className={`py-24 md:py-32 ${tones[tone]}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/* ── Key facts: label / value grid ─────────────────────────────────────── */

export function FactGrid({ block, tone = "plain" }: { block: Block<Fact>; tone?: Tone }) {
  return (
    <Section tone={tone} label={block.eyebrow}>
      <SectionHeading eyebrow={block.eyebrow}>{block.heading}</SectionHeading>
      <dl className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
        {block.items.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.04} spotlight className="border-b border-r border-line p-6 md:p-8">
            <dt className="eyebrow">{f.label}</dt>
            <dd className="mt-4 text-[1.2rem] leading-snug md:text-[1.35rem]">
              {f.value}
              <Confirm note={f.confirm} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}

/* ── Numbered steps ────────────────────────────────────────────────────── */

export function Steps({ block, tone = "plain" }: { block: Block<Step>; tone?: Tone }) {
  const cols = block.items.length >= 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  return (
    <Section tone={tone} label={block.eyebrow}>
      <SectionHeading eyebrow={block.eyebrow}>{block.heading}</SectionHeading>
      <ol className={`mt-14 grid gap-10 md:mt-20 md:gap-8 ${cols}`}>
        {block.items.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.06} className="border-t-2 border-highlight pt-6">
            <span className="font-mono text-sm tabular-nums text-highlight">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="display mt-4 text-[2rem] md:text-[2.4rem]">{step.title}</h3>
            <p className="mt-3 max-w-[36ch] leading-relaxed text-muted">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ── Feature cards ─────────────────────────────────────────────────────── */

export function FeatureGrid({ block, tone = "plain" }: { block: Block<Feature>; tone?: Tone }) {
  const cols = block.items.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  return (
    <Section tone={tone} label={block.eyebrow}>
      <SectionHeading eyebrow={block.eyebrow}>{block.heading}</SectionHeading>
      <ul className={`mt-14 grid gap-4 md:mt-20 ${cols}`}>
        {block.items.map((f, i) => (
          <Reveal as="li" key={f.title} delay={i * 0.05}>
            <div
              suppressHydrationWarning data-spotlight
              className="lift flex h-full flex-col rounded-2xl border border-line bg-card p-7 md:p-8"
            >
              <span aria-hidden="true" className="block h-1.5 w-10 rounded-full bg-brand" />
              <h3 className="display mt-8 text-[1.9rem] leading-[1.05] md:text-[2.2rem]">{f.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ── FAQ (native <details>, works without JS) ──────────────────────────── */

export function FaqList({ block, tone = "plain" }: { block: Block<Faq>; tone?: Tone }) {
  return (
    <Section tone={tone} label={block.eyebrow}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionHeading eyebrow={block.eyebrow} />
          <h2 className="display mt-8 text-[2.6rem] md:text-[3.4rem]">{block.heading}</h2>
        </div>
        <div className="border-b border-line md:col-span-7 md:col-start-6">
          {block.items.map((item) => (
            <details key={item.question} className="faq group border-t border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.15rem] font-medium md:text-[1.25rem] [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 text-highlight before:absolute before:left-0 before:top-1/2 before:h-[1.5px] before:w-4 before:-translate-y-1/2 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-4 after:w-[1.5px] after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-300 group-open:after:rotate-90"
                />
              </summary>
              <p className="max-w-[60ch] pb-7 text-lg leading-relaxed text-muted">
                {item.answer}
                <Confirm note={item.confirm} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Mission / vision statements ───────────────────────────────────────── */

export function Purpose({
  eyebrow,
  items,
}: {
  eyebrow: string;
  items: { label: string; text: string }[];
}) {
  return (
    <Section tone="surface" label={eyebrow}>
      <SectionHeading eyebrow={eyebrow} />
      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.06}>
            <p className="eyebrow text-highlight">{item.label}</p>
            <p className="display mt-5 text-[1.9rem] leading-[1.12] md:text-[2.3rem]">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Closing call to action ────────────────────────────────────────────── */

export function CtaBand({ cta }: { cta: CtaBandCopy }) {
  return (
    <section aria-label={cta.heading} suppressHydrationWarning data-spotlight="hero" className="ink relative overflow-hidden">
      <div className="wrap grid gap-10 py-24 md:grid-cols-12 md:items-end md:py-32">
        <div className="md:col-span-7">
          <h2 className="display text-[3rem] md:text-[4.6rem] xl:text-[5.4rem]">{cta.heading}</h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-muted md:text-xl">{cta.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
          <Button href={cta.primary.href} external={cta.primary.external}>
            {cta.primary.label}
          </Button>
          {cta.secondary && (
            <Button href={cta.secondary.href} external={cta.secondary.external} variant="line">
              {cta.secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Small inline support note ─────────────────────────────────────────── */

export function SupportNote({ heading, body, cta }: { heading: string; body: string; cta: Link }) {
  return (
    <section aria-label={heading} className="pb-24 md:pb-32">
      <div className="wrap">
        <div suppressHydrationWarning data-spotlight className="lift flex flex-col gap-6 rounded-2xl border border-line bg-card p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="display text-[2rem] md:text-[2.4rem]">{heading}</h2>
            <p className="mt-2 max-w-[52ch] text-muted">{body}</p>
          </div>
          <a
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            className="group inline-flex min-h-12 shrink-0 items-center gap-3 font-medium text-accent"
          >
            <span className="u-link">{cta.label}</span>
            <Arrow />
            {cta.external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        </div>
      </div>
    </section>
  );
}
