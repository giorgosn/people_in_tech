# Hiring Partners — MVP Product Specification

## Product Overview

**Name:** Hiring Partners
**Operated by:** POS4work Innovation Hub
**Type:** Employer discovery and talent community platform
**Target Market:** Students, graduates, and junior professionals in the Greek tech ecosystem
**Languages:** Greek + English (i18n from day one)

### What This Is

An employer discovery platform where candidates **follow companies** — not apply to jobs. Candidates build a personalized feed of innovative companies and startups in Greece, receive alerts when those companies open positions or host events, and engage with a tech community.

### What This Is NOT

- NOT a traditional job board (no apply buttons, no resume uploads)
- NOT a recruitment CRM
- NOT a freelance marketplace

Job listings link **externally** to the company's own career page. The platform's value is **discovery, curation, and community**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 14+ (App Router)** |
| Styling | **Tailwind CSS 3.4+** |
| UI Components | **shadcn/ui** (Radix primitives) |
| Authentication | **NextAuth.js** (Email + LinkedIn OAuth) |
| Database | **PostgreSQL** (via Prisma ORM) |
| File Storage | **Cloudinary** or **Supabase Storage** (logos, images) |
| Email | **Resend** (transactional + digest emails) |
| AI | **OpenAI API** (company profile auto-generation) |
| Deployment | **Vercel** |
| i18n | **next-intl** (Greek + English) |
| Analytics | **Recharts** or **Tremor** (dashboard charts) |

---

## Design System

### Color Palette

