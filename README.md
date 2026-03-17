# BayaniHub Admin Dashboard

Admin dashboard for BayaniHub — a disaster relief coordination platform. Built with **Next.js** (frontend) and **NestJS** (backend API) powered by **Supabase**.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (for the frontend)
- npm (for the backend)
- A Supabase project with the required tables

## Project Structure

```
├── pages/              # Next.js frontend pages
├── components/         # Shared React components
├── lib/                # Frontend utilities (api helper)
├── styles/             # Global CSS
├── backend/            # NestJS backend API
│   └── src/
│       ├── applications/   # Volunteer applications module
│       ├── campaigns/      # Campaigns/inventory module
│       ├── dashboard/      # Dashboard stats + activity module
│       ├── donors/         # Donors module
│       ├── documents/      # Document/file management module
│       ├── volunteers/     # Volunteer roles + search module
│       └── supabase/       # Supabase client provider
└── public/             # Static assets
```

## Environment Setup

### Frontend (root `.env.local`)

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (`backend/.env`)

Create a `.env` file inside the `backend/` folder:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-key
PORT=3001
FRONTEND_URL=http://localhost:8080
```

## Installation

### Frontend

```bash
pnpm install
```

### Backend

```bash
cd backend
npm install
```

## Running the App

### 1. Start the Backend (port 3001)

```bash
cd backend
npx nest start
```

Or for development with hot-reload:

```bash
cd backend
npx nest start --watch
```

### 2. Start the Frontend (port 8080)

In a separate terminal, from the project root:

```bash
pnpm dev
```

The frontend will be available at **http://localhost:8080** and will call the backend API at **http://localhost:3001/api**.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Dashboard stats + recent activity |
| GET | `/api/donors` | List all donations with donor profiles |
| GET | `/api/donors/:id` | Single donation detail |
| GET | `/api/applications` | List volunteer applications |
| GET | `/api/applications/:id` | Single application detail |
| PATCH | `/api/applications/:id/review` | Approve/reject application |
| GET | `/api/campaigns` | List campaigns with orgs + roles |
| GET | `/api/campaigns/:id` | Single campaign detail |
| GET | `/api/volunteers/roles` | List volunteer roles |
| GET | `/api/volunteers/search?q=` | Search user profiles by name |
| GET | `/api/volunteers/verify/:authUserId` | Check volunteer status |

## Supabase Tables

The app expects these tables in your Supabase project:

- `user_profiles` — User profile data (linked to auth)
- `donations` — Donor contribution records
- `bh_campaigns` — Campaign/relief fund records
- `organizations` — Organizations managing campaigns
- `volunteer_applications` — Volunteer application submissions
- `volunteer_roles` — Available volunteer positions per campaign
- `volunteer_deployments` — Volunteer deployment records

> **Note:** The backend uses separate queries (not PostgREST embedded joins) since the tables do not have foreign key constraints.
