"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

type Letter = { letter: string; name: string };

/**
 * The letters m · d · h expand into the founders' first names when the block
 * scrolls into view (and again on hover/tap). Static and expanded under reduced motion.
 */
export function NameOrigin({ letters }: { letters: Letter[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const reduce = useReducedMotion();
  const [collapsed, setCollapsed] = useState(false);
  const expanded = reduce || (inView && !collapsed);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setCollapsed(false)}
      className="select-none"
    >
      <p className="sr-only">{letters.map((l) => l.name).join(", ")}</p>
      <div aria-hidden="true" className="flex flex-col">
        {letters.map((l, i) => {
          const rest = l.name.slice(1).toLowerCase();
          return (
            <span
              key={l.letter}
              className="display flex items-baseline whitespace-nowrap text-[5.2rem] leading-[0.95] sm:text-[7rem] md:text-[9rem] xl:text-[11rem]"
            >
              <span>{l.letter}</span>
              <span
                className="inline-block overflow-hidden italic text-gold transition-[max-width,opacity] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  maxWidth: expanded ? `${rest.length * 0.62}em` : "0em",
                  opacity: expanded ? 1 : 0,
                  transitionDelay: expanded ? `${i * 160}ms` : "0ms",
                }}
              >
                {rest}
              </span>
            </span>
          );
        })}
      </div>
      {!reduce && (
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="eyebrow mt-8 inline-flex min-h-11 items-center gap-2 hover:text-ink-fg"
        >
          {expanded ? "Fold back to m · d · h" : "Unfold the names"}
        </button>
      )}
    </div>
  );
}
