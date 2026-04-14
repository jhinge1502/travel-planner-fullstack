# Travel Planner (Full-Stack)

A travel bucket list app. Users browse countries via the REST Countries API,
save destinations to their Supabase-backed bucket list, and view a community
feed of everyone's saved destinations.

## Tech Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Clerk for authentication
- Supabase for database
- REST Countries API (https://restcountries.com/v3.1/)
- lucide-react for icons

## Data Model

destinations { id, user_id, country_code, country_name, flag_url, region,
               capital, population, notes, visited, created_at }

## Visual Style

- Teal-500/600 primary, amber-400 accent, slate grays
- Inter (body) + Playfair Display (headings)
- Rounded cards, subtle shadows, generous whitespace
