"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { StoryPanel } from "@/content/site";
import { PhoneFrame } from "./PhoneFrame";
import { fidelRows, geezNumeral } from "./Texture";

const glyphs = fidelRows.map((row) => row[0]);

function screenshotPath(i: number) {
  return `/public/products/etlh-0${i + 1}.png`;
}

/**
 * Desktop: a sticky phone on the left; text panels scroll past on the right and
 * swap the screenshot. Phones/tablets: a horizontal, swipeable sequence.
 */
export function StickyStory({ panels }: { panels: StoryPanel[] }) {
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const panelRefs = useRef<(HTMLLIElement | null)[]>([]);
  const rowRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  // Desktop: which text panel sits in the middle of the viewport?
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mobile: which slide is snapped?
  const onRowScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const w = row.firstElementChild?.getBoundingClientRect().width ?? row.clientWidth;
    setSlide(Math.round(row.scrollLeft / (w + 16)));
  };

  const goTo = (i: number) => {
    const row = rowRef.current;
    const target = row?.children[i] as HTMLElement | undefined;
    if (row && target) {
      row.scrollTo({ left: target.offsetLeft - row.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    }
  };

  const current = panels[active];

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="col-span-5">
          <div className="sticky top-[calc(var(--header-h)+6vh)] flex items-start gap-8 pb-[6vh]">
            <div className="relative w-[280px] shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PhoneFrame
                    src={current.screenshot}
                    alt={current.screenshotAlt}
                    glyph={glyphs[active]}
                    expectedPath={screenshotPath(active)}
                  />
                </m.div>
              </AnimatePresence>
            </div>
            <p
              aria-hidden="true"
              className="mt-2 font-ethiopic text-[1.4rem] leading-none text-gold [writing-mode:vertical-rl]"
            >
              {geezNumeral(active + 1)} / {geezNumeral(panels.length)}
            </p>
          </div>
        </div>

        <ol className="col-span-6 col-start-7">
          {panels.map((p, i) => (
            <li
              key={p.title}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              data-index={i}
              className="flex min-h-[78vh] flex-col justify-center border-t border-line first:border-t-0"
            >
              <p className="eyebrow tabular-nums">
                {String(i + 1).padStart(2, "0")} — {String(panels.length).padStart(2, "0")}
              </p>
              <h3
                className={`display mt-6 text-[3.6rem] transition-opacity duration-500 xl:text-[4.4rem] ${
                  active === i ? "opacity-100" : "opacity-40"
                }`}
              >
                {p.title}
              </h3>
              <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Mobile / tablet ─────────────────────────────────────── */}
      <div className="lg:hidden">
        <ol
          ref={rowRef}
          onScroll={onRowScroll}
          aria-label="Product story — swipe for more"
          className="snap-row -mx-[var(--gutter)] flex gap-4 overflow-x-auto px-[var(--gutter)] pb-2"
        >
          {panels.map((p, i) => (
            <li
              key={p.title}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${panels.length}`}
              className="w-[82vw] max-w-[420px] shrink-0 md:w-[46vw]"
            >
              <PhoneFrame
                src={p.screenshot}
                alt={p.screenshotAlt}
                glyph={glyphs[i]}
                expectedPath={screenshotPath(i)}
                className="max-w-[230px]"
              />
              <p className="eyebrow mt-8 tabular-nums">
                {String(i + 1).padStart(2, "0")} — {String(panels.length).padStart(2, "0")}
              </p>
              <h3 className="display mt-3 text-[2.2rem]">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex items-center gap-1" role="group" aria-label="Choose a slide">
          {panels.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1}: ${p.title}`}
              aria-current={slide === i ? "true" : undefined}
              className="flex h-11 flex-1 items-center"
            >
              <span
                className={`block h-[2px] w-full transition-colors duration-300 ${
                  slide === i ? "bg-gold" : "bg-line"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
