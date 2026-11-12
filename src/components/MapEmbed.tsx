"use client";

import { useState } from "react";
import { company, site } from "@/content/site";
import { Arrow } from "./Button";

/**
 * Click-to-load Google Map. Nothing is downloaded from Google until the visitor
 * asks for it — important on slow mobile data.
 */
export function MapEmbed() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface md:aspect-[16/10]">
      {show ? (
        <iframe
          title={`Map: ${company.address.short}`}
          src={company.map.embed}
          className="absolute inset-0 h-full w-full border-0 grayscale-[0.4]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
          {/* Simple street-grid drawing, not a map image */}
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-line" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M56 0H0v56" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <line x1="0" y1="74%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="10" />
          </svg>
          <p className="relative font-mono text-sm text-muted">{company.address.plusCode}</p>
          <div className="relative">
            <p className="display text-[1.8rem] leading-tight">TM5 Tower</p>
            <p className="mt-1 text-muted">Airport Road, Bole</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <button
                type="button"
                onClick={() => setShow(true)}
                className="group inline-flex min-h-11 items-center gap-3 font-medium"
              >
                <span className="u-link">{site.contact.mapButton}</span>
                <Arrow />
              </button>
              <a
                href={company.map.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-3 text-muted hover:text-fg"
              >
                <span className="u-link">{site.contact.mapOpen}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
