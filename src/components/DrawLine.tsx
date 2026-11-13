"use client";

import { m, useReducedMotion } from "motion/react";
import { ease } from "./Reveal";

/** A hairline rule that draws itself left-to-right when it scrolls into view. */
export function DrawLine({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <span aria-hidden="true" className={`h-px bg-line ${className}`} />;
  return (
    <m.span
      aria-hidden="true"
      className={`h-px origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.2, ease }}
    />
  );
}
