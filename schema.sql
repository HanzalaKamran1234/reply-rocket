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

-- We disable RLS on public.users because the server completely handles data securely
-- Or we enforce RLS cautiously:
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 3. Create generations table
CREATE TABLE public.generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    input_url TEXT NOT NULL,
    output_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn off RLS since we access DB through secure server using Anon key and Server logic
-- Note: It is recommended to use the Supabase Service Role Key on the backend if RLS is disabled, 
-- but since only the Next.js server accesses the Supabase REST API securely, disabled RLS + Anon Key works for rapid dev. 
-- However, for production, you should use the Service Role Key.
