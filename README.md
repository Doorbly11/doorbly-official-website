# Doorbly – Official Company Website

Official company website for **Doorbly**, an Odisha-based doorstep services and work-opportunity platform connecting customers with verified local service professionals across all 30 districts.

**Tagline:** *"Everyday Services. Endless Opportunities."*  
**Official Domain:** [https://doorbly.com](https://doorbly.com)

---

## 1. Tech Stack

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** `lucide-react`
- **Backend / Database:** Supabase REST API (Contact Inquiries & Recruitment Applications)

---

## 2. Platform Portals & Endpoints

| Portal | Purpose | Default Destination |
| :--- | :--- | :--- |
| **Customer Portal** | Discover & book 14+ doorstep services | `https://doorbly-customer-booking-app.vercel.app/` |
| **Service Partner Portal** | Onboarding for technicians & freelancers | `https://doorbly-partner-app-4rhr.vercel.app/` |
| **Candidate Joining Portal** | Careers across 11 departments | `https://doorbly-candidate-joining-role-port.vercel.app/` |
| **Official Staff Login** | Staff workstation access in navigation menu | `https://doorbly-official-staff-workstation.vercel.app/` |

---

## 3. Environment Variables

Copy `.env.example` to `.env` for local development, or configure the variables below in your hosting dashboard:

```env
VITE_CUSTOMER_APP_URL="https://doorbly-customer-booking-app.vercel.app/"
VITE_PARTNER_APP_URL="https://doorbly-partner-app-4rhr.vercel.app/"
VITE_CANDIDATE_JOINING_PORTAL_URL="https://doorbly-candidate-joining-role-port.vercel.app/"
VITE_DOORBLY_OFFICIAL_LOGIN_URL="https://doorbly-official-staff-workstation.vercel.app/"

VITE_SUPABASE_URL="https://your-project-ref.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-public-anon-key"
```

> **Security Note:** Never commit `.env` or expose a Supabase `service_role` key in frontend code. Only use the public `anon` key with Row Level Security (RLS) policies enabled.

---

## 4. Supabase Database Schema

Run the following SQL in your Supabase SQL Editor (also available inside the password-protected **Settings Console** in the app):

```sql
-- 1. Recruitment Applications
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
  status text not null default 'Pending',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Contact Inquiries
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mobile text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_resolved boolean not null default false,
  created_at timestamptz not null default now()
);

-- 3. Row Level Security
alter table public.recruitment_applications enable row level security;
alter table public.contact_inquiries enable row level security;

create policy "Allow candidate application insert"
  on public.recruitment_applications for insert to anon, authenticated with check (true);

create policy "Allow contact inquiry insert"
  on public.contact_inquiries for insert to anon, authenticated with check (true);

create policy "Restrict read to authenticated staff"
  on public.recruitment_applications for select to authenticated using (true);

create policy "Restrict update to authenticated staff"
  on public.recruitment_applications for update to authenticated using (true);
```

---

## 5. Local Development & Verification

```bash
# Install dependencies
npm install

# Run local dev server (http://localhost:3000)
npm run dev

# Type-check TypeScript
npm run lint

# Create production bundle in dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Exporting & Deploying

### Vercel (`vercel.json` included)
1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework Preset: **Vite**, Build Command: `npm run build`, Output Directory: `dist`.
4. Add your `VITE_*` environment variables and click **Deploy**.

### Netlify (`netlify.toml` included)
1. Connect the repository in Netlify or drag-and-drop the built `dist/` folder.
2. Build Command: `npm run build`, Publish Directory: `dist`.

### Cloudflare Pages / Static Hosting
- Build Command: `npm run build`
- Build Output Directory: `dist`
- Serve `index.html` as the SPA fallback for all routes.
