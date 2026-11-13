import { ImageResponse } from "next/og";
import { ICON_SYMBOL_PATH, ICON_VIEWBOX } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: the official mdh symbol on brand blue (iOS rounds the corners). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width={size.width} height={size.height} viewBox={ICON_VIEWBOX}>
        <rect width="512" height="512" fill="#0b0b0c" />
        <path d={ICON_SYMBOL_PATH} fill="#f2efe8" />
      </svg>
    ),
    size,
  );
}
