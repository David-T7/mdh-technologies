import Link from "next/link";
import { LOGO_MARK_PATH, LOGO_VIEWBOX, LOGO_WORD_PATH } from "@/lib/brand";

type LogoProps = {
  className?: string;
  /** Render as a link to the homepage (default) or as a plain mark */
  asLink?: boolean;
  size?: "sm" | "md" | "lg";
};

const heights = {
  sm: "h-10 md:h-12",
  md: "h-9",
  lg: "h-14",
};

/**
 * Official MDH Technologies logo (from the brand files), drawn inline so it takes
 * the surrounding text colour: white on blue/ink sections, dark on light ones —
 * matching the brand's White and Dark versions. Never stretch, outline or shadow it.
 */
export function Logo({ className = "", asLink = true, size = "md" }: LogoProps) {
  const mark = (
    <svg
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label="MDH Technologies"
      className={`block w-auto shrink-0 ${heights[size]} ${className}`}
    >
      <path d={LOGO_MARK_PATH} fill="currentColor" />
      <path d={LOGO_WORD_PATH} fill="currentColor" />
    </svg>
  );

  if (!asLink) return mark;

  return (
    <Link href="/" className="inline-flex py-2" aria-label="MDH Technologies — home">
      {mark}
    </Link>
  );
}
