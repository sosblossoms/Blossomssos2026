---
name: Blossoms SOS 2026-27 — Team Onyx
description: Peach-paper and deep-plum editorial zine design system for School of Sciences Blossoms 2026-27 at CHRIST (Deemed to be University), Bangalore.
colors:
  peach-ground: "#FFDBC3"
  soft-lavender: "#9F91CC"
  royal-purple: "#5C4B99"
  royal-purple-hover: "#4C3C82"
  lavender-hover: "#8D7DBE"
  deep-plum: "#3D246C"
  surface-white: "#FFFFFF"
  paper-ivory: "#FFFCF5"
  status-success: "#10B981"
  status-warning: "#F59E0B"
  status-error: "#E11D48"
typography:
  display:
    fontFamily: "Orbitron, Space Grotesk, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Orbitron, Space Grotesk, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, monospace, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  editorial-serif:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0em"
  label:
    fontFamily: "Space Grotesk, monospace, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.royal-purple}"
    textColor: "{colors.surface-white}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.royal-purple-hover}"
    textColor: "{colors.surface-white}"
  button-accent:
    backgroundColor: "{colors.soft-lavender}"
    textColor: "{colors.deep-plum}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: "14px 28px"
  button-accent-hover:
    backgroundColor: "{colors.lavender-hover}"
    textColor: "{colors.deep-plum}"
  card-operate:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.deep-plum}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-paper-notice:
    backgroundColor: "{colors.paper-ivory}"
    textColor: "{colors.deep-plum}"
    rounded: "{rounded.md}"
    padding: "20px"
---

# Design System: Blossoms SOS 2026-27 — Team Onyx

## Overview

**Creative North Star: "Sunlit Peach Zine & Amethyst Stage"**

Blossoms 2026–27 (*Be The Best*) pairs warm, tactile peach-paper editorial warmth (`#FFDBC3`) with authoritative deep-plum ink (`#3D246C`), royal purple structure (`#5C4B99`), and soft lavender accents (`#9F91CC`). Rather than defaulting to generic dark-mode neon templates, Team Onyx's interface feels like a finely printed university cultural zine animated by subtle Aseprite cherry-blossom sprites and iridescent purple glass navigation.

### Surface Differentiation Contract

Every route and UI component in the application belongs to one of two strict visual modes:

1. **Experience / Persuade Surfaces** (`/`, `/events`, `/gallery`, `/about`, `/team`, and the `/winners` header):
   - **Purpose:** Celebrate School of Sciences cultural energy, persuade students to participate, and showcase photography and festival disciplines.
   - **Treatment:** Expressive `Orbitron` display typography paired with `Cormorant Garamond` italic editorial accents, asymmetric zine-inspired grids and coverflows, dramatic scale shifts, `WavyDivider` organic transitions, WebGL `GhostFibers` hero backdrop, and `ScrollAmbience` cherry-blossom & butterfly sprites.
2. **Operate / Read Surfaces** (`/schedule` timeline & calendar views, `EventDetailModal`, `/notice-board` circulars & `WeeklyRadarSection`, `/events/[category]` `SubEventCard` rules & evaluation checklists, `/winners` searchable results list):
   - **Purpose:** Help students quickly scan dates, rooms, team sizes, rules, posters, and official circulars with zero visual friction.
   - **Treatment:** Crisp legibility (`>= 4.5:1` WCAG 2.2 AA body text contrast, `>= 3:1` large text/icons), opaque or near-opaque paper/white card grounds (`#FFFFFF`, `#FFFCF5`), tactile `1px` plum-tinted borders, clean hierarchical spacing, and **zero distracting glass-washout blur over dense text**.

**Key Characteristics:**
- Warm Peach Paper base (`#FFDBC3`) across `html`, `body`, and `<main>` preventing white or dark flashes during route transitions.
- Self-hosted variable typography (`Orbitron`, `Space Grotesk`, `Plus Jakarta Sans`, `Cormorant Garamond`) loaded via `next/font/local`.
- Zero-Wipeout UX: no transition curtains, no blocking splash screens, and strictly `pointer-events-none` decorative ambient layers.

## Colors

The palette is locked to Team Onyx's official four-color system plus high-contrast paper/white surfaces and accessible semantic status tokens.

