# Horizon Nepal — Landing Page Build Plan

A production-grade single landing page at `/` matching the provided spec and Figma reference. All 14 sections, brand tokens, animations, SEO, and WCAG AA accessibility.

## Stack adaptation note
The project is TanStack Start (not CRA/Vite+Helmet). I'll adapt as follows — visual/UX spec stays 1:1:
- **Routing**: single page at `src/routes/index.tsx`. Meta tags via TanStack `head()` (not react-helmet-async). JSON-LD via `head().scripts`.
- **Styling**: Tailwind v4 with tokens in `src/styles.css` using `oklch` equivalents of the spec hex values, exposed as semantic tokens (`brand-primary`, `brand-secondary`, `brand-dark`, etc.). No hardcoded hex in components.
- **Animations**: Framer Motion (`motion`) — install as dependency.
- **Forms**: react-hook-form + zod (client-side only; no submission backend in this scope — form will validate and show a success toast via `sonner` which is already in the project).
- **Icons**: lucide-react (already available via shadcn).
- **Images**: Unsplash construction-themed URLs for hero, portfolio, news, team. Hero image preloaded via `head().links`.
- **Fonts**: Playfair Display + Barlow + Barlow Condensed via Google Fonts `<link>` in `head()` with preconnect.

## Section build order (one component file each, under `src/components/sections/`)
1. `Navbar` (layout) — sticky, transparent→dark on scroll (80px threshold), mobile drawer (Sheet)
2. `HeroSection` — full-viewport, overlay gradient, label + H1 + lead + 2 CTAs + 3 micro-stats + floating glass notification card
3. `ServicesSection` — 3 service cards on off-white
4. `PortfolioSection` — filter tabs + masonry 6-card grid with hover overlay
5. `QuoteBanner` — dark photo bg, giant gold quote mark, carousel of 3 quotes, dot nav
6. `NewsSection` — 3 article cards
7. `ProcessSection` — split bg (orange left / white right), 3 numbered steps with dashed connector
8. `FAQSection` — 2-col, accordion (shadcn Accordion, single-open)
9. `TestimonialsSection` — carousel (shadcn Carousel), 3 visible desktop
10. `ConsultationForm` — split panel, RHF+Zod validation, sonner toast on submit
11. `LocationSection` — Google Maps iframe centered on Kathmandu + floating info card
12. `TeamSection` — 4-col team grid with circular portraits
13. `QuoteBannerSecondary` — navy bg with geometric pattern
14. `Footer` (layout) — 4-col + bottom bar

## Data
Seed mock data inline per component (services, portfolio, team, testimonials, faq, news) — keeps file count low. Realistic Nepal-themed copy per spec.

## SEO & a11y
- `head()` returns title, description, OG, Twitter, canonical, preload hero, font links, and `LocalBusiness` JSON-LD.
- Single `<h1>` in hero; `<h2>` on every section.
- Skip-to-content link, semantic `<nav> <main> <section> <article> <footer>`, descriptive alt text, `aria-expanded` on accordion, `aria-label` on icon buttons, focus ring using `--ring`.
- `prefers-reduced-motion` respected via Framer Motion's built-in `useReducedMotion`.

## Responsive
Mobile-first; breakpoints sm/md/lg/xl as spec. Process section collapses split bg to stacked. Portfolio/Services/Team collapse to 1 col. Navbar → Sheet drawer.

## Tokens (in `src/styles.css`)
Add brand tokens alongside existing shadcn tokens. Map to Tailwind via `@theme inline`:
- `--brand-primary`, `--brand-secondary`, `--brand-dark`, `--off-white`, `--light-gray`, `--mid-gray`, `--dark-text`, `--gold-quote`
- Font family vars: `--font-display`, `--font-body`, `--font-label` mapped to `font-display`, `font-body`, `font-label` Tailwind utilities.
- Keep all shadcn tokens intact (Accordion, Carousel, Sheet, Toast use them).

## Out of scope (will not build unless you ask)
- Backend for form submission (form will validate + show toast only)
- Real CMS/blog content
- Sub-routes for /about, /portfolio, etc. — spec is a single landing page; nav links scroll to in-page anchors
- Image generation (using Unsplash URLs; can swap to generated images on request)

## Dependencies to install
- `framer-motion`
- `react-hook-form`, `@hookform/resolvers`, `zod` (zod likely already present via shadcn form)

Ready to build on approval.