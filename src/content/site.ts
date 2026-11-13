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

export type TimelineItem = {
  title: string;
  org: string;
  place?: string;
  period: string;
  points: string[];
};

export type Project = {
  name: string;
  summary: string;
  tags: string[];
  link?: Link;
};

export type FounderProfile = {
  /** One-line professional headline */
  headline: string;
  /** Two or three sentences at the top of the profile */
  summary: string;
  /** Short proof points shown as chips under the name */
  highlights: string[];
  experience: TimelineItem[];
  projects: Project[];
  education: { degree: string; school: string; period: string; note?: string }[];
  skills: { group: string; items: string[] }[];
  recognition: { title: string; detail: string }[];
  languages: string[];
};

export type TeamMember = {
  /** URL segment for the profile page: /team/<slug> */
  slug: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  /** Optional — only where stated */
  location?: string;
  /**
   * Portraits are picked up automatically from /public/team/<slug>.jpg|.png|.webp.
   * Until a file exists the site shows a plain user icon.
   */
  links: Link[];
  confirm?: string;
  profile: FounderProfile;
};

export type Belief = {
  /** Short word or phrase shown large */
  word: string;
  /** One line, no more */
  line: string;
  icon: "sunrise" | "door" | "loop" | "steps" | "hands";
};

export type Testimonial = { quote: string; name: string; role: string };

export type Fact = { label: string; value: string; confirm?: string };
export type Step = { title: string; body: string };
export type Feature = { title: string; body: string };
export type Faq = { question: string; answer: string; confirm?: string };
export type CtaBand = { heading: string; body: string; primary: Link; secondary?: Link };

/** A titled list used by the page sections (facts, steps, features, FAQs). */
export type Block<T> = { eyebrow: string; heading: string; items: T[] };

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
    heading: string;
    beliefs: Belief[];
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
    profileCta: string;
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
    about: {
      title: string;
      description: string;
      heading: string;
      intro: string;
      purpose: { eyebrow: string; items: { label: string; text: string }[] };
      glance: Block<Fact>;
      cta: CtaBand;
    };
    products: {
      title: string;
      description: string;
      heading: string;
      intro: string;
      glance: Block<Fact>;
      audience: Block<Feature>;
      start: Block<Step>;
      faq: Block<Faq>;
      cta: CtaBand;
    };
    services: {
      title: string;
      description: string;
      heading: string;
      intro: string;
      process: Block<Step>;
      conditions: Block<Feature>;
      faq: Block<Faq>;
      cta: CtaBand;
    };
    contact: {
      title: string;
      description: string;
      next: Block<Step>;
      support: { heading: string; body: string; cta: Link };
    };
    notFound: { heading: string; body: string; cta: string };
  };
  footer: { rights: string; productHeading: string; navHeading: string; contactHeading: string };
};

/* ── Flags ──────────────────────────────────────────────────────────────── */

export const flags = {
  /** Show "[CONFIRM: …]" tags and image-placeholder labels on the site. Turn off before launch. */
  showPlaceholders: false,
  /** The language switcher is built but hidden until Amharic copy exists. */
  showLanguageSwitcher: false,
};

/* ── Company facts (shared by every language) ───────────────────────────── */

export const company = {
  name: "MDH Technologies",
  legalName: "MDH Technologies PLC",
  /** Shown in the footer © line — update each January */
  copyrightYear: 2026,
  /** [CONFIRM: final domain] — placeholder from the brief */
  url: "https://mdhtechnologies.com",
  phone: "+251 911 472 074",
  phoneHref: "tel:+251911472074",
  /** Public address — Contact page, footer; the contact form delivers here unless CONTACT_TO is set */
  infoEmail: "info@mdhtechnologies.com",
  telegram: { handle: "@etlearninghub_bot", href: "https://t.me/etlearninghub_bot" },
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
    telegram: "https://t.me/etlearninghub_bot",
  },
  openItems: {
    domain: "Final domain — mdhtechnologies.com is a placeholder",
  },
};

/* ── Testimonials — intentionally empty. Add only real, approved quotes. ── */

export const testimonials: Testimonial[] = [];

/* ── English copy ───────────────────────────────────────────────────────── */