### Primary
- **Royal Purple** (`#5C4B99`, hover `#4C3C82`): Primary CTA fills (`Register Now`, `.clay-btn-primary`), active navigation highlights, icon accents, focus rings (`--color-focus`), and interactive emphasis on light paper surfaces.

### Secondary
- **Soft Lavender** (`#9F91CC`, hover `#8D7DBE`): Secondary tactile CTA fills (`.clay-btn-accent`), discipline category accents, muted atmospheric fills (`rgba(159, 145, 204, 0.25)`), and GhostFibers highlight glow.

### Neutral
- **Peach Paper Ground** (`#FFDBC3`): Primary canvas background (`--color-background`, `html`, `body`, `<main>`), warm editorial badges, and divider transitions.
- **Deep Plum Ink** (`#3D246C`): Primary typography and high-contrast ink (`--color-text`), achieving strong WCAG 2.2 AA/AAA contrast on both `#FFDBC3` and `#FFFFFF`.
- **Muted Plum Ink** (`rgba(61, 36, 108, 0.78)`–`0.85` on light surfaces): Secondary metadata and descriptions — must never drop below `4.5:1` contrast against `#FFFFFF` or `#FFDBC3` for body copy.
- **Elevated Paper White & Ivory** (`#FFFFFF`, `#FFFCF5`): Crisp reading surfaces for `SubEventCard`, `ScheduleView`, `EventDetailModal`, and pinned `CampusGreenBoard` notes.
- **Tactile Plum Hairlines** (`rgba(61, 36, 108, 0.16)` default, `0.08` subtle, `0.32` strong, `rgba(92, 75, 153, 0.35)` accent): Structural card dividers and input borders.

### Semantic Status Tokens
- **Success** (`#10B981`), **Warning** (`#F59E0B`), **Error** (`#E11D48`): Used exclusively for schedule/status badges and validation feedback, paired with readable dark ink or badge backgrounds meeting AA contrast.

### Named Rules
- **The Onyx Ground Rule.** Never replace the `#FFDBC3` peach canvas or `#3D246C`/`#5C4B99`/`#9F91CC` Onyx tokens with generic dark-navy (`#080E24`) or neon-lime (`#D1FF42`) defaults.
- **The Semantic Token Rule.** Wave 2+ refinements must centralize recurring surface, ink, and border values in semantic CSS variables in `src/styles/globals.css` (`--color-surface-*`, `--color-text-*`, `--color-border-*`) rather than scattering one-off opacity hexes.

## Typography

**Display Font:** `Orbitron` (`--font-orbitron`, `.font-angular` / `.font-angular-bold`, fallback `Space Grotesk, sans-serif`)
**UI & Heading Font:** `Space Grotesk` (`--font-space`, `.font-tech`, fallback `monospace, sans-serif`)
**Body Font:** `Plus Jakarta Sans` (`--font-jakarta`, `--font-sans`, `.font-body`, fallback `system-ui, sans-serif`)
**Editorial Serif Font:** `Cormorant Garamond` (`--font-cormorant`, `.font-serif`, fallback `Georgia, serif`)

**Character:** Angular, high-energy display headings (`Orbitron`) establish campus competition authority, tempered by humanist editorial warmth (`Cormorant Garamond`) on showcase surfaces and clean geometric clarity (`Space Grotesk` + `Plus Jakarta Sans`) on operational views.

### Hierarchy
- **Display** (Weight `900`, `3rem`–`6rem` / `text-5xl` to `text-8xl`, `line-height: 1.0`, `letter-spacing: -0.035em`, uppercase `.font-angular-bold`): Hero masthead (`BLOSSOMS`) and primary showcase landmarks only.
- **Headline** (Weight `800`, `1.75rem`–`3rem` / `text-3xl` to `text-5xl`, `line-height: 1.15`, `letter-spacing: -0.02em`): Page headers (`About`, `Gallery`, `Schedule`, `Notice Board`, `Category`).
- **Title** (Weight `700`, `1.125rem`–`1.25rem`, `line-height: 1.3`, `letter-spacing: -0.01em`, `Space Grotesk`): Card titles (`SubEventCard`, `ScheduleTimelineView` rows, modal headings).
- **Body** (Weight `400`–`500`, `0.875rem`–`1rem`, `line-height: 1.6`, `Plus Jakarta Sans`): Rules, evaluation checklists, narrative paragraphs, and notice copy; constrain prose blocks to `60ch`–`72ch` for comfortable reading.
- **Label / Kicker** (Weight `600`–`700`, `0.75rem` / `12px` minimum for readable UI labels, `letter-spacing: 0.06em`, `Space Grotesk` or mono): Eyebrow pills, team-size badges, venue/time metadata, and status stamps.

