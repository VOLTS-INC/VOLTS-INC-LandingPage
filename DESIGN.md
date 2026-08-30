# Design Brief

## Direction

VOLTS — a matte-black, animation-rich tech landing page for an upcoming company inspired by Alphabet Inc., built around a single electric-volt accent, composed as Header → Hero → "What we're building" → Footer.

## Tone

Premium dark tech: brutalist-minimal matte black surfaces with one luminous electric-green accent, executed with big-company confidence and restraint.

## Differentiation

The "VOLTS" identity — an electric volt-green glow on near-black matte surfaces — turns the brand name into the visual system, with floating CTAs and ambient green orbs as its signature.

## Color Palette

| Token      | OKLCH          | Role                                |
| ---------- | -------------- | ----------------------------------- |
| background | 0.12 0.008 260 | Matte black page background         |
| foreground | 0.92 0.01 260  | Near-white primary text             |
| card       | 0.16 0.012 260 | Elevated matte surface              |
| primary    | 0.82 0.19 145  | Electric volt green accent / glow   |
| accent     | 0.82 0.19 145  | Highlights, active states, glow     |
| muted      | 0.2 0.015 260  | Subtle secondary surface            |
| border     | 0.26 0.02 260  | Hairline separators / card borders  |

## Typography

- Display: Space Grotesk — hero wordmark, section headings
- Body: General Sans — paragraphs, UI copy
- Mono: Geist Mono — eyebrows, labels, index numbers
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `.eyebrow` (mono, uppercase, tracking-widest), body `text-base lg:text-lg`

## Elevation & Depth

Matte surfaces layered by lightness (bg 0.12 → card 0.16) with hairline borders, soft elevated shadows, and a single green glow shadow reserved for hover/active states.

## Structural Zones

| Zone    | Background   | Border   | Notes                                        |
| ------- | ------------ | -------- | -------------------------------------------- |
| Header  | bg-card/80   | border-b | Sticky, translucent blur, logo + anchor nav  |
| Content | bg-background | —       | Hero on bg-background; "What we're building" on bg-card/40 |
| Footer  | bg-card      | border-t | VOLTS branding + short identity line only    |

## Spacing & Rhythm

Generous section gaps (py-24 md:py-32) with a 2rem container; tight micro-spacing inside cards; 8px base grid for consistent rhythm.

## Component Patterns

- Buttons: rounded-full pills, primary filled volt-green with dark text, secondary outlined white; continuous float + hover lift & glow (brand elements, non-actionable)
- Cards: rounded-xl, bg-card, hairline border, hover lift + glow
- Pillars: `.pillar-card` bordered matte panel, green top hairline, mono index number, hover lift — the "What we're building" grid
- Badges: rounded-full, mono uppercase, border hairline, subtle green tint

## Motion

- Entrance: hero staggered fade-up on load; sections reveal with scroll-triggered `.reveal` (fade + translateY)
- Hover: buttons/cards/pillars lift -4px with green glow (0.3s)
- Decorative: ambient green glow orbs drifting; floating buttons bob continuously

## Constraints

- Matte black for both background and foreground surfaces; single volt-green accent only
- All colors via OKLCH tokens — no raw hex in components
- AA+ contrast maintained; focus-visible rings on all interactive elements
- No generic blue/purple gradients; depth via layers, not full-page gradients
- No waitlist, team, gallery, services, booking, location, or call-to-action content

## Signature Detail

Electric volt-green glow — ambient drifting orbs, floating CTAs, and hover glow — that turns the "VOLTS" brand into a living, luminous visual identity.
