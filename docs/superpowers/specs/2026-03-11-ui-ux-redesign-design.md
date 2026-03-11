# UI/UX Systematic Elevation — Design Spec

**Date:** 2026-03-11
**Approach:** Systematic Elevation — rework design tokens and shared components, cascade across all pages
**Direction:** Modern Minimal Dark (Linear/Vercel/Raycast aesthetic)
**Accent:** Lime green (retained, desaturated for sophistication)

---

## 1. Design Tokens & Foundation

### Color System (OKLCH)

**Backgrounds — 4-tier surface system:**

| Token | Current | Proposed | Purpose |
|-------|---------|----------|---------|
| `--background` | `oklch(0.13 0.02 260)` | `oklch(0.11 0.01 260)` | Page background — deeper, less chroma |
| `--card` / `--surface-1` | `oklch(0.17 0.02 260)` | `oklch(0.14 0.01 260)` | Cards, containers |
| `--surface-2` (new) | — | `oklch(0.17 0.01 260)` | Inner elements, inputs inset in cards |
| `--surface-3` (new) | — | `oklch(0.21 0.01 260)` | Hover states, elevated elements |

**Primary accent — desaturated:**

| Token | Current | Proposed |
|-------|---------|----------|
| `--primary` | `oklch(0.88 0.27 128)` | `oklch(0.82 0.19 130)` |

Same hue, lower chroma (0.27→0.19), slightly lower lightness. Reads as sophisticated accent, not neon.

**Borders:**
- Default: `rgba(255, 255, 255, 0.06)` (down from 0.1)
- Hover: `rgba(255, 255, 255, 0.12)`
- Featured elements: gradient border (white 8% → 3%)

### Shadows

