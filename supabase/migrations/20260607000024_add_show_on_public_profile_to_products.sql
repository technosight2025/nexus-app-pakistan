ALTER TABLE public.products ADD COLUMN IF NOT EXISTS show_on_public_profile BOOLEAN NOT NULL DEFAULT false;
