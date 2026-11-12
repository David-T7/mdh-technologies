import { Reveal } from "./Reveal";

/** Large-type statement: one idea per line, each revealed on scroll. */
export function Statement({
  lines,
  className = "",
  size = "lg",
}: {
  lines: string[];
  className?: string;
  size?: "lg" | "md";
}) {
  const type =
    size === "lg"
      ? "text-[2.1rem] md:text-[3.4rem] xl:text-[4.2rem]"
      : "text-[1.8rem] md:text-[2.6rem] xl:text-[3.2rem]";

  return (
    <ol className={`flex flex-col ${className}`}>
      {lines.map((line, i) => (
        <Reveal
          as="li"
          key={line}
          className={`display grid grid-cols-[2.2rem_1fr] gap-x-3 border-t border-line py-8 leading-[1.06] md:grid-cols-[5rem_1fr] md:py-12 ${type}`}
        >
          <span className="pt-[0.35em] font-mono text-[0.75rem] tracking-normal text-muted tabular-nums md:text-sm">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="max-w-[22ch] text-balance">{line}</span>
        </Reveal>
      ))}
    </ol>
  );
}
