/**
 * Ethiopian texture, built in SVG/CSS — never images.
 *  - <Tibeb/>: a woven-border band inspired by tibeb, the patterned edge of
 *    a netela or kemis. Used as a quiet divider.
 *  - <FidelField/>: rows of the Ge'ez fidel (the syllabary every Ethiopian
 *    child learns first), used as a very low-opacity background.
 *  - geezNumeral(): Ge'ez numerals ፩ ፪ ፫ … for ordinal markers.
 */

export function Tibeb({
  className = "",
  id = "tibeb",
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg aria-hidden="true" className={`block h-[14px] w-full ${className}`} focusable="false">
      <defs>
        <pattern id={id} width="24" height="14" patternUnits="userSpaceOnUse">
          <path
            d="M0 7 6 1l6 6 6-6 6 6M0 7l6 6 6-6 6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M12 4.2 14.8 7 12 9.8 9.2 7Z" fill="currentColor" />
          <path d="M0 4.2 2.8 7 0 9.8M24 4.2 21.2 7 24 9.8" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* Base consonants: ሀ ለ ሐ መ ሠ ረ ሰ ሸ ቀ በ ተ ቸ ነ ኘ አ ከ ወ ዘ የ ደ ገ ጠ ፈ ፐ */
const bases = [
  0x1200, 0x1208, 0x1210, 0x1218, 0x1220, 0x1228, 0x1230, 0x1238, 0x1240, 0x1260, 0x1270,
  0x1278, 0x1290, 0x1298, 0x12a0, 0x12a8, 0x12c8, 0x12d8, 0x12e8, 0x12f0, 0x1308, 0x1320,
  0x1348, 0x1350,
];

export const fidelRows = bases.map((b) =>
  Array.from({ length: 7 }, (_, i) => String.fromCodePoint(b + i)),
);

export function FidelField({
  rows = 8,
  className = "",
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none font-ethiopic leading-[1.15] ${className}`}
    >
      {fidelRows.slice(0, rows).map((row, r) => (
        <div key={r} className="flex justify-between gap-[0.35em] whitespace-nowrap">
          {row.map((ch) => (
            <span key={ch}>{ch}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

const geez = ["", "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲"];

/** 1–10 → ፩–፲ */
export function geezNumeral(n: number) {
  return geez[n] ?? String(n);
}