const en: SiteCopy = {
  nav: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  headerCta: { label: "Try ET Learning Hub", href: company.product.telegram, external: true },

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
    body: "MDH Technologies is an Ethiopian technology company building software that makes systems work better — including ET Learning Hub, the Ethiopian textbook made interactive.",
    primaryCta: { label: "Try ET Learning Hub", href: company.product.telegram, external: true },
    secondaryCta: { label: "Work with us", href: "/contact" },
    scrollLabel: "Scroll",
  },


  why: {
    eyebrow: "Why we exist",
    heading: "What we believe.",
    beliefs: [
      { word: "Hope", line: "Life doesn't have to be this hard.", icon: "sunrise" },
      { word: "Second chances", line: "One exam result shouldn't decide a future.", icon: "loop" },
      { word: "Open doors", line: "Knowledge shouldn't depend on where you live.", icon: "door" },
      { word: "Small steps", line: "Atomic steps can be monumental.", icon: "steps" },
      { word: "Together", line: "Built to bring Ethiopians together.", icon: "hands" },
    ],
  },

  product: {
    eyebrow: "Product · Beta, live now",
    name: "ET Learning Hub",
    headline: "The Ethiopian textbook, made interactive.",
    body: "Interactive, picture-rich lessons for the new Ethiopian curriculum, Grades 1–12 — starting with the national-exam grades 6, 8 and 12. The first unit of every subject is free.",
    principle:
      "We want students to learn independently — not to keep them on the platform for its own sake.",
    ctas: [
      { label: "Open in Telegram", href: company.product.telegram, external: true },
    ],
    heroScreenshot: "/products/etlh-telegram.png",
    heroScreenshotAlt: "ET Learning Hub home screen inside Telegram, with the student's streak, stars and next lesson",
    moreComing: "More products coming.",
  },

  story: {
    eyebrow: "Inside the product",
    heading: "One idea at a time.",
    panels: [
      {
        title: "Follows the book.",
        body: "Lessons keep the textbook's units and sections — familiar to students and parents — with one idea at a time and far less text.",
        screenshot: "/products/etlh-follows-the-book.png",
        screenshotAlt: "A Grade 12 maths lesson, section 1.2.1, with its textbook source and a first activity",
      },
      {
        title: "Learning as a game.",
        body: "Levels, stars and puzzles. Friends challenge each other.",
        screenshot: "/products/etlh-ranks.png",
        screenshotAlt: "The ranks screen: a Silver badge, 340 stars and the stars needed for Gold",
      },
      {
        title: "Every exam question explained.",
        body: "National exam practice with full step-by-step explanations.",
        screenshot: "/products/etlh-exam-explained.png",
        screenshotAlt: "A national exam question answered correctly, with a step-by-step explanation",
      },
      {
        title: "A tutor that knows you.",
        body: "An AI tutor that remembers where you left off and what you find hard, and answers briefly.",
        screenshot: "/products/etlh-tutor.png",
        screenshotAlt: "The tutor home screen: where the student left off, today's practice and an 'Ask your tutor' box",
      },
      {
        title: "In your language.",
        body: "English, Amharic and Afaan Oromoo.",
        screenshot: "/products/etlh-languages.png",
        screenshotAlt: "The sign-in screen in Amharic, with Amharic, English and Afaan Oromoo to choose from",
      },
      {
        title: "No install needed.",
        body: "Opens straight inside Telegram.",
        screenshot: "/products/etlh-telegram.png",
        screenshotAlt: "ET Learning Hub running as a Telegram mini app",
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
    eyebrow: "Founders",
    heading: "The people behind it.",
    closing: "Two siblings, building from Addis Ababa.",
    profileCta: "Full profile",
    members: [
      {
        slug: "mhreteabe",
        name: "Mhreteabe Tesfaye Dula",
        initials: "MT",
        role: "Co-founder & CEO",
        confirm: "Title",
        location: "Addis Ababa",
        bio: "Software engineer in backend, applied AI and data. Erasmus Mundus scholar and former software engineer at Uber.",
        links: [
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/mhreteabe-dula-4b0199216/",
            external: true,
          },
        ],
        profile: {
          headline: "Software Engineer · Data Analytics & AI",
          summary:
            "Software engineer working across backend development, applied AI and data analytics, with a focus on education technology. Focused on transparent, scalable systems for social impact.",
          highlights: ["Erasmus Mundus scholar", "Ex-Uber software engineer", "EdTech specialist"],
          experience: [
            {
              title: "Educational Technology Specialist",
              org: "Abenet Community School",
              place: "Addis Ababa · Hybrid",
              period: "Oct 2025 – Aug 2026",
              points: [
                "Led the rollout of digital learning tools and learning-management workflows across school programmes.",
                "Used learning analytics to improve engagement and track foundational skills.",
              ],
            },
            {
              title: "Software Engineer",
              org: "Uber",
              place: "Amsterdam, Netherlands",
              period: "Feb 2025 – Aug 2025",
              points: [
                "Built a generative-AI platform that automates incident postmortems and standardises reporting across teams.",
                "Turned unstructured incident logs into actionable data.",
              ],
            },
            {
              title: "Python Developer (Capstone)",
              org: "Solita",
              place: "Lappeenranta, Finland",
              period: "Feb 2024 – Jun 2024",
              points: [
                "Built a traceable ledger to monitor material flows and audit carbon emissions for CSRD compliance.",
                "Secure REST APIs with Django REST Framework, containerised with Docker.",
              ],
            },
            {
              title: "Data Analyst",
              org: "ViVieb",
              place: "L'Aquila, Italy",
              period: "Oct 2023 – Jan 2024",
              points: ["Dashboards and automated pipelines for API health, performance and traffic."],
            },
          ],
          projects: [
            {
              name: "AI incident postmortems",
              summary: "Generative-AI documentation platform built at Uber.",
              tags: ["Generative AI", "Data"],
            },
            {
              name: "Carbon-tracking ledger",
              summary: "A traceable ledger for material flows and emissions, supporting CSRD reporting.",
              tags: ["Django REST", "Docker"],
            },
          ],
          education: [
            {
              degree: "MSc, Computer Science & Sustainable Software Engineering",
              school: "Erasmus Mundus Joint Master's",
              period: "2024 – present",
              note: "VU Amsterdam · LUT University · Università dell'Aquila",
            },
            {
              degree: "BSc, Computer Science",
              school: "HiLCoE School of Computer Science & Technology",
              period: "2018 – 2023",
              note: "Addis Ababa",
            },
          ],
          skills: [
            { group: "Engineering", items: ["Python", "Django REST Framework", "Node.js", "SQL", "REST APIs"] },
            { group: "Data & AI", items: ["Machine learning", "Generative AI", "TensorFlow", "Pandas", "Matplotlib"] },
            { group: "Infrastructure", items: ["Docker", "Git", "Google Cloud", "System architecture"] },
          ],
          recognition: [
            { title: "Deep Learning Specialization", detail: "DeepLearning.AI" },
            { title: "TensorFlow Developer Specialization", detail: "DeepLearning.AI" },
          ],
          languages: ["Amharic — native", "English — full professional"],
        },
      },
      {
        slug: "dawit",
        name: "Dawit Tesfaye Dula",
        initials: "DT",
        role: "Co-founder, Engineering & Product",
        confirm: "Title",
        location: "Addis Ababa",
        bio: "Full-stack developer (Django & React). Builds ET Learning Hub's frontend and its game-based learning.",
        links: [
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/dawit-tesfaye-a11471213/",
            external: true,
          },
        ],
        profile: {
          headline: "Full-Stack Developer · Django & React",
          summary:
            "Full-stack developer building secure, scalable web apps with Django, React and Tailwind CSS. Also brings VR development and web work for the education sector.",
          highlights: ["1st prize, AR/VR Africa Hackathon", "Shipped on Meta Quest", "Django + React"],
          experience: [
            {
              // TODO: exact dates and 1–2 points from LinkedIn
              title: "Full-Stack Developer",
              org: "Droongo System Solutions",
              period: "3 months",
              points: [],
            },
            {
              title: "Full-Stack Python Developer",
              org: "Self-employed",
              place: "Addis Ababa",
              period: "Feb 2022 – present",
              points: [
                "REST APIs with Django REST Framework, feeding React and Tailwind CSS front ends.",
                "Containerised back ends with Docker for consistent, deployment-ready environments.",
              ],
            },
            {
              title: "WordPress Developer & SEO",
              org: "Self-employed",
              place: "Addis Ababa",
              period: "Nov 2024 – present",
              points: [
                "Websites for the education sector, designed around parents, students and staff.",
                "Speed and search work that put local clients in Google's top five for local searches.",
              ],
            },
            {
              title: "Unity C# & VR Developer",
              org: "AWRA",
              place: "Addis Ababa",
              period: "Dec 2022 – Feb 2024",
              points: [
                "VR exposure therapy for the fear of public speaking, released on the Meta Quest store and SideQuest.",
                "Speech-to-text feedback, spatial audio and performance tuning for standalone headsets.",
              ],
            },
          ],
          projects: [
            {
              name: "AWRA",
              summary: "VR practice for people afraid of public speaking. Won first prize at the 2022 AR/VR Africa Hackathon.",
              tags: ["Unity", "C#", "VR"],
              link: { label: "Visit", href: "https://awra-web.vercel.app/", external: true },
            },
            {
              name: "EthioGig",
              summary: "Freelancer marketplace with identity checks, liveness detection, recommendations and disputes.",
              tags: ["Django", "React", "OpenCV"],
            },
            {
              name: "Instructor Evaluation",
              summary: "Final-year project at HiLCoE: structured feedback and exportable reports for faculty.",
              tags: ["Django", "MySQL"],
              link: { label: "Visit", href: "https://hilcoe.pythonanywhere.com/", external: true },
            },
            {
              name: "Blood Donation Manager",
              summary: "Donor screening, blood stock by type and hospital requests in one system.",
              tags: ["Django", "Bootstrap"],
            },
          ],
          education: [
            {
              degree: "BSc, Computer Science",
              school: "HiLCoE School of Computer Science & Technology",
              period: "2019 – 2024",
              note: "Addis Ababa",
            },
          ],
          skills: [
            { group: "Languages", items: ["Python", "JavaScript", "C#", "Java"] },
            { group: "Web", items: ["Django", "React", "Tailwind CSS", "Bootstrap", "WordPress"] },
            { group: "Data & tools", items: ["PostgreSQL", "MySQL", "Docker", "Git", "SEO"] },
          ],
          recognition: [
            { title: "1st prize — AR/VR Africa Hackathon 2022", detail: "Ethiopia" },
            { title: "AR/VR Africa Bootcamp 2023", detail: "Completed" },
            { title: "Programming in Python", detail: "Meta · 2024" },
            { title: "Back-End & Front-End Development", detail: "Meta · 2022–2023" },
          ],
          languages: ["Amharic — native", "English"],
        },
      },
    ],
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
        "Why MDH Technologies exists, how we work, and the founders behind ET Learning Hub.",
      heading: "We build things that make life a little less hard.",
      intro:
        "MDH Technologies PLC is an Ethiopian technology company based in Addis Ababa, founded by siblings Mhreteabe and Dawit.",
      purpose: {
        eyebrow: "What drives us",
        items: [
          {
            label: "Mission",
            text: "Build software that makes systems work better for Ethiopians — starting with learning.",
          },
          {
            label: "Vision",
            text: "An Ethiopia where access to knowledge doesn't depend on where you live or what you can afford.",
          },
          {
            label: "Belief",
            text: "Everyone has something unique to contribute. Small, atomic steps can be monumental.",
          },
        ],
      },
      glance: {
        eyebrow: "At a glance",
        heading: "The company in brief.",
        items: [
          { label: "Legal name", value: company.legalName },
          { label: "Office", value: company.address.short },
          { label: "Founders", value: "Mhreteabe Tesfaye Dula and Dawit Tesfaye Dula" },
          { label: "Product", value: "ET Learning Hub — beta, live now" },
          {
            label: "Services",
            value: "Custom software, ERP & school systems, networking and practical AI",
          },
          { label: "Contact", value: company.infoEmail },
        ],
      },
      cta: {
        heading: "Want to build something with us?",
        body: "Whether you have a project in mind or just want to talk through an idea, we'd like to hear from you.",
        primary: { label: "Get in touch", href: "/contact" },
        secondary: { label: "See our services", href: "/services" },
      },
    },
    products: {
      title: "Products",
      description:
        "ET Learning Hub — interactive, picture-rich lessons for the new Ethiopian curriculum, Grades 1–12. Beta, live now.",
      heading: "What we're building.",
      intro: "Already in students' hands.",
      glance: {
        eyebrow: "At a glance",
        heading: "ET Learning Hub in brief.",
        items: [
          { label: "Curriculum", value: "The new Ethiopian curriculum" },
          { label: "Grades", value: "1–12, starting with national-exam grades 6, 8 and 12" },
          { label: "Languages", value: "English, Amharic and Afaan Oromoo" },
          { label: "Where", value: "Inside Telegram — nothing to install" },
          {
            label: "Price",
            value: "The first unit of every subject is free",
            confirm: "Pricing beyond the first unit",
          },
          { label: "Status", value: "Beta, live now" },
        ],
      },
      audience: {
        eyebrow: "Who it's for",
        heading: "Built for the people who live with the exam.",
        items: [
          {
            title: "Students",
            body: "Learn one idea at a time, at your own pace, and practise real national exam questions with every step explained.",
          },
          {
            title: "Parents",
            body: "Lessons follow the same units and sections as the textbook, so you always know where your child is and what comes next.",
          },
          {
            title: "Anyone with a phone",
            body: "Made for everyday phones and slow connections, in the language you're most comfortable with.",
          },
        ],
      },
      start: {
        eyebrow: "Get started",
        heading: "Learning in under a minute.",
        items: [
          { title: "Open it", body: "Open the ET Learning Hub bot in Telegram." },
          { title: "Pick your grade", body: "Choose your grade and the subject you want to study." },
          { title: "Start free", body: "The first unit of every subject is free — begin with the first lesson." },
        ],
      },
      faq: {
        eyebrow: "Questions",
        heading: "Common questions.",
        items: [
          {
            question: "Is ET Learning Hub free?",
            answer: "The first unit of every subject is free, so you can try any subject before deciding.",
            confirm: "Pricing beyond the first unit",
          },
          {
            question: "Do I need to install anything?",
            answer: "No. It opens straight inside Telegram.",
          },
          {
            question: "Which grades are covered?",
            answer: "The new Ethiopian curriculum for Grades 1–12, starting with the national-exam grades 6, 8 and 12.",
          },
          {
            question: "Which languages can I learn in?",
            answer: "English, Amharic and Afaan Oromoo.",
          },
          {
            question: "Does it follow the textbook?",
            answer: "Yes. Lessons keep the textbook's units and sections, with one idea at a time and far less text.",
          },
          {
            question: "Does it help with the national exam?",
            answer: "Yes. It includes national exam practice with full step-by-step explanations, and an AI tutor that remembers what you find hard.",
          },
        ],
      },
      cta: {
        heading: "Try it today.",
        body: "Open ET Learning Hub in Telegram and start with the free first unit of any subject.",
        primary: { label: "Open in Telegram", href: company.product.telegram, external: true },
      },
    },
    services: {
      title: "Services",
      description:
        "Custom software, ERP and school systems, networking and IT infrastructure, and practical AI for Ethiopian organisations.",
      heading: "Software and systems that fit how you work.",
      intro:
        "We bring the same approach we use on our own products to yours: start simple, build in modular parts, and design for Ethiopian conditions from day one.",
      process: {
        eyebrow: "How a project works",
        heading: "From first conversation to working system.",
        items: [
          {
            title: "Listen",
            body: "We start with a conversation about the problem and the people it affects — not the technology.",
          },
          {
            title: "Start simple",
            body: "We agree on the simplest version that solves the real problem, and build it in modular parts.",
          },
          {
            title: "Ship and learn",
            body: "We put it in front of the people who will use it early, then improve it from what they tell us.",
          },
          {
            title: "Stay on hand",
            body: "After launch we keep supporting it, so the system keeps working as your organisation grows.",
          },
        ],
      },
      conditions: {
        eyebrow: "Built for Ethiopia",
        heading: "Designed for the conditions people actually work in.",
        items: [
          { title: "Everyday phones", body: "Fast and usable on low-end devices, not just new laptops." },
          {
            title: "Slow connections",
            body: "Light pages and careful data use, so things still work on mobile data.",
          },
          {
            title: "Local languages",
            body: "Amharic and other local languages, including reading Amharic documents.",
          },
          { title: "Telegram-first", body: "Telegram Mini Apps where your users already spend their time." },
        ],
      },
      faq: {
        eyebrow: "Questions",
        heading: "Before we start.",
        items: [
          {
            question: "How do we start working together?",
            answer: "Send us a message or call. We'll set up a first conversation to understand what you need and whether we're the right fit.",
          },
          {
            question: "How much does a project cost?",
            answer: "It depends on the scope. After the first conversation we'll propose the simplest version that solves your problem, with a clear estimate.",
            confirm: "Pricing approach",
          },
          {
            question: "Do you support systems after launch?",
            answer: "Yes. We stay on hand after setup so the basics keep working and your team can get on with their work.",
          },
          {
            question: "Where are you based?",
            answer: `Our office is at ${company.address.short}.`,
          },
        ],
      },
      cta: {
        heading: "Have a system that should work better?",
        body: "Tell us what's slow, confusing or broken today. We'll help you find the simplest way to fix it.",
        primary: { label: "Talk to us", href: "/contact" },
      },
    },
    contact: {
      title: "Contact",
      description:
        "Talk to MDH Technologies — TM5 Tower, Bole, Addis Ababa. +251 911 472 074.",
      next: {
        eyebrow: "What happens next",
        heading: "After you send a message.",
        items: [
          { title: "We read it", body: "Every message reaches the founders directly." },
          { title: "We reply", body: "We get back to you by email or phone, with any questions we have." },
          {
            title: "We talk",
            body: "If it's a project, we set up a first conversation about the problem you want to solve.",
          },
        ],
      },
      support: {
        heading: "Using ET Learning Hub?",
        body: "For help with lessons or your account, message us through the ET Learning Hub Telegram bot.",
        cta: { label: "Open the Telegram bot", href: company.telegram.href, external: true },
      },
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
