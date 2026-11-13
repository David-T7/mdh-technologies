"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { Service } from "@/content/site";
import { Arrow } from "./Button";
import { Confirm } from "./Placeholder";

/**
 * Editorial numbered list. Rows expand on hover (pointer devices) or tap/keyboard.
 * Not icon cards.
 */
export function ServiceList({ items, cta }: { items: Service[]; cta: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <ul className="border-b border-line" onMouseLeave={() => setOpen(null)}>
      {items.map((s, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li
            key={s.number}
            suppressHydrationWarning data-spotlight
            className="border-t border-line"
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) setOpen(i);
            }}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-x-3 py-7 text-left md:grid-cols-[6rem_1fr_auto] md:py-9"
              >
                <span className="font-mono text-sm tabular-nums text-muted">{s.number}</span>
                <span className="display text-[2rem] transition-transform duration-500 group-hover:translate-x-2 md:text-[3.2rem] xl:text-[3.8rem]">
                  {s.title}
                  <Confirm note={s.confirm} />
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-5 w-5 self-center transition-transform duration-500 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <span className="absolute left-0 top-1/2 h-px w-5 bg-current" />
                  <span className="absolute left-1/2 top-0 h-5 w-px bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="grid grid-cols-[3rem_1fr] gap-x-3 pb-9 md:grid-cols-[6rem_1fr]">
                  <div />
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <p className="max-w-[44ch] text-lg leading-relaxed text-muted">{s.summary}</p>
                    <Link
                      href="/contact"
                      className="group inline-flex min-h-11 shrink-0 items-center gap-3 font-medium"
                    >
                      <span className="u-link">{cta}</span>
                      <Arrow />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
