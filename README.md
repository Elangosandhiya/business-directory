# Coimbatore Business Directory (Full-Stack)

A modern, responsive full-stack Business Directory web application featuring local businesses across Coimbatore, Tamil Nadu. Built with Express, PostgreSQL (`pg`), React (Vite), and Tailwind CSS.

---

## 🚀 Features

- **Dynamic Search & Filtering**:
  - Debounced name search (300ms) with instant clearing
  - Category dropdown filter (loaded from database)
  - Location/Locality dropdown filter (Gandhipuram, RS Puram, Peelamedu, etc.)
  - Clear all filters button with active filter indicators
- **URL Synchronization**:
  - Filter state (`?search=...&category=...&location=...&page=...`) is bidirectionally synchronized with browser URL parameters for shareable, bookmarkable links.
- **Smart Sorting & Pagination**:
  - Featured listings pinned first (`is_featured DESC`), followed by newest listings (`created_at DESC`).
  - Clean pagination controls with page counters and responsive navigation.
- **Resilient UI**:
  - Responsive 1/2/3 column layout: 1 col on mobile (390px), 2 on tablet, 3 on desktop (1440px).
  - High-fidelity skeleton loading cards.
  - Image fallback placeholders for businesses without photos or with broken links.
  - Informative empty and error states with quick retry/reset triggers.
  - Direct action links: phone call (`tel:`), WhatsApp click-to-chat (`wa.me`), and website navigation.

---

## 🛠 Tech Stack

- **Frontend (`client/`)**:
  - React 18 (Vite, Plain JavaScript, no TypeScript)
  - Tailwind CSS
  - React Router DOM v6
  - Axios
  - Lucide React Icons
- **Backend (`server/`)**:
  - Node.js & Express
  - PostgreSQL client (`pg`) with parameterized queries
  - `express-validator` for query parameter validation
  - `helmet` for security headers
  - `cors` for cross-origin management
  - `morgan` for HTTP logging
  - `express-rate-limit` for DDoS prevention
  - `dotenv` for environment configuration

---

## 📋 Prerequisites

- **Node.js**: v18.0.0 or later (a portable Node v20.18.0 runtime is included in `tools/node/`)
- **PostgreSQL**: v13 or later (optional for local preview; an automatic in-memory seed engine is included if PostgreSQL is offline)

---

## ⚙️ Environment Variables

### Server (`server/.env`)
Copy `server/.env.example` to `server/.env`:
```bash
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# PostgreSQL Connection
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/business_directory
PGHOST=localhost
PGPORT=5432
PGDATABASE=business_directory
PGUSER=postgres
PGPASSWORD=postgres
```

---

## 🗄️ Database Setup (PostgreSQL)

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE business_directory;
   ```
2. Run migration and seed script:
   ```bash
   cd server
   npm run db:migrate
   ```
   *Alternatively, apply the SQL files directly using `psql`:*
   ```bash
   psql -U postgres -d business_directory -f db/schema.sql
   psql -U postgres -d business_directory -f db/seed.sql
   ```

---

## 🏃 Running the Application

### 1. Start the Backend API Server
```bash
cd server
npm start
```
The backend will run on `http://localhost:5000`.

### 2. Start the Frontend Client
In a separate terminal:
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/businesses` | List businesses with `search`, `category`, `location`, `page`, and `limit` |
| `GET` | `/api/categories` | List all 6 business categories |
| `GET` | `/api/locations` | List distinct Coimbatore localities |
| `GET` | `/api/health` | Health check endpoint |

---

## 📁 Repository Structure

```
.
├── ASSUMPTIONS.md          # Architectural decisions & assumptions
├── AI_USAGE_NOTES.md       # AI engineering log & verification records
├── README.md               # Setup and execution guide
├── tools/                  # Portable Node.js runtime environment
├── bin/                    # Convenient command wrappers (node, npm, npx)
├── server/                 # Express backend
│   ├── db/                 # schema.sql, seed.sql, migrate.js
│   └── src/                # controllers, services, routes, middleware, app.js, server.js
└── client/                 # React frontend
    ├── src/
    │   ├── components/     # Navbar, BusinessCard, SearchFilterBar, etc.
    │   ├── pages/          # BusinessListPage, BusinessDetailPage
    │   ├── hooks/          # useDebounce, useBusinesses
    │   ├── services/       # Axios API client
    │   └── utils/          # formatters, constants
    └── package.json
```
