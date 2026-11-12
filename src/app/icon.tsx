import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon generated from the wordmark. */
export default async function Icon() {
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
          fontSize: 34,
          paddingBottom: 6,
        }}
      >
        mdh
      </div>
    ),
    { ...size, fonts: [{ name: "Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
