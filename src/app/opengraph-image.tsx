import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "MDH Technologies — Life doesn't have to be this hard.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fidel = "ሀ ሁ ሂ ሃ ሄ ህ ሆ";

export default async function OpengraphImage() {
  const [serif, serifItalic, ethiopic] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/og-serif.woff")),
    readFile(join(process.cwd(), "src/fonts/og-serif-italic.woff")),
    readFile(join(process.cwd(), "src/fonts/og-ethiopic.woff")),
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
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 40,
            fontFamily: "Ethiopic",
            fontSize: 120,
            color: "#f2efe8",
            opacity: 0.06,
            display: "flex",
          }}
        >
          {fidel}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontSize: 56 }}>mdh</span>
          <span style={{ fontSize: 22, letterSpacing: 4, opacity: 0.8 }}>technologies</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1 }}>
          <span>{site.hero.headline}</span>
          <span style={{ color: "#d9962b", fontStyle: "italic" }}>{site.hero.headlineEmphasis}</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a8a59e" }}>
          Software that makes systems work better — starting with ET Learning Hub.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        { name: "Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Ethiopic", data: ethiopic, style: "normal", weight: 400 },
      ],
    },
  );
}