### Named Rules
- **The Mode-Matched Voice Rule.** Reserve `Orbitron` dramatic scale shifts and `Cormorant Garamond` editorial italics for `Experience / Persuade` surfaces; keep `Operate / Read` surfaces grounded in `Space Grotesk` headings and `Plus Jakarta Sans` body text.
- **The Legible Floor Rule.** Avoid sub-`12px` (`text-[10px]`/`text-[11px]`) body or operational text on schedule, modal, and rule cards; keep operational metadata crisp at `>= 12px` (`text-xs` or `text-sm`).

## Layout

- **Max Content Frame:** `1280px` (`--max-content-width: 80rem`) for page sections and readable grids; `1440px` (`max-w-[1440px]`) for the top brand crest header and floating pill navigation bar.
- **Experience / Persuade Grids:** Asymmetric zine/bento collages (`GalleryBentoGrid`), full-bleed WebGL hero (`min-h-[640px] md:min-h-[720px]`), horizontal photo marquee (`.animate-marquee`), and 3D `EventCategoriesCarousel` / `GalleryCoverflow` framed by `WavyDivider` organic breaks.
- **Operate / Read Grids:** Predictable 1-to-3 column responsive grids (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) with consistent `16px`–`24px` (`gap-4` / `gap-6`) gutters, sticky/clean filter toolbars, and spacious `24px` (`p-6`) internal card padding.
- **Spacing Rhythm:** Section vertical rhythm scales from `48px`–`64px` on mobile to `64px`–`96px` on desktop, with generous top clearance (`pt-28 md:pt-36`) on subpages to clear the fixed floating pill navigation.

## Elevation & Depth

This system uses a **tonal paper + selective tactile depth** hybrid:

- **Resting Cards (`Operate / Read`):** Flat elevated white (`#FFFFFF`) or paper ivory (`#FFFCF5`) grounded with `1px solid rgba(61, 36, 108, 0.16)` and subtle resting shadow (`shadow-xs` / `shadow-sm`). Elevation increases smoothly on hover (`border-color: rgba(92, 75, 153, 0.35)`).
- **Liquid Glass Floating Chrome (Navigation & Floating Register CTA only):** `.liquid-glass-nav` and `.liquid-glass-register-btn` use a royal-to-deep-plum translucent gradient (`rgba(61, 36, 108, 0.45)`–`0.48`) with `backdrop-filter: blur(14px) saturate(175%)`, specular rim border (`rgba(255, 255, 255, 0.32)`), and deep plum drop shadow (`0 14px 34px -8px rgba(61, 36, 108, 0.30)`), with an opaque `rgba(61, 36, 108, 0.90)` fallback when `backdrop-filter` is unsupported.
- **Claymorphism Tactile Controls:**
  - `--clay-shadow-primary`: `inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(92, 75, 153, 0.28)`
  - `--clay-shadow-accent`: `inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 4px 14px rgba(159, 145, 204, 0.35)`
  - `--clay-shadow-pressed`: `inset 0 2px 4px rgba(61, 36, 108, 0.25), 0 1px 2px rgba(61, 36, 108, 0.1)`
- **Named Rule — The Clear-Paper Rule.** Never stack `backdrop-blur` glass washouts behind dense schedule tables, modal rule lists, or notice text. Dense `Operate / Read` surfaces use solid or `>= 95%` opaque paper backgrounds.

## Shapes

- **Corner Radii:** Gentle rounded containers (`8px` small badges/inputs, `12px` notice cards/buttons, `16px` event/schedule cards, `24px` hero CTAs/feature panels, `9999px` pill navigation and filter chips).
- **Organic Transitions:** `WavyDivider` (`topColor="#FFDBC3"`) bridges showcase bands without harsh horizontal box seams.
- **Tactile Paper Ephemera:** Notice Board items on `CampusGreenBoard` use `PaperTone` sheets with folded corners and vector 3D pushpins (`ThumbtackSvg`) for physical campus bulletin-board character while keeping body copy strictly legible.

## Components

