"use client";

import { m, useReducedMotion } from "motion/react";
import type { Belief } from "@/content/site";
import { ease } from "./Reveal";

/** Line icons (24×24, stroked) that draw themselves when they scroll into view. */
const paths: Record<Belief["icon"], string[]> = {
  // Sun rising over a horizon
  sunrise: [
    "M2.5 18.5h19",
    "M7 18.5a5 5 0 0 1 10 0",
    "M12 8.5v2.5",
    "M5.6 11.6l1.7 1.7",
    "M18.4 11.6l-1.7 1.7",
    "M5 21.5h14",
  ],
  // Circular arrow — try again
  loop: ["M19.5 12a7.5 7.5 0 1 1-2.2-5.3", "M19.8 3.8v3.6h-3.6"],
  // An open door
  door: ["M3 21h18", "M6 21V3.5h12V21", "M6 3.5l7 2.2V21", "M10.6 13h.01"],
  // A staircase climbing up
  steps: ["M3 20h4.5v-4.5H12V11h4.5V6.5H21", "M18 3.5l3 3-3 3"],
  // Two people side by side
  hands: [
    "M8.5 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
    "M15.5 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
    "M2.5 20a6 6 0 0 1 12 0",
    "M9.5 20a6 6 0 0 1 12 0",
  ],
};

export function BeliefIcon({ icon, className = "" }: { icon: Belief["icon"]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[icon].map((d, i) =>
        reduce ? (
          <path key={d} d={d} />
        ) : (
          <m.path
            key={d}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.12 }}
          />
        ),
      )}
    </svg>
  );
}
