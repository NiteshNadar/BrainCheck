# Design

## Visual Theme
Amber & Obsidian — A warm, literary-inspired dark mode that feels like writing in a personal journal under soft light. Uses deep, earthy tones, elegant serif headings, and gentle lighting effects to create an inviting, therapeutic atmosphere.

## Color Palette

### Dark Neutrals
- `--bg-base`: `#0D0C0A` (rich, warm obsidian black)
- `--bg-mid`: `#1C1B19` (dark clay-charcoal for containers and sections)
- `--bg-card`: `rgba(253, 251, 247, 0.03)` (warm translucent card background)
- `--bg-card-border`: `rgba(217, 119, 6, 0.12)` (subtle amber-tinted border)

### Light Neutrals
- `--bg-light`: `#FDFBF7` (warm alabaster-white for light contrast sections)
- `--bg-white`: `#FFFFFF`

### Core Brand Colors
- `--amber`: `#D97706` (primary brand, representing insight and warmth)
- `--amber-light`: `#F59E0B` (hover state / active highlights)
- `--terracotta`: `#C2410C` (secondary brand, representing vitality and strength)
- `--terracotta-light`: `#EA580C` (hover state)
- `--sand`: `#A7A29A` (muted accent)

### Text Colors
- `--text-primary`: `#FDFBF7` (warm white on dark backgrounds)
- `--text-muted`: `#8E8A82` (soft sand grey on dark backgrounds)
- `--text-dark`: `#1C1B19` (charcoal on light backgrounds)
- `--text-dark-muted`: `#5C5852` (subtle grey on light backgrounds)

### Status Colors
- `--success`: `#10B981` (forest green)
- `--error`: `#EF4444` (warm red)
- `--warning`: `#F59E0B` (amber)

### Gradients
- `--gradient-brand`: `linear-gradient(135deg, #D97706 0%, #C2410C 100%)`
- `--gradient-hero`: `radial-gradient(ellipse at top left, #291A0A 0%, #0D0C0A 70%)`
- `--gradient-glow-amber`: `radial-gradient(circle, rgba(217,119,6,0.12) 0%, transparent 70%)`
- `--gradient-glow-terracotta`: `radial-gradient(circle, rgba(194,65,12,0.08) 0%, transparent 70%)`
- `--gradient-card-border`: `linear-gradient(135deg, rgba(217,119,6,0.25), rgba(194,65,12,0.25))`

## Typography
- **Heading Font**: Merriweather (Google Fonts, serif)
- **Body Font**: DM Sans or Inter (Google Fonts, sans-serif)

### Type Scale
- `--text-display`: `4rem` / `700` weight (serif, hero headlines)
- `--text-h1`: `2.5rem` / `700` weight (serif, page titles)
- `--text-h2`: `1.875rem` / `600` weight (serif, section headers)
- `--text-h3`: `1.25rem` / `600` weight (serif, card titles)
- `--text-body`: `1rem` / `400` weight (sans-serif, body copy, line-height `1.7`)
- `--text-small`: `0.875rem` / `400` weight (sans-serif, captions, footer disclaimer)

## Layout & Components

### Spacing & Grid
- Maximum content width: `1200px`, centered.
- Section padding: `6rem` vertical on desktop, `4rem` vertical on mobile.
- Alternating dark (`#0D0C0A`) and light (`#FDFBF7`) sections.

### Card Styles
- **Dark Sections**: `rgba(253, 251, 247, 0.03)` background, `1px solid rgba(217, 119, 6, 0.12)` border, border-radius `1.25rem`, backdrop-filter `blur(12px)`, box-shadow `0 8px 32px rgba(0,0,0,0.4)`.
- **Light Sections**: `#FFFFFF` background, `1px solid #EAE6DF` border, border-radius `1.25rem`, box-shadow `0 4px 16px rgba(0,0,0,0.04)`.

### Buttons
- **Primary CTA Button**: `linear-gradient(135deg, #D97706, #C2410C)` background, white text, border-radius `0.75rem`, padding `0.875rem 2rem`, font-weight `600`, transition `opacity 0.2s, transform 0.1s`. Hover: opacity `0.9`, translateY `-1px`.
- **Secondary Button**: transparent background, `1px solid rgba(217, 119, 6, 0.5)` border, `#FDFBF7` text, border-radius `0.75rem`. Hover: border-color `#D97706`, background `rgba(217, 119, 6, 0.1)`.

### Form Controls & Survey
- **Progress Bar**: `rgba(253, 251, 247, 0.1)` track, `linear-gradient(90deg, #D97706, #C2410C)` fill, full border-radius, height `6px`.
- **Input Fields**: `rgba(253, 251, 247, 0.06)` background, `1px solid rgba(217, 119, 6, 0.2)` border, border-radius `0.75rem`, `#FDFBF7` text. Focus: border-color `#D97706`, outline/ring `rgba(217, 119, 6, 0.3)`.
- **Answer Selection Cards**: `rgba(253, 251, 247, 0.03)` background, `1px solid rgba(217, 119, 6, 0.15)` border, border-radius `0.875rem`, padding `1rem 1.25rem`, cursor pointer. Selected state: `2px solid` border with `#D97706 -> #C2410C` gradient, background `rgba(217, 119, 6, 0.1)`.

### Background Decorations
- **Orbs**: Two large blurred gradient orbs at `z-index: 0`.
  - Orb 1: top-left, 600px diameter, `#D97706` at 12% opacity, blur 120px.
  - Orb 2: bottom-right, 500px diameter, `#C2410C` at 8% opacity, blur 100px.
- **Noise**: Subtle noise/grain texture overlay (2% opacity SVG filter).
