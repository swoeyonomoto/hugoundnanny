ALTER TABLE public.gallery_configs
  ADD COLUMN IF NOT EXISTS has_photos boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS films jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS film_image_paths text[] NOT NULL DEFAULT '{}'::text[];