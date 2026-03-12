# Supabase Setup

## 1. Create your Supabase project at supabase.com

## 2. Run this SQL in the Supabase SQL editor to create the leads table

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text,
  last_name text,
  email text not null,
  phone text,
  inquiry_type text,
  day_preferences text[],
  time_preference text,
  contact_method text,
  message text,
  source text,
  status text default 'new'
);

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Only service role can insert/read (API uses service role key)
create policy "Service role full access" on public.leads
  for all using (auth.role() = 'service_role');
```

## 3. Copy .env.local.example to .env.local and fill in your values

```bash
cp .env.local.example .env.local
```

## 4. (Optional) Set up a Supabase Database Webhook or Trigger to send email on insert
Alternatively, add a Resend API key to .env.local and the API route handles it automatically.
