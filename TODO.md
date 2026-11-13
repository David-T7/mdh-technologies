# TODO — what the founders still need to supply

Every item below is visible on the site as a gold `[CONFIRM: …]` tag or an "IMAGE PLACEHOLDER" label while `flags.showPlaceholders` is `true` in `src/content/site.ts`. Work through the list, then set the flag to `false` before launch.

## Facts to confirm — `[CONFIRM]`

- [ ] **Domain** — `https://mdhtechnologies.com` is a placeholder. Update `company.url` once final.
- [ ] **Mhreteabe Tesfaye Dula** — title "Co-founder & CEO".
- [ ] **Dawit Tesfaye Dula** — title "Co-founder, Engineering & Product".
- [ ] **Founder profiles** (`/team/mhreteabe`, `/team/dawit`) — written from the CVs; each founder should read and approve theirs. Mhreteabe's Meseret AI role was left out on purpose — add it if wanted.
- [ ] **ERP & school systems** — keep this service on the site? (Remove the item from `services.items` if not.)
- [ ] **Brand colours** — ink, paper and gold (`--brand-*` in `src/app/globals.css`). Confirm the exact gold if the brand has an official hex.

## Copy to review

Written from the brief's notes rather than supplied verbatim — please read and adjust in `site.ts`:

- [ ] Hero headline — options are in a comment above `hero.headline` (currently "Life doesn't have to be *this hard.*").
- [ ] `/about` intro and the five "Why we exist" beliefs (`why.beliefs`).
- [ ] `/services` paragraphs (`services.items[].detail`) and the services heading/intro.
- [ ] Team heading "The people behind it." and closing line "Two siblings, building from Addis Ababa." and the footer line "An Ethiopian technology company. Built in Addis Ababa."
- [ ] Hero eyebrow "Addis Ababa — Est. 2026".

## Images — `IMAGE PLACEHOLDER`

Real files only — no stock or AI-generated images.

- [x] **App screenshots** — in `public/products/` (hero: `etlh-telegram.png`; story: `etlh-follows-the-book`, `etlh-ranks`, `etlh-exam-explained`, `etlh-tutor`, `etlh-languages`, `etlh-telegram`). Replace any file with a newer screenshot of the same name.
- [ ] **Founder portraits** — removed for now. Drop `public/team/mhreteabe.jpg` and `public/team/dawit.jpg` back in when ready; they appear automatically (a user icon shows until then).
- [ ] **Better portrait for Mhreteabe** — the current one is cropped from a small (400px) LinkedIn photo to remove the #OPENTOWORK frame, so it looks soft. A larger photo without the frame would be sharper.
- [x] **Official logo** — from MDH-Technologies_Brand-Files, in `public/brand/` and `src/lib/brand.ts`.
- [ ] Optional later: photographs of the team, the TM5 office, Addis Ababa, students studying.

## Setup

- [ ] Create a Resend account, verify the domain, and set `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` in Vercel (otherwise the form opens the visitor's email app).
- [ ] Push to `github.com/mdhtechnologies` and import into Vercel (see README).
- [ ] Testimonials — leave `testimonials` empty until there are real, approved quotes.
- [ ] Amharic version — see README "Adding Amharic".
- [ ] Before launch: `flags.showPlaceholders = false`.
