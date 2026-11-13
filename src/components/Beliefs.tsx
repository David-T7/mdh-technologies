import type { Belief } from "@/content/site";
import { BeliefIcon } from "./BeliefIcon";
import { Reveal } from "./Reveal";

/*
 * "Why we exist" as a bento of five beliefs — one word, one line each.
 * The first tile is the large ink feature; the rest are cards.
 * Spans on a 12-column grid: [7 tall][5] / [5] / [6][6]
 */
const spans = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-6",
  "md:col-span-6",
];

export function Beliefs({ beliefs }: { beliefs: Belief[] }) {
  return (
    <ul className="grid gap-4 md:auto-rows-[minmax(15rem,auto)] md:grid-cols-12">
      {beliefs.map((b, i) => {
        const feature = i === 0;
        return (
          <Reveal as="li" key={b.word} delay={i * 0.07} className={spans[i] ?? "md:col-span-6"}>
            <div
              suppressHydrationWarning data-spotlight={feature ? "hero" : ""}
              className={`lift group flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-7 md:p-9 ${
                feature ? "ink border-ink-line" : "border-line bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <BeliefIcon
                  icon={b.icon}
                  className={`text-highlight transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110 ${
                    feature ? "h-16 w-16 md:h-20 md:w-20" : "h-11 w-11"
                  }`}
                />
                <span className="font-mono text-xs tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className={feature ? "mt-16 md:mt-24" : "mt-10"}>
                <h3
                  className={`display leading-[0.95] ${
                    feature ? "text-[4.2rem] md:text-[6.5rem] xl:text-[7.5rem]" : "text-[2.4rem] md:text-[2.9rem]"
                  }`}
                >
                  {b.word}
                </h3>
                <p
                  className={
                    feature
                      ? "display mt-5 max-w-[16ch] text-[1.9rem] italic leading-[1.1] text-highlight md:text-[2.6rem]"
                      : "mt-3 max-w-[32ch] text-[1.05rem] leading-relaxed text-muted"
                  }
                >
                  {b.line}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
