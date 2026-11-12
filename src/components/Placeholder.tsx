import { flags } from "@/content/site";

/** Visible "[CONFIRM: …]" tag. Hidden once flags.showPlaceholders is false. */
export function Confirm({ note, className = "" }: { note?: string; className?: string }) {
  if (!note || !flags.showPlaceholders) return null;
  return (
    <span
      className={`ml-2 inline-block border border-gold/70 px-1.5 py-0.5 align-middle font-sans text-[0.62rem] font-medium uppercase not-italic leading-none tracking-[0.08em] text-gold ${className}`}
    >
      [CONFIRM: {note}]
    </span>
  );
}

const labels = {
  screenshot: "Image placeholder — official app screenshot required",
  portrait: "Image placeholder — official portrait required",
  photograph: "Image placeholder — official photograph required",
};

/** Label for a missing official image (format from brief section 15). */
export function ImagePlaceholderLabel({
  kind,
  path,
  className = "",
}: {
  kind: keyof typeof labels;
  path?: string;
  className?: string;
}) {
  if (!flags.showPlaceholders) return null;
  return (
    <span
      className={`block font-sans text-[0.6rem] font-medium uppercase leading-snug tracking-[0.12em] ${className}`}
    >
      {labels[kind]}
      {path && <span className="mt-1 block normal-case tracking-normal opacity-70">{path}</span>}
    </span>
  );
}
