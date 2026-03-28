-- Run this script in your Supabase SQL Editor

DROP TABLE IF EXISTS public.generations CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TYPE IF EXISTS subscription_plan CASCADE;


-- 1. Create custom types
CREATE TYPE subscription_plan AS ENUM ('free', 'starter', 'pro');

-- 2. Create users table (No longer extends auth.users since we use Clerk)
CREATE TABLE public.users (
    id TEXT PRIMARY KEY, -- Clerk User IDs are text
    email TEXT UNIQUE NOT NULL,
    plan subscription_plan DEFAULT 'free' NOT NULL,
    usage_count INTEGER DEFAULT 0 NOT NULL,
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- We fully lock down tables with RLS since the app accesses DB entirely through 
-- the secure backend Next.js API using the Service Role Key. 
-- No client-side direct JS access is permitted for 'users' and 'generations'.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Block all anon client access to users" ON public.users FOR ALL TO anon USING (false);
CREATE POLICY "Block all authenticated client access to users" ON public.users FOR ALL TO authenticated USING (false);

-- 3. Create generations table
CREATE TABLE public.generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    input_url TEXT NOT NULL,
    output_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Block all anon client access to gen" ON public.generations FOR ALL TO anon USING (false);
CREATE POLICY "Block all authenticated client access to gen" ON public.generations FOR ALL TO authenticated USING (false);

-- The application backend uses the SUPABASE_SERVICE_ROLE_KEY which bypasses RLS completely.
