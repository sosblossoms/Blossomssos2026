# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **School of Sciences Students (7,000+ participants):** Undergraduate and postgraduate students across CHRIST (Deemed to be University), Bangalore (Central Campus) looking up competition rules, team sizes, dates, venues, posters, and registration links.
- **Event Participants & Student Team Leads:** Students coordinating solo entries or group ensembles across the 31 official competitions who need live schedule filtering, deadline alerts, and rulebook PDFs.
- **Team Onyx Cultural Committee & Core Organizers:** Student organizers and faculty coordinators publishing weekly circulars, theme reveals, event posters, and verified preliminary results.

## Product Purpose

The **Blossoms 2026–27 (Be The Best)** portal (`blossoms-sos`) is the official digital hub for the School of Sciences cultural festival at CHRIST (Deemed to be University), Bangalore, competing under **Team Onyx** (*"From Flames to Flights, White Onyx Ignites."*).

It serves two complementary jobs:
1. **Inspire & Showcase:** Present Team Onyx's identity, festival spirit, 5 cultural pillars (`Art`, `Literary`, `Music`, `Theatre`, `Dance`), historical legacy, and campus stage photography.
2. **Inform & Coordinate:** Give students fast, reliable access to all **31 official competitions**, the tentative **2026–27 Prelims Schedule** (Timeline & Monthly Calendar views + Google Drive event poster previews), the **Notice Board** (pinned circulars and Weekly Radar), and official **Google Forms registration** and **Rulebook** links.

## Positioning

Unlike generic college fest microsites that act as static brochures, Blossoms SOS pairs Team Onyx's unmistakable campus festival culture with live, structured operational views — an interactive 3D discipline ring, URL-synced schedule filtering (`?category=`, `?search=`, `?date=`, `?view=`), a real-time Notice Board weekly radar, and server-proxied Google Drive poster previews (`/api/drive-posters`).

## Operating Context

- **Framework & Runtime:** Next.js 16 (`^16.4.3`) App Router, React 19, TypeScript (`^5.7.3`), Tailwind CSS v4 (`@tailwindcss/postcss`), `lucide-react`, `motion`, `ogl` (WebGL `GhostFibers`), and self-hosted local variable fonts (`src/fonts/*.woff2`).
- **Active Routes (`src/app/`):**
  - `/` — Home showcase (Hero, 5-Category 3D Carousel, Campus Notice Board preview, Upcoming Main Events Banner, Photo Marquee)
  - `/about` — Blossoms & School of Sciences / Team Onyx narrative, milestones, and legacy
  - `/events` — Festival Disciplines & Arenas overview with 3D `EventCategoriesCarousel`
  - `/events/[category]` — Static-generated discipline pages (`art`, `literary`, `music`, `theatre`, `dance`) listing all 31 sub-events (`SubEventCard`) with team sizes, evaluation points, and historical venues/timings
  - `/schedule` — `ScheduleView` with Timeline & Calendar modes, search, category filters, and `EventDetailModal` (with Drive poster preview + share)
  - `/notice-board` — `NoticeBoardView` featuring `CampusGreenBoard` pinned circulars and `WeeklyRadarSection`
  - `/gallery` — `GalleryCoverflow` 3D coverflow and `GalleryBentoGrid` with lightbox
  - `/winners` — `WinnersView` searchable historical preliminary records (personal contact info strictly excised)
  - `/team` — Core committee & departments showcase (currently omitted from top `Navbar`, preserved as a direct route)
  - `/api/drive-posters` — API route serving official event poster imagery
- **Legacy Redirects (`next.config.ts`):** Preserves `.html` routes (`index.html`, `about.html`, `events.html`, `schedule.html`, `winners.html`, `team.html`, `event1.html`–`event5.html`) and shortcuts (`/art`, `/literary`, `/music`, `/dance`, `/theatre`, `/theater`, `/results`, `/calendar`, `/rules`).

## Capabilities and Constraints

