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
| Phone, email, address, app links | `company` |
| Hero, mission lines, product, services, team, contact copy | the `en` object |
| A founder's title, bio or full profile | `en.team.members` (profile pages live at `/team/<slug>`) |
| Add/remove a service | `en.services.items` |
| Testimonials (empty on purpose) | `testimonials` — add only real, approved quotes |
| Show/hide the gold `[CONFIRM: …]` tags and image-placeholder labels | `flags.showPlaceholders` — **set to `false` before launch** |
| Language switcher | `flags.showLanguageSwitcher` |

When a fact is confirmed, delete its `confirm: "…"` line.

### Adding images

| Image | Put the file at | Then set in `site.ts` |
|---|---|---|
| Product screenshot (flagship) | `public/products/etlh-telegram.png` | `product.heroScreenshot` |
| Product story screens (6) | `public/products/etlh-*.png` | each `story.panels[n].screenshot` |
| Founder portraits | `public/team/<slug>.jpg` (or .png/.webp) — `mhreteabe`, `dawit`, `hemen` | picked up automatically; no code change |
| Official logo | `public/brand/` (originals) · `src/lib/brand.ts` (paths used by the site) | done — rendered inline by `src/components/Logo.tsx`, icons and OG image |

Use real screenshots and photos only — portrait 9:19.5 for app screens, 4:5 for portraits. Images are optimised and lazy-loaded automatically by `next/image`.

### Brand colours

The palette is ink, paper and Ethiopian gold. Adjust the `--brand-*` values at the top of [`src/app/globals.css`](src/app/globals.css) and the whole site follows (light and dark mode).

### Adding Amharic

1. In `site.ts`, create an `am` object of type `SiteCopy` (copy `en` and translate), or put it in `src/content/site.am.ts` and import it.
2. Add it to the `copy` registry: `export const copy = { en, am }`.
3. Add `/am` routes (or move pages under `app/[locale]/`) that call `getCopy("am")`.
4. Set `flags.showLanguageSwitcher = true`.

The Ethiopic fonts (Noto Serif/Sans Ethiopic) are already installed and only download when Ge'ez characters are on the page.

---

## Contact form

The form works two ways:

- **With Brevo** — if `BREVO_API_KEY` and `CONTACT_FROM` are set, messages are sent from the server through Brevo's transactional email API.
- **Without them** — the button opens the visitor's email app with the message filled in.

Environment variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `BREVO_API_KEY` | Turns on server-side sending (Brevo → SMTP & API → API keys) |
| `CONTACT_FROM` | A sender verified in Brevo, e.g. `MDH Technologies Team <info@mdhtechnologies.com>` |
| `CONTACT_TO` | Inbox that receives messages (default: the company email) |

Brevo setup:

1. Create a free Brevo account.
2. **Senders, domains & dedicated IPs → Domains**: add `mdhtechnologies.com` and add the DNS records it shows (DKIM, DMARC, Brevo code) at your domain host. Until then you can verify a single sender address instead.
3. **SMTP & API → API keys**: generate a key and set it as `BREVO_API_KEY`.
4. **Security → Authorised IPs**: turn IP blocking off (or the key is rejected from Vercel, whose server IPs change).
5. Send a test from the live contact page. Failures are logged in the server logs as `Contact form: …`.

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
  components/          Logo, Header, Footer, PhoneFrame, StickyStory, ServiceList, Team, Beliefs, ContactForm…
  components/sections.tsx   the page sections, assembled by each route
  content/site.ts      ← all copy, facts and flags
  fonts/               self-hosted font files (no Google Fonts requests)
  lib/fonts.ts         font loading
```

Motion is subtle and switches off completely for visitors who set *reduce motion* on their device.
