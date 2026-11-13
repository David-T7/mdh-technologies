import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { LOGO_MARK_PATH, LOGO_VIEWBOX, LOGO_WORD_PATH } from "@/lib/brand";

export const alt = "MDH Technologies — Life doesn't have to be this hard.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [serif, serifItalic] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/og-serif.woff")),
    readFile(join(process.cwd(), "src/fonts/og-serif-italic.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#f2efe8",
          padding: "72px 80px",
          fontFamily: "Serif",
        }}
      >
        <svg width={286} height={60} viewBox={LOGO_VIEWBOX}>
          <path d={LOGO_MARK_PATH} fill="#f2efe8" />
          <path d={LOGO_WORD_PATH} fill="#f2efe8" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1 }}>
          <span>{site.hero.headline}</span>
          <span style={{ color: "#d9962b", fontStyle: "italic" }}>{site.hero.headlineEmphasis}</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a8a59e" }}>
          Software that makes systems work better — including ET Learning Hub.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "Serif", data: serifItalic, style: "italic", weight: 400 },
      ],
    },
  );
}