### Buttons
- **Shape:** Rounded `16px` (`rounded-2xl`) for hero CTAs (`min-h-[48px]`), `12px` (`rounded-xl`) for card/inline actions, `9999px` (`rounded-full`) for the floating liquid-glass CTA.
- **Primary (`.clay-btn-primary`):** Royal Purple (`#5C4B99`) background, white (`#FFFFFF`) text, `Space Grotesk` bold, clay shadow, lifting `1px` on hover (`#4C3C82`) and depressing on `:active`.
- **Accent (`.clay-btn-accent`):** Soft Lavender (`#9F91CC`) background, Deep Plum (`#3D246C`) bold text, hover `#8D7DBE`.
- **Focus State:** `2px` ring in `#5C4B99` or `#3D246C` (`focus-visible:outline-none focus-visible:ring-2`).

### Navigation
- **Top Brand Crest Row:** Non-sticky top-anchored circular Blossoms 2026–27 crest (left) and transparent CHRIST University logo (right) that scroll naturally out of view.
- **Floating Pill Nav (`.liquid-glass-nav`):** Centered fixed `44px`–`48px` pill (`md:inline-flex`) with specular top sheen; collapses to a `Escape`-dismissible mobile drawer on small viewports.

### Cards (`SubEventCard`, Schedule Rows, `WinnerEntry`)
- **Corner Style:** `16px` (`rounded-2xl`).
- **Background:** `#FFFFFF` (or `bg-white/95` on `Operate / Read` views) with `1px solid rgba(61, 36, 108, 0.16)`.
- **Internal Padding:** `24px` (`p-6`, `16px`–`24px` on compact mobile).
- **Content Structure:** Category & team-size pill row -> `Space Grotesk` / bold heading -> concise description -> `1px` plum hairline -> evaluation points / venue & timing footer -> registration/inspect action.

### Modals (`EventDetailModal`)
- **Surface:** Solid/high-contrast elevated sheet (`#FFFFFF` / `#FFFCF5`) with clear close button, `Escape` key handler, scroll lock, Drive poster preview (`/api/drive-posters`) with graceful fallback, and share action.

### Ambient & Hero Signature Elements
- **`HeroBackground` + `GhostFibers`:** Dynamic client-only WebGL canvas fading smoothly on scroll (`0.75 * (1 - scrollProgress)`), hidden once offscreen, never blocking hero text or buttons.
- **`ScrollAmbience`:** Fixed `pointer-events-none` canvas rendering Aseprite cherry blossoms, bright pink/white petals, garden boughs, and butterflies, automatically paused under `prefers-reduced-motion: reduce`.

## Do's and Don'ts

### Do:
- **Do** preserve the Team Onyx palette (`#FFDBC3`, `#9F91CC`, `#5C4B99`, `#3D246C`) and self-hosted font stack (`Orbitron`, `Space Grotesk`, `Plus Jakarta Sans`, `Cormorant Garamond`) across every route.
- **Do** differentiate `Experience / Persuade` surfaces (bold editorial scale, asymmetric zine framing, ambient sprites) from `Operate / Read` surfaces (solid paper/white cards, `>= 4.5:1` contrast, tactile borders, fast scanability).
- **Do** keep all decorative canvases (`GhostFibers`, `ScrollAmbience`) non-interactive (`pointer-events-none`, `aria-hidden="true"`) and frozen under `prefers-reduced-motion: reduce`.
- **Do** maintain a minimum `48px` touch target height on primary mobile CTAs and `44px` minimum on interactive filter pills/buttons.
- **Do** use semantic CSS variables from `src/styles/globals.css` when introducing or refactoring component styles.

### Don't:
- **Don't** introduce generic AI dark-mode themes (`#080E24` navy, `#D1FF42` neon lime, or cold slate grays) or swap out the self-hosted fonts for generic `Inter`/`Roboto` defaults.
- **Don't** apply heavy `backdrop-blur` glass washouts behind dense operational text in `/schedule`, `/notice-board`, `/events/[category]`, or `EventDetailModal`.
- **Don't** render full-viewport transition curtains, splash screen loaders, or sticky viewport-takeover banners that delay LCP or trap keyboard focus.
- **Don't** drop muted ink opacity below `4.5:1` WCAG 2.2 AA contrast (avoid `text-[#3D246C]/40` or `/55` for readable captions, placeholders, or metadata).
- **Don't** unmount layout containers without height reservation during filter/tab switches (avoid Cumulative Layout Shift).
