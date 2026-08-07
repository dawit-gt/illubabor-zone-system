# illubabor-web

Next.js (App Router) frontend for the Illubabor Zone Administration System.

## Design system

Grounded in what the zone actually is — forested, coffee-growing highlands along the Sor River — not a generic civic template, and deliberately distinct from the [[hurumu-woreda-system]] site's forest-green + gold identity:

- **Colors**: roasted-bean coffee (`#2B1D16`) as the primary dark, ripe-cherry clay (`#B8622E`) as the accent, shade-grown canopy green (`#3F5233`) as secondary, Sor River blue (`#2C5F6F`) used sparingly, parchment (`#F7F2E9`) background, ripe-cherry gold (`#C99A2E`) for highlights only.
- **Type**: Fraunces (display/headings), Work Sans (body), IBM Plex Mono (data/captions/eyebrows).
- **Signature element**: layered contour-line motif in the hero, evoking the zone's actual hilly, forested terrain.
- **Language default**: Oromiffa (Afaan Oromoo) leads — ~91% first-language speakers in the zone — with Amharic and English as secondary/tertiary, via `LanguageProvider` + `selectByLanguage()`.

## Status: Phase 1 (foundation) complete

- [x] App Router structure: `(public)` route group (home, about, woredas, departments, services, news, transparency, contact — stubs), `auth/login`, `admin/dashboard`
- [x] Tailwind config with the zone's own design tokens
- [x] `PublicHeader` (trilingual nav + language switcher) / `PublicFooter`
- [x] Homepage with hero, contour signature motif, stats strip, departments section (placeholder pending API)
- [x] `lib/api.ts` — Axios client with auto refresh-token interceptor
- [x] `lib/auth.tsx` — AuthProvider (login/logout, JWT decode)
- [x] `lib/language-provider.tsx` + `lib/i18n.ts` — trilingual content selection
- [x] Login page + protected admin dashboard shell

## Next up (Phase 2)

- [ ] Wire homepage departments/news/services to the live `illubabor-api` endpoints once built
- [ ] Build out each public page (about, woredas listing + detail, departments listing + detail, services + application flow, news listing + detail, transparency/documents, contact form)
- [ ] Admin CRUD panels (departments, woredas, news, services, documents, users) once backend Phase 2 modules exist
- [ ] `hooks/` for data fetching (useDepartments, useNews, useServices, useWoredas)
- [ ] Localize all remaining copy (currently only header/footer/homepage are trilingual)

## Local dev

```bash
npm install
cp .env.example .env.local   # point at your running illubabor-api
npm run dev
```
