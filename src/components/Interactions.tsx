"use client";

import { useEffect } from "react";

/**
 * Site-wide pointer effects, driven by one delegated listener (no per-card JS):
 *  - [data-spotlight]  a soft gold glow that follows the cursor (sets --mx / --my)
 *  - [data-tilt]       a gentle 3D tilt toward the cursor (sets --rx / --ry)
 * Only runs on precise pointers (mouse/trackpad). Tilt is skipped under
 * prefers-reduced-motion. Styles live in globals.css.
 */
export function Interactions() {
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    let last: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;

    const resetTilt = () => {
      if (!tilted) return;
      tilted.style.setProperty("--rx", "0deg");
      tilted.style.setProperty("--ry", "0deg");
      tilted = null;
    };

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e || !(e.target instanceof Element)) return;

      const spot = e.target.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      if (reduce) return;
      const tilt = e.target.closest<HTMLElement>("[data-tilt]");
      if (tilt !== tilted) resetTilt();
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
        tilted = tilt;
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => resetTilt();

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