Inspired by [HackTheBox Jobs](https://jobs.hackthebox.com/) — dark, bold, tech-forward.

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a0e1a` | Page background (deepest layer) |
| `--bg-secondary` | `#111827` | Card backgrounds, sections |
| `--bg-elevated` | `#1a2332` | Elevated surfaces, modals, dropdowns |
| `--bg-input` | `#1e2939` | Form inputs, search bars |
| `--accent-primary` | `#9fef00` | Primary CTAs, active states, highlights |
| `--accent-hover` | `#b8ff33` | Hover state for primary accent |
| `--accent-secondary` | `#14b8a6` | Secondary accent (teal — tags, badges) |
| `--text-primary` | `#f4f4f5` | Primary text (headings, body) |
| `--text-secondary` | `#8799b5` | Secondary text (descriptions, labels) |
| `--text-muted` | `#526177` | Disabled, placeholder text |
| `--border` | `#1e293b` | Card borders, dividers |
| `--border-focus` | `#9fef00` | Input focus rings |
| `--danger` | `#ef4444` | Destructive actions, errors |
| `--warning` | `#eab308` | Warnings, pending states |
| `--success` | `#22c55e` | Success messages, verified badges |
| `--info` | `#3b82f6` | Informational elements |

### Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Display/Hero | `Inter` or `Geist Sans` | 800 | 48-64px |
| H1 | `Inter` | 700 | 36px |
| H2 | `Inter` | 600 | 28px |
| H3 | `Inter` | 600 | 22px |
| Body | `Inter` | 400 | 16px |
| Small/Caption | `Inter` | 400 | 14px |
| Mono/Stats | `JetBrains Mono` | 500 | varies |

### Component Patterns

- **Cards**: Dark (`#111827`) with subtle `1px solid #1e293b` border, `rounded-xl`, hover glow effect (`box-shadow: 0 0 20px rgba(159, 239, 0, 0.08)`)
- **Buttons (Primary)**: `bg-[#9fef00] text-[#0a0e1a] font-semibold` with hover brightness
- **Buttons (Secondary)**: `border border-[#1e293b] text-[#f4f4f5]` with hover bg change
- **Buttons (Ghost)**: Transparent with text color, hover bg subtle
- **Inputs**: Dark bg (`#1e2939`), border on focus (`#9fef00`), placeholder in muted color
- **Badges/Tags**: Small rounded pills with category-specific colors (teal for tech, blue for info, green for active)
- **Modals**: Centered overlay with backdrop blur, elevated bg, smooth entry animation
- **Toast notifications**: Bottom-right, dark with accent left-border
- **Navigation**: Fixed top navbar, dark bg with border-bottom, neon-green active indicator

### Visual Effects

- Subtle **grid/dot pattern** on hero backgrounds (like HTB)
- **Glow effects** on hover for interactive cards
- **Animated counters** on landing page stats (count-up on scroll into view)
- **Smooth page transitions** using Next.js App Router
- **Skeleton loaders** for all async content (shimmer effect on dark bg)
- **Micro-interactions**: Button press scale, follow heart animation, tag selection bounce

---

## User Types & Roles

### 1. Candidate (default user)

A student, graduate, or junior professional exploring the Greek tech ecosystem.

### 2. Company Representative

A verified representative of a company listed on the platform. Gains access by claiming a company page.

### 3. Admin (POS4work Team)

Platform operators who manage content, moderate claims, and run the community.

---

## Pages & User Flows

### Page 1: Landing Page (`/`)

**Purpose:** Convert visitors into registered candidates or company reps.

**Layout:**

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR: Logo | Discover | Jobs | Events | [Sign In] [Get Started] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO SECTION                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Subtle dot-grid background pattern               │  │
│  │                                                   │  │
│  │  "Discover the tech companies                     │  │
│  │   shaping Greece's future"                        │  │
│  │                                                   │  │
│  │  Subtitle: Follow innovative startups.            │  │
│  │  Get alerts. Join the community.                  │  │
│  │                                                   │  │
│  │  [Explore Companies ➜]  [I'm a Company]           │  │
│  │                                                   │  │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐          │  │
│  │  │ 120+ │  │ 500+ │  │ 50+  │  │ 30+  │          │  │
│  │  │Compan│  │Candi │  │Events│  │Sector│          │  │
│  │  └──────┘  └──────┘  └──────┘  └──────┘          │  │
│  │  (animated count-up numbers in JetBrains Mono)    │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  FEATURED COMPANIES (horizontal scroll)                 │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │  Logo  │ │  Logo  │ │  Logo  │ │  Logo  │           │
│  │ Name   │ │ Name   │ │ Name   │ │ Name   │           │
│  │ Sector │ │ Sector │ │ Sector │ │ Sector │           │
│  │ 3 roles│ │ 5 roles│ │ 1 role │ │ 2 roles│           │
│  └────────┘ └────────┘ └────────┘ └────────┘           │
│                                                         │
│  HOW IT WORKS (3 columns)                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│  │ 🔍       │ │ ❤️        │ │ 🔔       │                │
│  │ Discover │ │ Follow   │ │ Get      │                │
│  │ Browse   │ │ Follow   │ │ Alerted  │                │
│  │ companies│ │ the ones │ │ when they│                │
│  │ by sector│ │ you love │ │ hire     │                │
│  └──────────┘ └──────────┘ └──────────┘                │
│                                                         │
│  UPCOMING EVENTS (2-3 event cards)                      │
│                                                         │
│  NEWSLETTER CTA                                         │
│  "Stay in the loop. Join 500+ candidates."              │
│  [email input] [Subscribe]                              │
│                                                         │
│  FOR COMPANIES CTA                                      │
│  "Get discovered by the next generation of talent."     │
│  [Claim Your Company Page ➜]                            │
│                                                         │
│  FOOTER: About | Contact | Terms | Privacy | Socials    │
└─────────────────────────────────────────────────────────┘
```

**Animated Stats Section:**
- Numbers count up from 0 when scrolled into view
- Use `JetBrains Mono` font for numbers
- Subtle green glow behind each stat card
- Stats: Companies (120+), Candidates (500+), Events (50+), Sectors (30+)

---

### Page 2: Candidate Onboarding Flow (`/onboarding`)

**3-step wizard with progress bar at top.**

**Step 1 — About You**
```
┌────────────────────────────────────────┐
│  Progress: [■■■□□□□□□□] Step 1 of 3   │
│                                        │
│  "Let's get to know you"               │
│                                        │
│  Full Name        [________________]   │
│  Headline         [________________]   │
│  LinkedIn URL     [________________]   │
│  Experience Level                      │
│   (●) Student                          │
│   ( ) Recent Graduate                  │
│   ( ) Junior Professional (0-2 yrs)    │
│                                        │
│                    [Next ➜]            │
└────────────────────────────────────────┘
```

**Step 2 — Your Interests**
```
┌────────────────────────────────────────┐
│  Progress: [■■■■■■□□□□] Step 2 of 3   │
│                                        │
│  "What are you looking for?"           │
│                                        │
│  Role Interests (multi-select chips)   │
│  [Frontend] [Backend] [Full-Stack]     │
│  [Data] [Design] [Product] [DevOps]    │
│  [Marketing] [Sales] [Operations]      │
│                                        │
│  Skills (tag input with suggestions)   │
│  [React] [Python] [x] [TypeScript][x] │
│  [Add skill...]                        │
│                                        │
│  Industries of Interest                │
│  [FinTech] [HealthTech] [EdTech]       │
│  [SaaS] [E-commerce] [AI/ML]          │
│  [Cybersecurity] [Gaming] [IoT]        │
│                                        │
│             [← Back] [Next ➜]          │
└────────────────────────────────────────┘
```

**Step 3 — Preferences**
```
┌────────────────────────────────────────┐
│  Progress: [■■■■■■■■■■] Step 3 of 3   │
│                                        │
│  "Almost done!"                        │
│                                        │
│  Preferred Location                    │
│  [Athens ▾] [Remote] [Thessaloniki]    │
│  [Anywhere in Greece]                  │
│                                        │
│  Email Preferences                     │
│  [✓] Weekly job digest                 │
│  [✓] Event announcements               │
│  [ ] Community newsletter              │
│                                        │
│  Language Preference                   │
│  (●) English  ( ) Ελληνικά             │
│                                        │
│         [← Back] [Complete Setup ✓]    │
└────────────────────────────────────────┘
```

After completion → redirect to `/discover` with a welcome toast: "Welcome! Start following companies to get personalized alerts."

---

### Page 3: Discover Companies (`/discover`)

**Purpose:** The core browsing experience. Candidates explore and follow companies.

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR                                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  "Discover Companies"                                   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ 🔍 Search companies, sectors, technologies...    │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  FILTER BAR (horizontal scroll)                         │
│  [All] [FinTech] [SaaS] [HealthTech] [AI/ML]           │
│  [E-commerce] [EdTech] [Cybersecurity] [More ▾]        │
│                                                         │
│  SORT: [Most Followed ▾]  VIEW: [Grid] [List]          │
│                                                         │
│  COMPANY GRID (3 columns on desktop, 1 on mobile)      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │  ┌────┐      │ │  ┌────┐      │ │  ┌────┐      │    │
│  │  │LOGO│      │ │  │LOGO│      │ │  │LOGO│      │    │
│  │  └────┘      │ │  └────┘      │ │  └────┘      │    │
│  │  Company A   │ │  Company B   │ │  Company C   │    │
│  │  [FinTech]   │ │  [SaaS]      │ │  [AI/ML]     │    │
│  │  Athens      │ │  Remote      │ │  Thessaloniki│    │
│  │  3 open roles│ │  5 open roles│ │  1 open role │    │
│  │  ♥ 128       │ │  ♥ 256       │ │  ♥ 64        │    │
│  │              │ │  ✓ Verified  │ │              │    │
│  │ [♡ Follow]   │ │ [♡ Follow]   │ │ [♡ Follow]   │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│                                                         │
│  [Load More] or infinite scroll                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Company Card Details:**
- Company logo (fallback: first letter avatar with gradient)
- Company name
- Industry badge (colored pill)
- Location
- Open roles count (green text if > 0)
- Follower count (heart icon)
- "Verified" badge if claimed
- "Auto-generated" subtle label if not claimed
- Follow/Unfollow button (heart icon, toggles with animation)
- Hover: subtle green glow border, slight scale-up

**Filters:**
- Sector/Industry (multi-select)
- Location (Athens, Thessaloniki, Remote, Other)
- Company size (1-10, 11-50, 51-200, 200+)
- Has open roles (toggle)
- Verified only (toggle)

**Sort options:**
- Most followed
- Most open roles
- Recently added
- Alphabetical

---

### Page 4: Company Profile Page (`/companies/[slug]`)

**Purpose:** Deep dive into a single company. The main attraction of the platform.

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR                                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO BANNER (company cover image or gradient)          │
│  ┌─────────────────────────────────────────────────┐    │
│  │                                                 │    │
│  │  ┌──────┐                                       │    │
│  │  │ LOGO │  Company Name                         │    │
│  │  └──────┘  "Building the future of fintech"     │    │
│  │            [FinTech] [Athens] [51-200]           │    │
│  │                                                 │    │
│  │  [♡ Follow]  [🔗 Website]  [in LinkedIn]        │    │
│  │                                                 │    │
│  │  ♥ 256 followers                                │    │
│  │                                                 │    │
│  │  ┌──────────────────────────────────┐           │    │
│  │  │ ⓘ Auto-generated profile         │           │    │
│  │  │ [Claim this company page →]      │           │    │
│  │  └──────────────────────────────────┘           │    │
│  │  OR                                             │    │
│  │  ✓ Verified Employer                            │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  TAB NAVIGATION                                         │
│  [About] [Open Roles] [Events] [Gallery]                │
│                                                         │
│  ═══ ABOUT TAB ═══                                      │
│                                                         │
│  About                                                  │
│  "Company description text generated by AI or           │
│   written by the company rep..."                        │
│                                                         │
│  Technologies & Focus Areas                             │
│  [React] [Node.js] [AWS] [Kubernetes] [Python]          │
│                                                         │
│  Company Info                                           │
│  Founded: 2019                                          │
│  Size: 51-200 employees                                 │
│  HQ: Athens, Greece                                     │
│  Industry: Financial Technology                         │
│                                                         │
│  ═══ OPEN ROLES TAB ═══                                 │
│                                                         │
│  ┌─────────────────────────────────────────────┐        │
│  │  Frontend Engineer          Athens | Remote  │        │
│  │  Posted 3 days ago                           │        │
│  │  [View on Company Site ↗]                    │        │
│  ├─────────────────────────────────────────────┤        │
│  │  Backend Developer          Remote           │        │
│  │  Posted 1 week ago                           │        │
│  │  [View on Company Site ↗]                    │        │
│  └─────────────────────────────────────────────┘        │
│                                                         │
│  ═══ EVENTS TAB ═══                                     │
│                                                         │
│  ┌─────────────────────────────────────────────┐        │
│  │  🎤 "Intro to React" Workshop               │        │
│  │  March 25, 2026 · 18:00 · Online            │        │
│  │  [Register ➜]                                │        │
│  └─────────────────────────────────────────────┘        │
│                                                         │
│  ═══ GALLERY TAB ═══ (only for verified companies)      │
│  Photos of office, team, events (grid layout)           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Badges:**
- `Auto-generated profile` — gray/muted badge with info icon, appears on unclaimed pages
- `Verified employer` — green badge with checkmark, appears on claimed pages

---

### Page 5: Claim Company Modal

**Triggered by:** "Claim this company page" button on any unclaimed company profile.

```
┌─────────────────────────────────────────┐
│  ✕                                      │
│                                         │
│  "Claim [Company Name]"                 │
│                                         │
│  Verify you represent this company      │
│  to unlock your employer dashboard.     │
│                                         │
│  Your Full Name    [________________]   │
│  Job Title         [________________]   │
│  Work Email        [________________]   │
│  (must match company domain)            │
│                                         │
│  LinkedIn Profile  [________________]   │
│                                         │
│  How can we verify? (optional)          │
│  [________________________________]     │
│  [________________________________]     │
│                                         │
│  [Submit Claim Request]                 │
│                                         │
│  ℹ Our team will review your request    │
│    within 2 business days.              │
└─────────────────────────────────────────┘
```

**After submission:** Show success state with "Claim request submitted" message. Admin receives notification to review.

**Verification flow:**
1. Rep submits claim
2. Admin reviews (checks work email domain, LinkedIn)
3. Admin approves or rejects
4. If approved → rep gets email with dashboard access
5. Company badge changes to "Verified employer"

---

### Page 6: Company Dashboard (`/dashboard/company`)

**Accessible to:** Verified company representatives only.

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR                    │  MAIN CONTENT              │
│  ┌───────────────────────┐  │                            │
│  │  Company Logo          │  │  OVERVIEW                 │
│  │  Company Name          │  │                            │
│  │  ✓ Verified            │  │  ┌──────┐ ┌──────┐ ┌──────┐│
│  │                        │  │  │ 256  │ │  5   │ │  3   ││
│  │  📊 Overview           │  │  │Follow│ │Roles │ │Events││
│  │  🏢 Company Profile    │  │  └──────┘ └──────┘ └──────┘│
│  │  💼 Job Listings       │  │                            │
│  │  📅 Events             │  │  FOLLOWER GROWTH CHART     │
│  │  📸 Gallery            │  │  ┌──────────────────────┐  │
│  │  📈 Analytics          │  │  │  📈 Line chart        │  │
│  │  ⚙️ Settings           │  │  │  showing follower     │  │
│  │                        │  │  │  growth over time     │  │
│  └───────────────────────┘  │  └──────────────────────┘  │
│                             │                            │
│                             │  RECENT ACTIVITY            │
│                             │  • 12 new followers today   │
│                             │  • "Frontend Engineer"      │
│                             │    viewed 45 times          │
│                             │  • Workshop registration:   │
│                             │    23 candidates            │
└─────────────────────────────────────────────────────────┘
```

**Dashboard Sections:**

1. **Overview** — Stats cards (followers, open roles, events, profile views), follower growth chart, recent activity feed

2. **Company Profile Editor** — Edit description (rich text), upload logo + cover image, update company info (size, industry, locations, technologies), preview how profile looks

3. **Job Listings Manager** — Add/edit/remove job listings, fields: title, location, type (remote/hybrid/onsite), external URL, status (active/paused), listing appears on company profile page

4. **Events Manager** — Create/edit events, fields: title, type (workshop/meetup/webinar/talent session), date, time, location (online/physical), description, registration link, view registrations list

5. **Gallery** — Upload team/office/event photos, drag-to-reorder, captions

6. **Analytics** — Profile views over time (line chart), follower demographics (pie chart: student/graduate/junior), job listing clicks (bar chart), top traffic sources, event registration rates

7. **Settings** — Team members (invite other reps), notification preferences, billing (future)

---

### Page 7: Events Page (`/events`)

**Purpose:** Global events directory. All community events across all companies.

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR                                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  "Community Events"                                     │
│  "Workshops, meetups, and sessions by top companies"    │
│                                                         │
│  FILTER BAR                                             │
│  [All] [Workshops] [Meetups] [Webinars] [Talent]        │
│  [Upcoming ▾] [This Week] [This Month]                  │
│                                                         │
│  EVENT CARDS (2 columns on desktop)                     │
│  ┌──────────────────────┐ ┌──────────────────────┐      │
│  │  March 25, 2026      │ │  April 2, 2026       │      │
│  │  18:00 - 20:00       │ │  17:00 - 19:00       │      │
│  │                      │ │                      │      │
│  │  "Intro to React"    │ │  "Career in FinTech" │      │
│  │  Workshop             │ │  Meetup              │      │
│  │                      │ │                      │      │
│  │  by Company A        │ │  by Company B        │      │
│  │  [Logo]              │ │  [Logo]              │      │
│  │                      │ │                      │      │
│  │  📍 Online           │ │  📍 Athens            │      │
│  │  👥 23/50 registered │ │  👥 45/100 registered│      │
│  │                      │ │                      │      │
│  │  [Register ➜]        │ │  [Register ➜]        │      │
│  └──────────────────────┘ └──────────────────────┘      │
│                                                         │
│  PAST EVENTS (collapsed section)                        │
│  [Show Past Events ▾]                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Event Card Details:**
- Date + time (prominent, top of card)
- Event title
- Event type badge (Workshop, Meetup, Webinar, Talent Session)
- Host company name + logo
- Location (Online or physical address)
- Registration count / capacity
- Register button (opens registration form or external link)
- Glow border on hover

---

### Page 8: Admin Dashboard (`/admin`)

**Accessible to:** POS4work team members only.

```
┌─────────────────────────────────────────────────────────┐
│  ADMIN SIDEBAR             │  MAIN CONTENT              │
│  ┌──────────────────────┐  │                            │
│  │  POS4work Admin      │  │  PLATFORM OVERVIEW         │
│  │                      │  │                            │
│  │  📊 Dashboard        │  │  ┌──────┐ ┌──────┐ ┌──────┐│
│  │  🏢 Companies        │  │  │ 120  │ │ 523  │ │  15  ││
│  │  👥 Candidates       │  │  │Compan│ │Candi │ │Claim ││
│  │  📋 Claim Requests   │  │  │  ies │ │dates │ │Pendi ││
│  │  💼 Job Listings     │  │  └──────┘ └──────┘ └──────┘│
│  │  📅 Events           │  │                            │
│  │  📧 Newsletters      │  │  PENDING CLAIM REQUESTS    │
│  │  🤖 AI Content       │  │  ┌──────────────────────┐  │
│  │  📈 Analytics        │  │  │ Company X — John Doe │  │
│  │  ⚙️ Settings         │  │  │ john@companyx.com    │  │
│  └──────────────────────┘  │  │ [Approve] [Reject]   │  │
│                            │  └──────────────────────┘  │
│                            │                            │
│                            │  RECENT ACTIVITY FEED      │
│                            │  • New candidate signup     │
│                            │  • Company Y claimed        │
│                            │  • 3 new job listings       │
│                            │                            │
│                            │  PLATFORM ANALYTICS         │
│                            │  ┌──────────────────────┐  │
│                            │  │ Signups over time     │  │
│                            │  │ (area chart)          │  │
│                            │  └──────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Admin Sections:**

1. **Dashboard** — Platform-wide KPIs (total companies, candidates, events, active jobs), signup trends (area chart), top followed companies, pending actions count

2. **Companies Management** — Table of all companies, columns: name, sector, status (auto-generated/verified), followers, jobs, actions, bulk actions: generate profiles, feature company, inline edit, add new company manually

3. **Candidates** — Table of registered candidates, search/filter by skills, experience level, location, export to CSV

4. **Claim Requests** — Queue of pending claims, each shows: company name, requester info, work email, LinkedIn, approve/reject buttons with optional message

5. **Job Listings** — All job listings across platform, filter by company, status (active/paused/expired), moderate content

6. **Events** — All events, create platform-wide events (not company-specific), moderate company events

7. **Newsletters** — Compose weekly digest email, select content: featured companies, new jobs, upcoming events, preview email template, send to all or segmented lists

8. **AI Content Review** — Queue of AI-generated company profiles, review and approve/edit before publishing, regenerate with different prompt, quality score indicator

9. **Analytics** — Platform growth (signups, follows, job clicks), engagement metrics, company performance rankings, geographic distribution of candidates, source/referral tracking

---

## AI Company Profile Generation

When admin adds a new company by URL:

1. Admin enters company website URL and/or LinkedIn page
2. System scrapes public information (name, description, industry, team size, locations, tech stack)
3. AI generates structured profile:
   - Company description (2-3 paragraphs)
   - Industry classification
   - Technology tags
   - Key facts (founded, size, HQ)
4. Profile is saved as "Auto-generated" with AI quality score
5. Admin reviews in AI Content Review queue
6. Admin can edit, approve, or regenerate
7. Approved profile goes live with "Auto-generated profile" badge

---

## Email Alert System

**Types of emails:**

1. **Welcome email** — After signup, confirm email, link to complete onboarding
2. **Weekly job digest** — Personalized: new jobs from followed companies + recommended companies based on interests
3. **Event announcement** — When a followed company creates an event
4. **New company alert** — When a company matching candidate's interests is added
5. **Claim approved** — Notification to company rep when their claim is approved

**Email design:** Dark theme matching platform, neon-green CTA buttons, clean layout with company logos.

---

## Database Schema (Key Models)

```
User
  id, email, name, role (CANDIDATE | COMPANY_REP | ADMIN)
  passwordHash, linkedinUrl, emailVerified, locale (en | el)
  createdAt, updatedAt

CandidateProfile
  userId, headline, experienceLevel, skills[], roleInterests[]
  industries[], preferredLocations[], emailPreferences{}

Company
  id, slug, name, description, industry, website, linkedinUrl
  logo, coverImage, size, founded, locations[], technologies[]
  status (AUTO_GENERATED | CLAIMED | VERIFIED)
  aiGeneratedContent, aiQualityScore
  createdAt, updatedAt

CompanyClaim
  id, companyId, userId, fullName, jobTitle, workEmail
  linkedinUrl, message, status (PENDING | APPROVED | REJECTED)
  reviewedBy, reviewedAt, createdAt

JobListing
  id, companyId, title, location, type (REMOTE | HYBRID | ONSITE)
  externalUrl, status (ACTIVE | PAUSED | EXPIRED)
  postedAt, expiresAt

Event
  id, companyId (nullable for platform events), title, description
  type (WORKSHOP | MEETUP | WEBINAR | TALENT_SESSION)
  date, startTime, endTime, location, isOnline
  registrationUrl, capacity, createdAt

EventRegistration
  id, eventId, userId, registeredAt

Follow
  id, userId, companyId, createdAt

SavedJob
  id, userId, jobListingId, savedAt

Newsletter
  id, subject, content, sentAt, recipientCount, segmentCriteria{}
```

---

## Responsive Design Requirements

| Breakpoint | Layout |
|-----------|--------|
| Mobile (< 640px) | Single column, bottom nav bar, stacked cards |
| Tablet (640-1024px) | 2-column grid, collapsible sidebar |
| Desktop (> 1024px) | 3-column grid, full sidebar, expanded cards |

**Mobile-specific:**
- Bottom navigation bar (Discover, Jobs, Events, Profile)
- Swipeable company cards
- Pull-to-refresh on feed pages
- Full-screen onboarding steps
- Sheet-style modals (slide up from bottom)

---

## Accessibility Requirements

- WCAG 2.1 AA compliance
- All interactive elements keyboard-navigable
- Proper ARIA labels on custom components
- Color contrast ratio >= 4.5:1 (check neon-green on dark bg)
- Screen reader support for all content
- Focus indicators visible on all interactive elements
- Alt text for all images
- Reduced motion support (`prefers-reduced-motion`)

---

## Performance Targets

- Lighthouse score > 90 on all pages
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Core Web Vitals passing
- Image optimization (next/image with WebP/AVIF)
- Route-level code splitting
- Skeleton loaders for all async content

---

## Project Structure

```
hiring-partners/
├── prisma/
│   └── schema.prisma
├── public/
│   ├── locales/
│   │   ├── en/
│   │   └── el/
│   └── images/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (main)/
│   │   │   │   ├── page.tsx          (landing)
│   │   │   │   ├── discover/
│   │   │   │   ├── companies/[slug]/
│   │   │   │   ├── jobs/
│   │   │   │   ├── events/
│   │   │   │   └── onboarding/
│   │   │   ├── dashboard/
│   │   │   │   ├── company/
│   │   │   │   └── candidate/
│   │   │   └── admin/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── companies/
│   │   │   ├── jobs/
│   │   │   ├── events/
│   │   │   ├── claims/
│   │   │   ├── ai/generate-profile/
│   │   │   └── newsletters/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/              (shadcn/ui components)
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── mobile-nav.tsx
│   │   ├── companies/
│   │   │   ├── company-card.tsx
│   │   │   ├── company-grid.tsx
│   │   │   └── company-filters.tsx
│   │   ├── jobs/
│   │   │   ├── job-card.tsx
│   │   │   └── job-list.tsx
│   │   ├── events/
│   │   │   ├── event-card.tsx
│   │   │   └── event-grid.tsx
│   │   ├── onboarding/
│   │   │   └── onboarding-wizard.tsx
│   │   ├── dashboard/
│   │   │   ├── stats-card.tsx
│   │   │   └── chart-widgets.tsx
│   │   └── shared/
│   │       ├── animated-counter.tsx
│   │       ├── badge.tsx
│   │       ├── search-bar.tsx
│   │       └── skeleton-loader.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── ai.ts
│   │   ├── email.ts
│   │   └── utils.ts
│   ├── hooks/
│   ├── types/
│   └── styles/
│       └── globals.css
├── tailwind.config.ts
├── next.config.js
├── package.json
└── .env.example
```

---

## Implementation Priority (MVP Phases)

### Phase 1 — Foundation (Week 1-2)
- [ ] Project setup (Next.js, Tailwind, shadcn/ui, Prisma, next-intl)
- [ ] Dark theme design system (colors, typography, components)
- [ ] Database schema + seed data (100 companies)
- [ ] Authentication (email + LinkedIn OAuth)
- [ ] Landing page with animated stats
- [ ] Responsive navbar + footer + mobile nav

### Phase 2 — Core Experience (Week 3-4)
- [ ] Candidate onboarding (3-step wizard)
- [ ] Discover Companies page (grid, filters, search, sort)
- [ ] Company profile page (all tabs)
- [ ] Follow/unfollow functionality
- [ ] Company card component with all states
- [ ] i18n setup (English + Greek translations)

### Phase 3 — Company Features (Week 5-6)
- [ ] Claim company modal + flow
- [ ] Company dashboard (profile editor, job listings, events, gallery)
- [ ] AI company profile generation (URL → structured profile)
- [ ] Job listings (external link cards)
- [ ] Events system (create, register, list)

### Phase 4 — Admin & Polish (Week 7-8)
- [ ] Admin dashboard (all sections)
- [ ] Claim request review queue
- [ ] AI content review queue
- [ ] Newsletter composer
- [ ] Email alerts (welcome, weekly digest, event announcements)
- [ ] Analytics dashboards (company + admin)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] QA + bug fixes

---

## Key UX Principles

1. **Discovery over application** — Every design decision should encourage exploration, not job applications
2. **Follow-first** — The follow button is the primary CTA, not "Apply"
3. **Low friction onboarding** — 3 steps, < 2 minutes, meaningful immediately after
4. **Visual company identity** — Logos, colors, and branding make companies feel real
5. **Community-driven** — Events and workshops are first-class citizens, not afterthoughts
6. **Trust signals** — Verified badges, follower counts, and activity indicators build credibility
7. **Mobile-first** — Most candidates are students browsing on phones
