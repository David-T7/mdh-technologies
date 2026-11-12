/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MDH TECHNOLOGIES — SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every word on the website lives in this file. Edit text here; you never need
 *  to touch the components.
 *
 *  Rules (from the build brief):
 *  - No invented facts, clients, numbers, testimonials, awards or partners.
 *  - Anything unconfirmed carries a `confirm` note. While `flags.showPlaceholders`
 *    is true these appear on the site as small gold "[CONFIRM: …]" tags so they
 *    can't be missed. Delete the note once a founder has confirmed it, then turn
 *    the flag off before launch.
 *  - Images: put official files in /public and set the path below. While a path
 *    is `null`, the site shows a clearly labelled placeholder instead.
 *
 *  Amharic: copy `en` into a new `am` object of the same `SiteCopy` type (or a
 *  `site.am.ts` file), add it to `copy` below, then set
 *  `flags.showLanguageSwitcher` to true.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Types ──────────────────────────────────────────────────────────────── */

export type Locale = "en" | "am";

export type Link = { label: string; href: string; external?: boolean };

export type StoryPanel = {
  title: string;
  body: string;
  /** e.g. "/products/etlh-follows-the-book.png" — null shows a placeholder */
  screenshot: string | null;
  screenshotAlt: string;
};

export type Service = {
  number: string;
  title: string;
  /** Two-line summary used on the homepage */
  summary: string;
  /** Short paragraph used on /services */
  detail: string;
  confirm?: string;
};

export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  /** Optional — only where stated */
  location?: string;
  /** e.g. "/team/mhreteabe.jpg" — null shows an initials monogram */
  portrait: string | null;
  links: Link[];
  confirm?: string;
};

export type Testimonial = { quote: string; name: string; role: string };

export type SiteCopy = {
  nav: Link[];
  headerCta: Link;
  hero: {
    eyebrow: string;
    headline: string;
    headlineEmphasis: string;
    body: string;
    primaryCta: Link;
    secondaryCta: Link;
    scrollLabel: string;
  };
  why: {
    eyebrow: string;
    lines: string[];
    /** Longer paragraphs used on /about */
    expanded: string[];
  };
  product: {
    eyebrow: string;
    name: string;
    headline: string;
    body: string;
    principle: string;
    ctas: Link[];
    heroScreenshot: string | null;
    heroScreenshotAlt: string;
    moreComing: string;
  };
  story: { eyebrow: string; heading: string; panels: StoryPanel[] };
  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: Service[];
    cta: string;
  };
  principles: {
    eyebrow: string;
    items: { title: string; body: string }[];
  };
  team: {
    eyebrow: string;
    heading: string;
    members: TeamMember[];
    closing: string;
  };
  nameOrigin: {
    eyebrow: string;
    letters: { letter: string; name: string }[];
    line: string;
    confirm?: string;
  };
  contact: {
    eyebrow: string;
    headline: string;
    intro: string;
    form: {
      name: string;
      email: string;
      phone: string;
      organisation: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      mailtoNote: string;
    };
    mapButton: string;
    mapOpen: string;
  };
  pages: {
    about: { title: string; description: string; heading: string; intro: string };
    products: { title: string; description: string; heading: string; intro: string };
    services: { title: string; description: string; heading: string; intro: string };
    contact: { title: string; description: string };
    notFound: { heading: string; body: string; cta: string };
  };
  footer: { rights: string; productHeading: string; navHeading: string; contactHeading: string };
};

/* ── Flags ──────────────────────────────────────────────────────────────── */

export const flags = {
  /** Show "[CONFIRM: …]" tags and image-placeholder labels on the site. Turn off before launch. */
  showPlaceholders: true,
  /** The language switcher is built but hidden until Amharic copy exists. */
  showLanguageSwitcher: false,
};

/* ── Company facts (shared by every language) ───────────────────────────── */