Replace all colored glow effects with neutral layered shadows:

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.05);
```

Remove `.card-glow` and all `--shadow-glow-*` tokens.

### Transitions

3-tier system applied consistently:

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Icon Sizing Scale

Standardized across all components:

| Size | Pixels | Usage |
|------|--------|-------|
| `--icon-xs` | 14px | Inline metadata (location, date, count) |
| `--icon-sm` | 16px | Default component icons |
| `--icon-md` | 20px | Emphasis, button icons |
| `--icon-lg` | 24px | Hero sections, empty states |

### Spacing

- Section gaps: standardized `py-16 md:py-24`
- Component padding: increase inner card padding
- Container: consistent `max-w-7xl` with `px-4 sm:px-6 lg:px-8`

---

## 2. Card Components

### Shared Hover Pattern (all cards)

Replace `card-glow` with:
- `translateY(-2px)` lift
- Border opacity increase (0.06 → 0.12)
- Background lighten (surface-1 → slightly lighter)
- Transition: `--transition-normal`

### Company Card

- **Surface layering:** card uses surface-1, inner elements (logo, badges) use surface-2
- **Badge redesign:** consistent `rounded-md` (6px), `rgba(255,255,255,0.06)` bg with subtle border, `0.75rem` text. Same style for industry, size, and all metadata badges
- **Verification:** simple lime ✓ icon next to company name (replaces tiny 10px text badge)
- **Job count emphasis:** lime-colored number for open roles count
- **Icon sizing:** all inline icons 14px

### Job Card

- Same hover pattern (lift + border brighten)
- Company logo at 32px with proper border
- Job type badge uses consistent badge style (not custom outline variant)
- Save/bookmark button gets visible hover circle (`bg-white/8%`) and proper `aria-label`
- "Apply" link styled as ghost button with arrow icon

### Event Card

- Date block uses surface-2 bg instead of heavy monospace styling — smaller, integrated
- Event type badge: single consistent badge style with subtle left-border accent color
- Registration count and location use consistent 14px icons
- Same hover pattern

---

## 3. Navbar

### Desktop

- **Frosted glass:** background at 80% opacity + `backdrop-filter: blur(12px)`
- **Border:** `rgba(255,255,255,0.06)` bottom border
- **Nav link hover:** pill-shaped bg highlight (`white/6%`) with color brighten to white. `--transition-fast`
- **Active state:** white text + `white/8%` bg pill
- **Sign In button:** promoted to solid lime button (primary CTA)
- **Language switcher:** subtle bordered pill instead of plain text

### Mobile

- Sheet width: `max-w-[280px] w-[85vw]` (replaces fixed 288px)
- Touch targets: 44px minimum height
- Subtle dividers between sections

---

## 4. Footer

- **Top border:** gradient (transparent → white/8% → transparent) instead of solid line
- **Link sections:** each wrapped in semantic `<nav>` with `aria-label`
- **Link hover:** color transition to white + subtle `translateX(2px)` shift
- **Bottom bar:** separated copyright and social links with flex layout
- **Spacing:** increased vertical padding (`py-16` → `py-20`)

---

## 5. Landing Page

### Hero Section

- **Announcement pill:** replaces raw uppercase text. Pill badge with green dot indicator (Linear/Vercel pattern)
- **Headline:** negative letter-spacing (`-0.02em`), heavier weight
- **Subtitle:** constrained `max-w-lg`, better line-height
- **Button hierarchy:** primary gets arrow indicator (→), secondary uses filled ghost style (`white/6%` bg + border)
- **Stats bar:** connected blocks with shared background, separated from CTAs with more spacing
- **Radial gradient:** softer (6% opacity), positioned higher, elliptical shape

### Featured Companies

- **Scroll indicators:** gradient fade masks on left/right edges
- **Scroll snap:** `snap-x snap-mandatory` with `snap-start` on each card
- **Section header:** "Featured Companies" with "View all →" link flexed apart
- Cards use new hover system

### Other Sections

- **How It Works:** numbered steps with subtle connecting line, icons in surface-2 circles
- **Newsletter CTA:** contained card (surface-1 bg) with subtle top border gradient accent. Input + button inline
- **Section headers:** standardized h2 + subtitle + optional action link pattern

---

## 6. Discover Page

### Search Bar

- Surface-1 bg, larger padding (12px)
- Focus: border brightens + subtle `ring-1 ring-white/10` + bg shifts to surface-2
- Transition: `--transition-fast`

### Filter Pills

- Ghost button style: `white/4%` bg + `white/8%` border
- Hover: border brightens
- Active filter: lime accent border + lime text
- Consistent with sort dropdown styling

### Grid

- Breakpoints: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (adds intermediate md breakpoint)
- Results count right-aligned, muted, updates with opacity transition

### Empty State

- Centered search icon at 48px (muted)
- Descriptive text
- "Clear filters" ghost button as CTA

---

## 7. Auth Pages (Login / Register)

### Layout

- Form wrapped in surface-1 card with border
- `max-w-[400px]`, centered vertically and horizontally on page
- App logo at top of form card

### Inputs

- Background matches page bg (creates inset effect against card)
- Border brightens on focus with `ring-1`
- Larger padding: `10px 14px`

### Interactions

- Password toggle: "Show/Hide" text button next to label
- Button loading: spinner icon replaces text (not "Sign In..." text change)
- Error states: red border on field + error text below with `aria-describedby` linking

### Register Page

- Same card pattern
- Role selector (Candidate/Company) uses pill toggle instead of radio buttons
- Field spacing: `space-y-5` (up from `space-y-4`)

---

## 8. Company Profile Page

### Hero Card

- Gradient bg (`surface-1` → `surface-2`) instead of flat
- Logo larger (64px), inset with page bg color for depth
- Verification: lime ✓ next to name
- Actions: Follow as ghost button, View Jobs as primary lime button

### Tab Bar

- Active tab: lime bottom border + white text
- Inactive tabs: brighten on hover with `--transition-fast`
- Count badges in pill style

### Gallery Tab

- Masonry-style grid
- Images get subtle `scale(1.02)` on hover

---

## 9. Jobs & Events Pages

### Jobs Page

- Filter pills for type, location, department (same ghost pill style)
- Default to list layout (single column, wider cards)
- Save button hover circle, Apply as ghost button with arrow

### Events Page

- Filter by type, date range
- Default to grid layout (2-3 cols)
- Simplified date block (smaller, surface-2 bg)
- Unified type badge styling

### Shared

- Page header: title + subtitle + result count
- Pagination: ghost button "Load more" centered, with count indicator

---

## 10. Dashboards (Candidate / Company / Admin)

### Sidebar Navigation

- Surface-1 card container
- Active: pill-style (`white/6%` bg, white text)
- Hover: `white/4%` bg, color brightens
- Mobile: collapses to horizontal tab bar at top

### Stats Cards

- Surface-1 bg, clean number + label layout
- No colored backgrounds

### Tables

- Row hover: `white/3%` bg
- Header row: `white/5%` bg
- Borders: `white/6%`

### Charts

- Recharts with updated tokens: primary lime, secondary blue, muted gray
- Grid lines at `white/4%`

### Admin-Specific

- Claims queue status badges: Pending (yellow), Approved (green), Rejected (red) — using semantic color tokens

### Forms

- Same input styling as auth pages (inset bg, focus ring)

---

## 11. Global Patterns

### Page Transitions

- Subtle fade-in on route change: `opacity 0→1, translateY(4px→0), 200ms`
- CSS animation, no JS library needed

### Button Loading States

- Spinner icon replaces text content
- Button stays same width (prevent layout shift)
- Disabled state during loading

### Empty States

- Centered icon (24px, muted)
- Descriptive heading + subtitle
- Ghost button CTA when actionable

---

## Out of Scope

- Accessibility deep-dive (ARIA, semantic HTML) — deferred to separate pass
- Empty/loading state illustrations — deferred
- Design system consistency audit beyond what's covered here — deferred
- Light theme — not planned
- New features or functionality changes — this is visual/interaction only
