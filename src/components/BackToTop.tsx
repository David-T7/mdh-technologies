"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useState } from "react";

const R = 20;

/** Floating "back to top" button with a gold ring that fills as you read. */
export function BackToTop() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 900));

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`ink group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:bottom-8 md:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="24" cy="24" r={R} fill="none" stroke="var(--ink-line)" strokeWidth="2" />
        <m.circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--brand-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path d="M8 14V2M3 7l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
