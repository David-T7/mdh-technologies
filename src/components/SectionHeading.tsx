import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  index?: string;
  children?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
};

/** Eyebrow rule + optional large serif heading. */
export function SectionHeading({
  eyebrow,
  index,
  children,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        {index && (
          <span aria-hidden="true" className="font-ethiopic text-lg leading-none text-gold">
            {index}
          </span>
        )}
        <p className="eyebrow">{eyebrow}</p>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>
      {children && (
        <Tag className="display mt-8 max-w-[18ch] text-[2.6rem] md:text-[4rem] xl:text-[5rem]">
          {children}
        </Tag>
      )}
    </div>
  );
}
