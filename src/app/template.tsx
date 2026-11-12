"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect } from "react";

// The very first page load is never faded (it must paint immediately on slow
// connections); only client-side navigations after that get the transition.
let firstLoadDone = false;

/** Refined page transition: a short fade on route change. Off under reduced motion. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const animate = firstLoadDone && !reduce;

  useEffect(() => {
    firstLoadDone = true;
  }, []);

  if (!animate) return <>{children}</>;
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      {children}
    </m.div>
  );
}
