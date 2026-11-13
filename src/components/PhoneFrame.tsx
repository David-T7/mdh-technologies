import Image from "next/image";
import { LOGO_MARK_PATH } from "@/lib/brand";
import { ImagePlaceholderLabel } from "./Placeholder";

type PhoneFrameProps = {
  src: string | null;
  alt: string;
  /** The file path the founders should drop the screenshot into */
  expectedPath?: string;
  priority?: boolean;
  className?: string;
  tone?: "ink" | "paper";
};

/**
 * A plain phone frame for real ET Learning Hub screenshots (9:19.5).
 * With no screenshot it shows a clearly labelled placeholder — never a fake UI.
 */
export function PhoneFrame({
  src,
  alt,
  expectedPath = "/public/products/etlh-*.png",
  priority = false,
  className = "",
  tone = "ink",
}: PhoneFrameProps) {
  const frame =
    tone === "ink"
      ? "bg-[#1a1a1b] ring-1 ring-white/10"
      : "bg-[#0b0b0c] ring-1 ring-black/10";

  return (
    <div
      suppressHydrationWarning data-tilt
      className={`relative mx-auto aspect-[9/19.5] w-full max-w-[250px] md:max-w-[300px] rounded-[2.4rem] p-[9px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] ${frame} ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-[#f3efe6] text-[#3a3936]">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 300px, 70vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="flex h-full flex-col justify-between p-6" role="img" aria-label={`Placeholder: ${alt}`}>
            <div aria-hidden="true">
              <svg viewBox="30 70 472 162" className="h-auto w-[55%] text-[#d9962b]">
                <path d={LOGO_MARK_PATH} fill="currentColor" />
              </svg>
              <p className="mt-6 text-[1.05rem] font-medium leading-snug text-[#2a2927]">{alt}</p>
            </div>
            <ImagePlaceholderLabel kind="screenshot" path={expectedPath} className="text-[#5e5b55]" />
          </div>
        )}
        {/* speaker slot — only on placeholders; real screenshots carry their own top bar */}
        {!src && (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-2.5 h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-[#0b0b0c]"
          />
        )}
      </div>
    </div>
  );
}
