# Hiring Partners — MVP Design Document

**Date:** 2026-03-11
**Status:** Approved

## 1. Overview

Hiring Partners is an employer discovery and talent community platform for the Greek tech ecosystem, operated by POS4work Innovation Hub. Candidates follow companies and receive alerts — they do not apply through the platform. Job listings link externally.

**Target users:** Students, graduates, and junior professionals in Greece.

## 2. Architecture

Monolithic Next.js 14+ App Router. Single codebase, single deploy.

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS 3.4+ |
| UI Components | shadcn/ui (Radix primitives) |
| Auth | NextAuth.js (email/password via Credentials provider) |
| ORM | Prisma |
| Database | PostgreSQL (Docker local) |
| i18n | next-intl (English + Greek) |
| Forms | react-hook-form + zod |
| Charts | Recharts |
| Email | Mock for MVP (Resend later) |
| AI | Mock/template-based (real AI later) |

**Server Components** for SEO pages (landing, discover, company profiles). **Client Components** for interactive parts (follow, filters, wizards, dashboards).

## 3. Design System

Dark theme inspired by HackTheBox Jobs.

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| bg-primary | #0a0e1a | Page background |
| bg-secondary | #111827 | Card backgrounds |
| bg-elevated | #1a2332 | Modals, dropdowns |
| bg-input | #1e2939 | Form inputs |
| accent-primary | #9fef00 | CTAs, active states |
| accent-hover | #b8ff33 | Hover on primary |
| accent-secondary | #14b8a6 | Tags, badges |
| text-primary | #f4f4f5 | Headings, body |
| text-secondary | #8799b5 | Descriptions |
| text-muted | #526177 | Disabled, placeholders |
| border | #1e293b | Card borders |
| border-focus | #9fef00 | Focus rings |
| danger | #ef4444 | Errors |
| warning | #eab308 | Warnings |
| success | #22c55e | Success, verified |

### Typography

- UI: Inter (400, 500, 600, 700, 800)
- Stats/Numbers: JetBrains Mono (500)

### Component Patterns

- Cards: #111827 bg, 1px #1e293b border, rounded-xl, hover glow (green shadow)
- Buttons Primary: #9fef00 bg, #0a0e1a text
- Buttons Secondary: transparent, #1e293b border
- Inputs: #1e2939 bg, #9fef00 focus border
- Badges: small rounded pills, category-colored

### Visual Effects

- Dot-grid pattern on hero backgrounds
- Glow hover on cards (box-shadow with green)
- Animated count-up stats (Intersection Observer)
- Skeleton loaders (shimmer on dark)
- Smooth transitions via App Router

## 4. Data Model

### User
- id, email, name, passwordHash, role (CANDIDATE | COMPANY_REP | ADMIN), locale (en | el), emailVerified, createdAt, updatedAt

### CandidateProfile
- userId (1:1 User), headline, experienceLevel (STUDENT | GRADUATE | JUNIOR), linkedinUrl, skills[], roleInterests[], industries[], preferredLocations[], emailDigest, emailEvents, emailNewsletter, onboardingComplete

### Company
- id, slug, name, description, industry, website, linkedinUrl, logo, coverImage, size (TINY | SMALL | MEDIUM | LARGE), founded, locations[], technologies[], status (AUTO_GENERATED | CLAIMED | VERIFIED), featured, createdAt, updatedAt

### CompanyClaim
- id, companyId, userId, fullName, jobTitle, workEmail, linkedinUrl, message, status (PENDING | APPROVED | REJECTED), reviewedBy, reviewNote, createdAt, reviewedAt

### JobListing
- id, companyId, title, location, type (REMOTE | HYBRID | ONSITE), externalUrl, status (ACTIVE | PAUSED | EXPIRED), postedAt, expiresAt

### Event
- id, companyId (nullable), title, description, type (WORKSHOP | MEETUP | WEBINAR | TALENT_SESSION), date, startTime, endTime, location, isOnline, registrationUrl, capacity, createdAt

### Junction Tables
- Follow: userId + companyId (unique)
- SavedJob: userId + jobListingId (unique)
- EventRegistration: userId + eventId (unique)

### GalleryImage
- id, companyId, url, caption, order

### Newsletter
- id, subject, content (HTML), status (DRAFT | SENT), sentAt, recipientCount, createdBy, createdAt