- **31 Official Events Across 5 Categories:** `Art` (9 events), `Literary`, `Music`, `Theatre`, and `Dance`, defined in `src/data/events.ts` as the single source of truth alongside `src/data/schedule-2026-27.ts` and `src/data/notice-board.ts`.
- **Tentative 2026–27 Schedule Status:** Schedule views clearly communicate `TENTATIVE SCHEDULE` metadata (`BLOSSOMS (Be The Best) 2026-27 — School of Science, Prelims Event Schedule TENTATIVE`) so students verify room/time updates before prelims.
- **External Registration & Documents:** Primary registration currently routes to the official Google Form (`siteConfig.registrationUrl`), accompanied by Google Drive Rulebook (`siteConfig.rulebookUrl`) and Know More (`siteConfig.knowMoreUrl`) PDFs.
- **Privacy Constraint:** Winners and public records must never expose personal student phone numbers or private contact details.
- **Performance & Hydration Constraint:** WebGL (`GhostFibers`), 3D carousels (`EventCategoriesCarousel`), and `ScrollAmbience` sprite animations (`sakura_blossoms.png`, `sakura_petals.png`, `sakura_branch.png`, `butterflies.png`) must remain non-blocking, lazy-loaded where heavy, and zero-CLS.

## Brand Commitments

- **Festival & Institution:** Blossoms SOS — School of Sciences, CHRIST (Deemed to be University), Bangalore.
- **Motto:** *"Be the Best"*
- **Team & Slogan:** **Team Onyx** — *"From Flames to Flights, White Onyx Ignites."*
- **Binding Visual Assets (`public/`):** Official Blossoms 2026–27 circular crest (`/blossoms_logo_2026.webp`), CHRIST University official logo (`/christ_university_official_logo.webp`), Team Onyx insignia (`/blossoms_team.webp`), Official Slogan artwork (`/blossoms_slogan.webp`), and Aseprite pixel-art cherry-blossom & butterfly sprite sheets (`/sprites/sakura_blossoms.png`, `/sprites/sakura_petals.png`, `/sprites/sakura_branch.png`, `/sprites/butterflies.png`).
- **Binding Palette Identity:** Peach (`#FFDBC3`), Soft Lavender (`#9F91CC`), Royal Purple (`#5C4B99`), Deep Plum / Onyx Ink (`#3D246C`).

## Evidence on Hand

- `src/data/events.ts` — 31 structured competition definitions across 5 pillars.
- `src/data/schedule-2026-27.ts` — 2026–27 tentative prelims schedule & ceremony dates.
- `src/data/notice-board.ts` — Pinned festival notices, festival weeks, and weekly radar helpers.
- `src/data/gallery-data.ts` — Verified festival photographs and stage highlights.
- `src/data/editions/2025.ts` — Historical 2025 winners dataset with student privacy compliance.
- `src/data/site-config.ts` — Official URLs, contact email (`blossoms.sos@christuniversity.in`), and Instagram (`@blossoms_sos`).

## Product Principles

1. **Three-Second Clarity on Every Arrival:** Visitors immediately see what Blossoms 2026–27 is, who it is for (School of Sciences / Team Onyx), and how to register or browse events.
2. **Editorial Spirit, Operational Precision:** Showcase moments celebrate cultural energy; schedule, rules, and notice surfaces prioritize instant scanability and accurate venue/time details.
3. **Zero-Wipeout Delivery:** Never block content behind splash loaders, transition curtains, or pointer-intercepting decorative layers.
4. **Single Source of Truth:** Event counts, schedules, and registration links derive from typed data modules (`src/data/*`) rather than hardcoded duplicates.

## Accessibility & Inclusion

- **WCAG 2.2 AA Baseline:** Minimum `4.5:1` contrast for normal body text and `3:1` for large headings and UI icons across all Peach, Lavender, and White surfaces.
- **Keyboard & Screen-Reader Navigation:** Global skip-to-main-content link (`#main-content`), `Escape`-dismissible modals/drawers, visible `#5C4B99`/`#3D246C` focus rings, and semantic landmarks.
- **Reduced Motion:** Universal `@media (prefers-reduced-motion: reduce)` override in `src/styles/globals.css` freezes marquee, transitions, and ambient canvas/WebGL motion.
