# Assumptions and Design Decisions

This document outlines key technical, architectural, and design assumptions made while developing the full-stack **Business Directory** web application for Coimbatore.

---

## 1. UI & Design System
- **Figma Alignment**: The assignment specification referenced attached Figma screenshots (desktop + mobile); however, no screenshot files or design token assets were physically provided in the repository or prompt. As documented during Phase 0 planning, the design was built following modern directory design conventions:
  - Sticky frosted header with brand logo, title, and local Coimbatore subtitle.
  - Centered hero section highlighting Coimbatore local discovery.
  - Multi-faceted search and filter toolbar with instant debounce (300ms), native responsive dropdowns, and quick reset.
  - Responsive cards using 16:9 media viewports, prominent gold/amber `Featured` badges, clean typography with `line-clamp` for readability, and action buttons for direct calling (`tel:`), WhatsApp messaging (`wa.me`), and website navigation.
  - Responsive column breakpoints: 1 column on mobile (<640px, targeting 390px viewport), 2 columns on tablet (640px - 1024px), and 3 columns on desktop (>=1024px, targeting 1440px viewport).
  - Modern neutral palette (Slate-50 background, Crisp white cards, Indigo-600 accents, Amber-100 featured badges, Slate-200 borders).

## 2. Database & Data Architecture
- **PostgreSQL Specification**: `server/db/schema.sql` defines exact PostgreSQL tables (`categories`, `businesses`) with primary keys, foreign keys, default timestamps, and composite indexing (`idx_businesses_name`, `idx_businesses_category_id`, `idx_businesses_location`, `idx_businesses_featured_created`).
- **Data Fidelity & Dual Mode**:
  - `schema.sql` and `seed.sql` provide production PostgreSQL DDL and 15 authentic Coimbatore business records across 6 categories.
  - To support instantaneous zero-friction evaluation on environments where PostgreSQL might not be running or credentials are yet unconfigured, `server/src/config/db.js` implements an in-memory SQL query simulator that parses the parameterized queries, executes exact `ILIKE` pattern filtering, category and location filters, and featured-first ordering. Once PostgreSQL is launched, it connects and executes directly via `pg.Pool`.
- **Fictional Data**: All business names, phone numbers, descriptions, and addresses are entirely fictional representations of well-known localities in Coimbatore (RS Puram, Peelamedu, Gandhipuram, Saibaba Colony, Saravanampatti, Race Course, Ramanathapuram, Singanallur, Town Hall).

## 3. Backend Architecture
- **Parameterization**: All SQL queries use positional parameters (`$1, $2, ...`) without raw string interpolation to eliminate SQL injection vulnerabilities.
- **Sorting Requirement**: All directory listings are strictly sorted with `is_featured DESC, created_at DESC`, guaranteeing featured businesses are pinned to the top followed by the newest additions.
- **Security & Reliability**: `helmet` headers, CORS whitelisting, rate limiting (200 requests/15 mins), and standard JSON error envelopes (`{ success: false, error: { message, status, details } }`).

## 4. Frontend Architecture
- **URL Synchronization**: The directory state (`search`, `category`, `location`, `page`) is bidirectionally synchronized with browser URL query parameters (`useSearchParams`). Reloading or sharing a link preserves the exact filter state.
- **Debounced Input**: Search query updates trigger API requests only after 300ms of inactivity (`useDebounce`), preventing request spam.
- **Request Cancellation**: `useBusinesses` utilizes native `AbortController` to cancel in-flight Axios requests when new search keystrokes occur or components unmount.
- **Image Fallback**: A custom SVG storefront placeholder is rendered whenever an image URL is missing, null, or fails to load.
- **Detail View**: In accordance with the technical assignment requirements, `/business/:id` is intentionally implemented as a lightweight stub page with a "Back to Directory" navigation link.