## 5. Routes

| Route | Auth | Description |
|-------|------|-------------|
| / | Public | Landing page |
| /discover | Public | Company grid with filters |
| /companies/[slug] | Public | Company profile (tabs) |
| /jobs | Public | Aggregated job listings |
| /events | Public | Global events directory |
| /login | Guest only | Email/password login |
| /register | Guest only | Registration |
| /onboarding | Candidate | 3-step wizard |
| /dashboard/candidate | Candidate | Followed companies, saved jobs |
| /dashboard/company | Company Rep | Profile editor, jobs, events, analytics |
| /admin/* | Admin | Platform management |

All routes under `[locale]` segment for i18n.

## 6. Pages

### Landing Page
- HeroSection: headline, subtitle, 2 CTAs, animated stat counters, dot-grid bg
- FeaturedCompanies: horizontal scroll of company cards
- HowItWorks: 3-column grid (Discover → Follow → Get Alerted)
- UpcomingEvents: 2-3 event cards
- NewsletterCTA: email input + subscribe
- ForCompaniesCTA: claim page promotion
- Footer

### Discover Companies
- SearchBar (full-width), FilterBar (horizontal chips: industry, location, size, has roles, verified), SortDropdown + ViewToggle (grid/list), CompanyGrid (3-col desktop, 1-col mobile), infinite scroll or load more

### Company Profile
- CompanyHero: cover/gradient, logo, name, headline, badges, follow, links
- Tabs: About (description, technologies, info) | Open Roles (external link cards) | Events (company events) | Gallery (verified only)
- Badges: "Auto-generated profile" or "Verified employer"

### Onboarding (3 steps)
- Step 1: Name, headline, LinkedIn, experience level
- Step 2: Role interests (chips), skills (tag input), industries (chips)
- Step 3: Location, email preferences, language
- → Redirect to /discover with welcome toast

### Claim Company Modal
- Fields: name, job title, work email, LinkedIn, message
- Submit → pending review → admin approves → dashboard unlocked

### Company Dashboard (sidebar layout)
- Overview: stats, follower chart, activity feed
- Profile Editor: rich text, logo/cover upload, company info
- Job Listings: CRUD, external URL, status toggle
- Events: CRUD, type, date, capacity
- Gallery: upload, reorder, captions
- Analytics: views, followers, job clicks (Recharts)

### Events Page
- Filter: type, date range (upcoming/this week/this month)
- Event cards: date prominent, type badge, host company, location, capacity, register button
- Past events (collapsed)

### Admin Dashboard (sidebar layout)
- Dashboard: KPIs, signup trends, pending actions
- Companies: table with bulk actions, CRUD
- Candidates: table, filter, CSV export
- Claim Requests: review queue, approve/reject
- Job Listings: moderate across platform
- Events: create platform events, moderate
- Newsletters: compose, preview, send
- AI Content: review queue (mock for MVP)
- Analytics: platform growth, engagement

## 7. Seed Data

20 real Greek tech companies, manually curated:
- Company name, description, industry, website, LinkedIn, locations, technologies, size, founded
- 2-3 sample job listings per company
- 3-5 sample events

## 8. Error Handling & Security

- Passwords hashed with bcrypt
- JWT sessions via NextAuth
- Role-based middleware on protected routes
- Zod validation on all forms (client + server)
- Optimistic UI with rollback for follow/unfollow
- Rate limiting on auth endpoints
- Input sanitization before DB writes
- WCAG 2.1 AA accessibility
- Empty states, 404 pages, error boundaries with retry

## 9. Responsive Design

- Mobile: bottom nav, single column, sheet modals, full-screen onboarding
- Tablet: 2-column, collapsible sidebar
- Desktop: 3-column grid, full sidebar

## 10. Performance

- Lighthouse > 90
- Server Components for static content
- next/image with WebP optimization
- Route-level code splitting
- Skeleton loaders for async content

## 11. MVP Scope Boundaries

**In scope:** 20 company profiles, candidate onboarding, follow/unfollow, job alerts (mock email), claim company flow, events, admin dashboard, analytics dashboards, i18n (EN/EL), dark theme.

**Out of scope for MVP:** Real email sending, real AI generation, LinkedIn OAuth, mobile app, payment/billing, real-time notifications, advanced search (Elasticsearch), company comparison, candidate messaging.
