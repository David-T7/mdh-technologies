"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Arrow } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { company, site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);
  // Which kind of full-width section sits directly under the header:
  // "ink" (dark in both themes), "band" (dark in dark mode, paper in light) or
  // "paper". Starts as "band": every page opens on a band hero. The header
  // reuses that section's class, so a theme toggle restyles it with no re-measure.
  const [under, setUnder] = useState<"ink" | "band" | "paper">("band");
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the menu when the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  // The header takes the colour of whatever section sits directly beneath it:
  // ink over dark bands (hero, story, footer…), frosted paper over light ones.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const header = headerRef.current;
      if (!header) return;
      const y = header.getBoundingClientRect().bottom + 1;
      const minWidth = window.innerWidth * 0.9; // full-width bands only, not cards or buttons
      const bands = document.querySelectorAll<HTMLElement>("main .ink, main .band, footer.ink");
      let kind: "ink" | "band" | "paper" = "paper";
      for (const el of bands) {
        const r = el.getBoundingClientRect();
        if (r.width >= minWidth && r.top <= y && r.bottom > y) {
          kind = el.classList.contains("ink") ? "ink" : "band";
          break;
        }
      }
      setUnder(kind);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  // Ink while the mobile menu is open, so the bar joins the menu panel.
  const tone = open ? "ink" : under;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-brand px-4 py-3 text-on-brand focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b transition-[background-color,color,border-color,box-shadow] duration-300 ${
          tone !== "paper"
            ? `${tone} ${scrolled && !open ? "border-ink-line" : "border-transparent"}`
            : `bg-bg/95 text-fg backdrop-blur-md ${
                scrolled ? "border-line shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]" : "border-transparent"
              }`
        }`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo size="sm" />

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex lg:gap-10">
            <ul className="flex items-center gap-9 text-[1.05rem] lg:gap-10">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`u-link relative inline-block py-2 transition-colors duration-300 ${
                      isActive(item.href) ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <m.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-brand"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
            <a
              href={site.headerCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group inline-flex min-h-12 items-center gap-2.5 bg-brand px-6 text-[1rem] font-medium text-on-brand transition-colors hover:bg-brand-hover"
            >
              {site.headerCta.label}
              <Arrow />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 flex h-12 w-12 items-center justify-center"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                setOpenedAt(pathname);
                setOpen((v) => !v);
              }}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile navigation */}
      <div
        id="mobile-menu"
        className={`ink fixed inset-0 top-[var(--header-h)] z-40 flex flex-col transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="wrap flex flex-1 flex-col pt-10">
          <ul className="flex flex-col">
            <li>
              <Link
                ref={firstLinkRef}
                href="/"
                className="display block border-b border-ink-line py-4 text-[2.6rem]"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`display block border-b border-ink-line py-4 text-[2.6rem] ${
                    isActive(item.href) ? "text-highlight" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pb-10">
            <a
              href={site.headerCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group mb-8 flex min-h-14 items-center justify-between bg-brand px-5 font-medium text-on-brand transition-colors hover:bg-brand-hover"
            >
              {site.headerCta.label}
              <Arrow />
            </a>
            <p className="text-sm text-ink-muted">{company.address.short}</p>
            <a href={company.phoneHref} className="mt-1 inline-block py-1 text-sm">
              {company.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
