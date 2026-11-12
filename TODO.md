# TODO — what the founders still need to supply

Every item below is visible on the site as a gold `[CONFIRM: …]` tag or an "IMAGE PLACEHOLDER" label while `flags.showPlaceholders` is `true` in `src/content/site.ts`. Work through the list, then set the flag to `false` before launch.

## Facts to confirm — `[CONFIRM]`

- [ ] **Domain** — `https://mdhtechnologies.com` is a placeholder. Update `company.url` once final.
- [ ] **Mhreteabe Tesfaye Dula** — title "Co-founder & CEO".
- [ ] **Dawit Tesfaye** — title "Co-founder, Frontend & Product Experience".
- [ ] **Hemen Tesfaye Dula** — title "Co-founder, Content & Student Research".
- [ ] **Kiran Singh Saud** — title "Co-founder, Engineering & User Experience".
- [ ] **ERP & school systems** — keep this service on the site? (Remove the item from `services.items` if not.)
- [ ] **Name origin wording** — "MDH comes from the founders' first initials — a company built by family." Kiran also co-founded the product; decide how to phrase this.
- [ ] **Official brand colours** — current palette (Ink, Paper, Ethiopian Gold, Highland Green, Graphite, Stone) is a placeholder. Swap the `--brand-*` values in `src/app/globals.css`.
- [ ] **Founder locations** — only Hemen (Italy) and Kiran (the Netherlands) are shown. Add Mhreteabe's and Dawit's if wanted (`location` in each team member).
- [ ] **LinkedIn / GitHub** links for Dawit, Hemen and Kiran (`links` in each team member).

## Copy to review

Written from the brief's notes rather than supplied verbatim — please read and adjust in `site.ts`:

- [ ] Hero headline — options are in a comment above `hero.headline` (currently "Life doesn't have to be *this hard.*").
- [ ] `/about` intro and the three "Why we exist" paragraphs (`why.expanded`).
- [ ] `/services` paragraphs (`services.items[].detail`) and the services heading/intro.
- [ ] Team heading "Family, and a friend." and the footer line "An Ethiopian technology company. Built in Addis Ababa."
- [ ] Hero eyebrow "Addis Ababa — Est. 2026".

## Images — `IMAGE PLACEHOLDER`

Real files only — no stock or AI-generated images.

- [ ] **OFFICIAL APP SCREENSHOT REQUIRED** — flagship phone: `public/products/etlh-home.png` → `product.heroScreenshot`
- [ ] **OFFICIAL APP SCREENSHOT REQUIRED** — six story screens, one per panel:
  - [ ] `public/products/etlh-01.png` — Follows the book
  - [ ] `public/products/etlh-02.png` — Learning as a game
  - [ ] `public/products/etlh-03.png` — Every exam question explained
  - [ ] `public/products/etlh-04.png` — A tutor that knows you
  - [ ] `public/products/etlh-05.png` — In your language
  - [ ] `public/products/etlh-06.png` — No install needed
- [ ] **OFFICIAL PORTRAIT REQUIRED** — `public/team/mhreteabe.jpg`, `dawit.jpg`, `hemen.jpg`, `kiran.jpg` (initials monograms show until then)
- [ ] **Official logo file** (optional) — `public/brand/`; the text wordmark is used until supplied.
- [ ] Optional later: photographs of the team, the TM5 office, Addis Ababa, students studying.

## Setup

- [ ] Create a Resend account, verify the domain, and set `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` in Vercel (otherwise the form opens the visitor's email app).
- [ ] Push to `github.com/mdhtechnologies` and import into Vercel (see README).
- [ ] Testimonials — leave `testimonials` empty until there are real, approved quotes.
- [ ] Amharic version — see README "Adding Amharic".
- [ ] Before launch: `flags.showPlaceholders = false`.