export const company = {
  name: "MDH Technologies",
  legalName: "MDH Technologies PLC",
  founded: "2026-11",
  /** Shown in the footer © line — update each January */
  copyrightYear: 2026,
  /** [CONFIRM: final domain] — placeholder from the brief */
  url: "https://mdhtechnologies.com",
  phone: "+251 911 472 074",
  phoneHref: "tel:+251911472074",
  email: "mhreteabetesfaye@adonay.tech",
  telegram: { handle: "@etlearninghub_bot", href: "https://t.me/etlearninghub_bot" },
  github: "https://github.com/mdhtechnologies",
  address: {
    short: "TM5 Tower, 2nd floor, Bole, Addis Ababa",
    lines: [
      "TM5 Tower, 2nd floor",
      "Airport Road, Bole",
      "Near Dembel City Center",
      "Addis Ababa, Ethiopia",
    ],
    plusCode: "XQX9+7R6",
    street: "TM5 Tower, 2nd floor, Airport Road, Bole",
    city: "Addis Ababa",
    country: "ET",
  },
  map: {
    embed: "https://www.google.com/maps?q=XQX9%2B7R6+Addis+Ababa&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=XQX9%2B7R6+Addis+Ababa",
  },
  product: {
    app: "https://etlearninghub.adonay.tech",
    telegram: "https://t.me/etlearninghub_bot",
  },
  openItems: {
    domain: "Final domain — mdhtechnologies.com is a placeholder",
    colours: "Official brand colours — current palette is a placeholder",
  },
};

/* ── Testimonials — intentionally empty. Add only real, approved quotes. ── */

export const testimonials: Testimonial[] = [];

/* ── English copy ───────────────────────────────────────────────────────── */

