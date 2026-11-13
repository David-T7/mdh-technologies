/** Header colours for the browser UI (address bar on mobile), per theme. */
export const themeColors = { light: "#0b0b0c", dark: "#0b0b0c" } as const;

export type Theme = keyof typeof themeColors;

/**
 * Runs in <head> before first paint: applies the saved theme, or the system
 * preference on a first visit, so the page never flashes the wrong colours.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var d=document.documentElement;d.setAttribute("data-theme",t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"${themeColors.dark}":"${themeColors.light}")}catch(e){}})()`;
