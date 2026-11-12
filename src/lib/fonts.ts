import localFont from "next/font/local";

/*
 * Fonts are self-hosted (copied from @fontsource packages into src/fonts) so the
 * build never depends on fonts.googleapis.com and nothing is requested from Google
 * at runtime.
 */

export const instrument = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

// next/font options must be literals, so the Ethiopic unicode-range is repeated.
/* Only downloaded when Ge'ez characters are actually on the page. */
export const ethiopicSerif = localFont({
  src: "../fonts/noto-serif-ethiopic-ethiopic-400-normal.woff2",
  weight: "400",
  variable: "--font-ethiopic-serif",
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+1200-139F, U+2D80-2DDF, U+AB00-AB2F, U+1E7E0-1E7FF" }],
});

export const ethiopicSans = localFont({
  src: "../fonts/noto-sans-ethiopic-ethiopic-400-normal.woff2",
  weight: "400",
  variable: "--font-ethiopic-sans",
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+1200-139F, U+2D80-2DDF, U+AB00-AB2F, U+1E7E0-1E7FF" }],
});

export const fontVariables = [
  instrument.variable,
  inter.variable,
  ethiopicSerif.variable,
  ethiopicSans.variable,
].join(" ");
