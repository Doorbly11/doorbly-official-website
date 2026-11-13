# Doorbly – Official Company Website

Official company website for **Doorbly**, an Odisha-based doorstep services and work-opportunity platform connecting customers with verified local service professionals and empowering communities with sustainable livelihood.

**Tagline:** *"Everyday Services. Endless Opportunities."*  
**Official Domain:** [https://doorbly.com](https://doorbly.com)

---

## 1. Brand Identity & Color Palette

- **Primary:** `#0F766E` (Deep Teal)
- **Secondary:** `#115E59` (Dark Spruce)
- **Background:** `#FFFFFF` (Crisp White)
- **Light Background:** `#F7FAF9` (Soft Mint Canvas)
- **Text:** `#172B2A` (Obsidian Charcoal)
- **Accent:** `#DDF4ED` (Pale Teal)
- **Typography:** `Inter` & `Poppins`

---

## 2. Platform Architecture & Portal Endpoints

The website features four main portal destinations configured via centralized administrative settings:

| Portal | Role | Destination |
| :--- | :--- | :--- |
| **Customer Portal** | Discover & book 14+ doorstep services | `https://doorbly-customer-booking-app.vercel.app/` |
| **Service Partner Portal** | Onboarding for skilled tradespeople & freelancers | `https://doorbly-partner-app-4rhr.vercel.app/` |
| **Staff Recruitment** | 11-department recruitment application with Supabase validation | Dedicated interactive application form |
| **Staff Workstation** | Restricted employee operations console | Configurable via `VITE_DOORBLY_STAFF_PORTAL_URL` (`https://staff.doorbly.com`) |

---

## 3. Environment Variables Configuration

Copy `.env.example` to `.env` or configure these variables in your deployment dashboard:

```env
# Official Customer Booking App URL
VITE_CUSTOMER_APP_URL="https://doorbly-customer-booking-app.vercel.app/"

# Official Partner App URL
VITE_PARTNER_APP_URL="https://doorbly-partner-app-4rhr.vercel.app/"

# Configurable Staff Workstation Portal URL (DOORBLY_STAFF_PORTAL_URL)
VITE_DOORBLY_STAFF_PORTAL_URL="https://staff.doorbly.com"

# Optional Supabase Recruitment Database (leave empty if pending configuration)
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-publishable-key"
```

> **Security Note:** Never expose Supabase `service_role` keys or private secrets in frontend code. Only use the public client `anon` key with Row Level Security (RLS) enabled.

---

## 4. Supabase Database Schema (For Staff Recruitment)

When you are ready to configure Supabase for receiving live staff recruitment submissions, run the following SQL migration in your Supabase SQL Editor:

```sql
-- Create table for Doorbly Staff Recruitment
create table if not exists public.recruitment_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  mobile_number text not null,
  email text not null,
  address text not null,
  district text not null,
  department text not null,
  preferred_position text not null,
  educational_qualification text not null,
  work_experience text not null,
  resume_filename text,
  why_join text not null,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.recruitment_applications enable row level security;

-- Allow anonymous or authenticated candidate application inserts
create policy "Allow candidate application submission"
  on public.recruitment_applications
  for insert
  to anon, authenticated
  with check (true);

-- Restrict read access strictly to authenticated staff
create policy "Restrict read to authenticated staff"
  on public.recruitment_applications
  for select
  to authenticated
  using (true);
```

---

## 5. Deployment Instructions for Vercel

### Option A: Via Vercel Git Integration (Recommended)
1. Push this repository to GitHub / GitLab / Bitbucket.
2. Go to [https://vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Under **Environment Variables**, add:
   - `VITE_CUSTOMER_APP_URL` = `https://doorbly-customer-booking-app.vercel.app/`
   - `VITE_PARTNER_APP_URL` = `https://doorbly-partner-app-4rhr.vercel.app/`
   - `VITE_DOORBLY_STAFF_PORTAL_URL` = `https://staff.doorbly.com`
   - *(Optional)* `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
7. Click **Deploy**.

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Build & Deploy
vercel --prod
```

---

## 6. Development & Verification

To run locally:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to preview the website.