const en: SiteCopy = {
  nav: [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  headerCta: { label: "Try ET Learning Hub", href: company.product.app, external: true },

  hero: {
    eyebrow: "mdh technologies",
    /*
     * Headline options (brief asks for three; the first is in use):
     *  1. "Life doesn't have to be this hard."
     *  2. "Systems that work, so life can be easier."
     *  3. "We make things work better — because life doesn't have to be this hard."
     */
    headline: "Life doesn't have to be",
    headlineEmphasis: "this hard.",
    body: "MDH Technologies is an Ethiopian technology company building software that makes systems work better — starting with ET Learning Hub, the Ethiopian textbook made interactive.",
    primaryCta: { label: "Try ET Learning Hub", href: company.product.app, external: true },
    secondaryCta: { label: "Work with us", href: "/contact" },
    scrollLabel: "Scroll",
  },

  why: {
    eyebrow: "Why we exist",
    lines: [
      "We want to give people hope that life doesn't have to be this hard.",
      "We have watched friends and neighbours devastated by failing the national entrance exam.",
      "We believe everyone has something unique to contribute, and that access to knowledge should be equal.",
      "Small, atomic steps can be monumental.",
      "We build things that bring Ethiopians together, not apart.",
    ],
    expanded: [
      "MDH Technologies started from something we kept seeing up close. Friends and neighbours who worked hard, then had their plans upended by a single result on the national entrance exam. Systems that should help people often make their lives harder instead.",
      "We think it doesn't have to be that way. Everyone has something unique to contribute, and access to knowledge should not depend on where you live or what you can afford.",
      "So we build software that makes systems work better — starting with learning. We believe small, atomic steps can be monumental, and we want what we build to bring Ethiopians together, not apart.",
    ],
  },

  product: {
    eyebrow: "Our first product · Beta, live now",
    name: "ET Learning Hub",
    headline: "The Ethiopian textbook, made interactive.",
    body: "Interactive, picture-rich lessons for the new Ethiopian curriculum, Grades 1–12 — starting with the national-exam grades 6, 8 and 12. The first unit of every subject is free.",
    principle:
      "We want students to learn independently — not to keep them on the platform for its own sake.",
    ctas: [
      { label: "Open the app", href: company.product.app, external: true },
      { label: "Open in Telegram", href: company.product.telegram, external: true },
    ],
    heroScreenshot: null, // e.g. "/products/etlh-home.png"
    heroScreenshotAlt: "ET Learning Hub lesson screen on a phone",
    moreComing: "More products coming.",
  },

  story: {
    eyebrow: "Inside the product",
    heading: "One idea at a time.",
    panels: [
      {
        title: "Follows the book.",
        body: "Lessons keep the textbook's units and sections — familiar to students and parents — with one idea at a time and far less text.",
        screenshot: null,
        screenshotAlt: "A lesson organised by textbook unit and section",
      },
      {
        title: "Learning as a game.",
        body: "Levels, stars and puzzles. Friends challenge each other.",
        screenshot: null,
        screenshotAlt: "Levels, stars and a puzzle inside a lesson",
      },
      {
        title: "Every exam question explained.",
        body: "National exam practice with full step-by-step explanations.",
        screenshot: null,
        screenshotAlt: "A national exam question with a step-by-step explanation",
      },
      {
        title: "A tutor that knows you.",
        body: "An AI tutor that remembers where you left off and what you find hard, and answers briefly.",
        screenshot: null,
        screenshotAlt: "The AI tutor answering a student's question",
      },
      {
        title: "In your language.",
        body: "English, Amharic and Afaan Oromoo.",
        screenshot: null,
        screenshotAlt: "The same lesson shown in Amharic",
      },
      {
        title: "No install needed.",
        body: "Opens straight inside Telegram.",
        screenshot: null,
        screenshotAlt: "ET Learning Hub opening inside Telegram",
      },
    ],
  },

  services: {
    eyebrow: "Services",
    heading: "We also build for others.",
    intro: "Alongside our own products, we work with Ethiopian organisations on software and systems that fit how they actually work.",
    cta: "Talk to us",
    items: [
      {
        number: "01",
        title: "Custom software",
        summary:
          "Web apps, Telegram Mini Apps and internal tools built for how Ethiopian organisations actually work.",
        detail:
          "Web apps, Telegram Mini Apps and internal tools, shaped around the way your team already works rather than the other way round. We start with the simplest version that solves the real problem, put it in front of the people who will use it, and improve from there. Everything is built to run well on everyday phones and slow connections.",
      },
      {
        number: "02",
        title: "ERP & school systems",
        summary: "ERPNext/Frappe implementation and school management systems.",
        detail:
          "Implementation of ERPNext and the Frappe framework, and school management systems — set up and adapted to your organisation's processes, so records, finance and day-to-day operations live in one place instead of scattered spreadsheets and paper.",
        confirm: "Include this service on the site?",
      },
      {
        number: "03",
        title: "Networking & IT infrastructure",
        summary: "Office networks, setup and ongoing support.",
        detail:
          "Office networks, device setup and ongoing support. We set things up properly and stay on hand afterwards, so the basics keep working and your team can get on with their work.",
      },
      {
        number: "04",
        title: "Practical AI",
        summary:
          "Tutors, document reading (including Amharic OCR) and automation that save real time.",
        detail:
          "AI where it saves real time: tutors, document reading — including Amharic OCR — and automation of repetitive work. No AI for its own sake; we look for the task that is slow today and make it faster.",
      },
    ],
  },

  principles: {
    eyebrow: "How we work",
    items: [
      { title: "Simplicity first.", body: "The simplest thing that works, then improve." },
      { title: "Built like lego.", body: "Modular parts that are easy to change and swap." },
      { title: "Ship, then listen.", body: "Get it into real hands fast and learn from real users." },
      { title: "Built for Ethiopia.", body: "Low-end phones, slow data, local languages, Telegram." },
    ],
  },

  team: {
    eyebrow: "Team",
    heading: "Family, and a friend.",
    closing: "A distributed team across Addis Ababa, Italy and the Netherlands.",
    members: [
      {
        name: "Mhreteabe Tesfaye Dula",
        initials: "MT",
        role: "Co-founder & CEO",
        confirm: "Title",
        bio: "Software engineer. Erasmus Mundus scholar with master's studies at LUT University, Università dell'Aquila and VU Amsterdam; former software engineering intern at Uber Amsterdam. Education-technology consultant at Abenet Community School, Addis Ababa.",
        portrait: null,
        links: [
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/mhreteabe-dula-4b0199216/",
            external: true,
          },
        ],
      },
      {
        name: "Dawit Tesfaye",
        initials: "DT",
        role: "Co-founder, Frontend & Product Experience",
        confirm: "Title",
        bio: "Builds ET Learning Hub's frontend and its game-based learning.",
        portrait: null,
        links: [],
      },
      {
        name: "Hemen Tesfaye Dula",
        initials: "HT",
        role: "Co-founder, Content & Student Research",
        confirm: "Title",
        location: "Italy",
        bio: "Leads content review, student research and testing, social media, and accessibility for neurodivergent and disabled students.",
        portrait: null,
        links: [],
      },
      {
        name: "Kiran Singh Saud",
        initials: "KS",
        role: "Co-founder, Engineering & User Experience",
        confirm: "Title",
        location: "The Netherlands",
        bio: "Full-stack engineer leading user experience. Met Mhreteabe in the Erasmus Mundus programme.",
        portrait: null,
        links: [],
      },
    ],
  },

  nameOrigin: {
    eyebrow: "The name",
    letters: [
      { letter: "m", name: "Mhreteabe" },
      { letter: "d", name: "Dawit" },
      { letter: "h", name: "Hemen" },
    ],
    line: "MDH comes from the founders' first initials — a company built by family.",
    confirm: "Wording, since Kiran also co-founded the product",
  },

  contact: {
    eyebrow: "Contact",
    headline: "Let's build something that works.",
    intro: "Tell us what you're working on.",
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      organisation: "Organisation",
      message: "Message",
      submit: "Send Message",
      sending: "Sending…",
      success: "Thank you. Your message is on its way — we'll be in touch soon.",
      error: "Something went wrong sending your message. Please email or call us instead.",
      mailtoNote: "This opens your email app with your message ready to send.",
    },
    mapButton: "Show map",
    mapOpen: "Open in Google Maps",
  },

  pages: {
    about: {
      title: "About",
      description:
        "Why MDH Technologies exists, where the name comes from, how we work, and the team behind ET Learning Hub.",
      heading: "We build things that make life a little less hard.",
      intro:
        "MDH Technologies PLC is an Ethiopian technology company, registered in Addis Ababa in November 2026 and founded by siblings and a close friend.",
    },
    products: {
      title: "Products",
      description:
        "ET Learning Hub — interactive, picture-rich lessons for the new Ethiopian curriculum, Grades 1–12. Beta, live now.",
      heading: "What we're building.",
      intro: "One product so far, already in students' hands.",
    },
    services: {
      title: "Services",
      description:
        "Custom software, ERP and school systems, networking and IT infrastructure, and practical AI for Ethiopian organisations.",
      heading: "Software and systems that fit how you work.",
      intro:
        "We bring the same approach we use on our own products to yours: start simple, build in modular parts, and design for Ethiopian conditions from day one.",
    },
    contact: {
      title: "Contact",
      description:
        "Talk to MDH Technologies — TM5 Tower, Bole, Addis Ababa. +251 911 472 074.",
    },
    notFound: {
      heading: "This page took a different road.",
      body: "We couldn't find what you were looking for. It may have moved, or the link may be wrong.",
      cta: "Back to the homepage",
    },
  },

  footer: {
    rights: "All rights reserved.",
    navHeading: "Company",
    productHeading: "Product",
    contactHeading: "Contact",
  },
};

/* ── Registry ───────────────────────────────────────────────────────────── */

export const defaultLocale: Locale = "en";

export const copy: Partial<Record<Locale, SiteCopy>> = { en };

export const localeLabels: Record<Locale, string> = { en: "English", am: "አማርኛ" };

export function getCopy(locale: Locale = defaultLocale): SiteCopy {
  return copy[locale] ?? en;
}

/** The English copy, used throughout v1. */
export const site = en;
