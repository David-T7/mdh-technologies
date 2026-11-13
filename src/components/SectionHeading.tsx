import type { ReactNode } from "react";
import { DrawLine } from "./DrawLine";

type SectionHeadingProps = {
  eyebrow: string;
  children?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
};

/** Eyebrow rule + optional large serif heading. */
export function SectionHeading({
  eyebrow,
  children,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <p className="eyebrow">{eyebrow}</p>
        <DrawLine className="flex-1" />
      </div>
      {children && (
        <Tag className="display mt-8 max-w-[18ch] text-[2.6rem] md:text-[4rem] xl:text-[5rem]">
          {children}
        </Tag>
      )}
    </div>
  );
}
