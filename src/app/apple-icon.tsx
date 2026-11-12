import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const serif = await readFile(join(process.cwd(), "src/fonts/og-serif.woff"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0c",
          color: "#f2efe8",
          fontFamily: "Serif",
          fontSize: 92,
          paddingBottom: 14,
        }}
      >
        mdh
      </div>
    ),
    { ...size, fonts: [{ name: "Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
