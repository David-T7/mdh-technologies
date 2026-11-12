import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "gold" | "line" | "plain";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  arrow?: boolean;
};

const base =
  "group inline-flex min-h-12 items-center gap-3 text-[0.95rem] font-medium transition-colors duration-300";

const variants: Record<Variant, string> = {
  gold: "bg-gold px-6 text-ink hover:bg-[#e6a641]",
  line: "border border-current/30 px-6 hover:border-current",
  plain: "px-0",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    >
      <path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "gold",
  external,
  className = "",
  arrow = true,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span className={variant === "plain" ? "u-link" : ""}>{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
