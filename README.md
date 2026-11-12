# mdh technologies — website

The company website for **MDH Technologies PLC**, built with Next.js (App Router), TypeScript, Tailwind CSS and Motion. Every page is static and the site is designed for low-end Android phones on slow mobile data.

---

## Run it locally

You need **Node.js 20 or newer**.

```bash
npm install
npm run dev        # http://localhost:3000
```

Before pushing, check that everything still builds:

```bash
npm run build
npm run lint
```

---

## Editing the content

**All the words on the site live in one file: [`src/content/site.ts`](src/content/site.ts).** You never need to open a component to change text.

| To change… | Edit in `site.ts` |
|---|---|
| Phone, email, address, GitHub, app links | `company` |
| Hero, mission lines, product, services, team, contact copy | the `en` object |
| A founder's title or bio | `en.team.members` |
| Add/remove a service | `en.services.items` |
| Testimonials (empty on purpose) | `testimonials` — add only real, approved quotes |
| Show/hide the gold `[CONFIRM: …]` tags and image-placeholder labels | `flags.showPlaceholders` — **set to `false` before launch** |
| Language switcher | `flags.showLanguageSwitcher` |

When a fact is confirmed, delete its `confirm: "…"` line.

### Adding images

| Image | Put the file at | Then set in `site.ts` |
|---|---|---|
| Product screenshot (flagship) | `public/products/etlh-home.png` | `product.heroScreenshot: "/products/etlh-home.png"` |
| Product story screens (6) | `public/products/etlh-01.png` … `etlh-06.png` | each `story.panels[n].screenshot` |
| Founder portraits | `public/team/<firstname>.jpg` | each `team.members[n].portrait` |
| Official logo | `public/brand/` | replace the markup in `src/components/Logo.tsx` with the file, unchanged |

Use real screenshots and photos only — portrait 9:19.5 for app screens, 4:5 for portraits. Images are optimised and lazy-loaded automatically by `next/image`.

### Brand colours

The palette is a placeholder. Swap the six `--brand-*` values at the top of [`src/app/globals.css`](src/app/globals.css) and the whole site follows (light and dark mode).

### Adding Amharic

1. In `site.ts`, create an `am` object of type `SiteCopy` (copy `en` and translate), or put it in `src/content/site.am.ts` and import it.
2. Add it to the `copy` registry: `export const copy = { en, am }`.
3. Add `/am` routes (or move pages under `app/[locale]/`) that call `getCopy("am")`.
4. Set `flags.showLanguageSwitcher = true`.

The Ethiopic fonts (Noto Serif/Sans Ethiopic) are already installed and only download when Ge'ez characters are on the page.

---

## Contact form

The form works two ways:

- **With Resend** — if `RESEND_API_KEY` is set, messages are sent from the server.
- **Without it** — the button opens the visitor's email app with the message filled in.

Environment variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Turns on server-side sending |
| `CONTACT_TO` | Inbox that receives messages (default: the company email) |
| `CONTACT_FROM` | Verified sender, e.g. `MDH Website <web@mdhtechnologies.com>`. Until your domain is verified in Resend, its test sender only delivers to the Resend account owner. |

---

## Deploy to Vercel

1. Push this repository to GitHub (e.g. `github.com/mdhtechnologies/website`).
2. In Vercel: **Add New → Project → Import** the repository. Framework: Next.js (detected). No build settings to change.
3. Optional: under **Settings → Environment Variables**, add the contact-form variables above.
4. Deploy. Every push to `main` redeploys automatically.

### Connect a custom domain

1. Vercel project → **Settings → Domains → Add** your domain (e.g. `mdhtechnologies.com` and `www.mdhtechnologies.com`).
2. At your domain registrar, add the DNS records Vercel shows (usually an `A` record for the apex domain and a `CNAME` for `www`).
3. Update `company.url` in `site.ts` to the final domain so the sitemap, Open Graph image and structured data use it.

---

## Project map

```
src/
  app/                 routes, SEO files (sitemap, robots, OG image, icons), server action
  components/          Logo, Header, Footer, PhoneFrame, StickyStory, ServiceList, Team, NameOrigin, ContactForm…
  components/sections.tsx   the page sections, assembled by each route
  content/site.ts      ← all copy, facts and flags
  fonts/               self-hosted font files (no Google Fonts requests)
  lib/fonts.ts         font loading
```

Motion is subtle and switches off completely for visitors who set *reduce motion* on their device.
