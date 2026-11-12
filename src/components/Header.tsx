"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { Arrow } from "./Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { company, site } from "@/content/site";
import { Tibeb } from "./Texture";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the menu when the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

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

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-gold px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="ink sticky top-0 z-50 border-b border-ink-line">
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Logo size="sm" />

          <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
            <ul className="flex items-center gap-8 text-[0.9rem]">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`u-link py-2 transition-colors ${
                      isActive(item.href) ? "text-ink-fg" : "text-ink-muted hover:text-ink-fg"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
            <a
              href={site.headerCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-10 items-center gap-2 bg-gold px-4 text-[0.85rem] font-medium text-ink transition-colors hover:bg-[#e6a641]"
            >
              {site.headerCta.label}
              <Arrow className="h-3.5 w-3.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex h-12 w-12 items-center justify-center md:hidden"
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
                    isActive(item.href) ? "text-gold" : ""
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
              className="group mb-8 flex min-h-14 items-center justify-between bg-gold px-5 font-medium text-ink"
            >
              {site.headerCta.label}
              <Arrow />
            </a>
            <p className="text-sm text-ink-muted">{company.address.short}</p>
            <a href={company.phoneHref} className="mt-1 inline-block py-1 text-sm">
              {company.phone}
            </a>
            <Tibeb id="tibeb-menu" className="mt-8 text-gold/40" />
          </div>
        </nav>
      </div>
    </>
  );
}
