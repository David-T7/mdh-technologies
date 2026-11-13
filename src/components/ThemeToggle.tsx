"use client";

import { themeColors } from "@/lib/theme";

/**
 * Light / dark switch. Both icons are always rendered and CSS shows the right
 * one from data-theme, so server and client markup match (no hydration flash).
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      root.classList.add("theme-anim");
      window.setTimeout(() => root.classList.remove("theme-anim"), 400);
    }

    root.setAttribute("data-theme", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[next]);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked — the choice still applies for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-fg/10 ${className}`}
    >
      <span className="sr-only theme-label-light">Switch to dark mode</span>
      <span className="sr-only theme-label-dark">Switch to light mode</span>
      {/* Moon — shown in light mode */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-icon-light h-[18px] w-[18px]">
        <path
          d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      {/* Sun — shown in dark mode */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-icon-dark h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
