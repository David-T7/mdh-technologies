import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Render as a link to the homepage (default) or as plain text */
  asLink?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { mark: "text-[1.55rem]", word: "text-[0.6rem]" },
  md: { mark: "text-[1.9rem]", word: "text-[0.66rem]" },
  lg: { mark: "text-[3.4rem]", word: "text-[0.9rem]" },
};

/**
 * Plain lowercase wordmark: "mdh" + "technologies". No dots, symbols or extra marks.
 * When an official logo file is supplied in /public/brand, replace the inner markup
 * with that file (unchanged — never stretched, recoloured, outlined or shadowed).
 */
export function Logo({ className = "", asLink = true, size = "md" }: LogoProps) {
  const s = sizes[size];
  const mark = (
    <span className={`inline-flex items-baseline gap-[0.45em] leading-none ${className}`}>
      <span className={`font-serif ${s.mark} tracking-[-0.02em]`}>mdh</span>
      <span className={`${s.word} font-medium tracking-[0.2em] opacity-80`}>technologies</span>
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link href="/" className="inline-flex py-2">
      {mark}
    </Link>
  );
}
