CREATE TABLE public.gallery_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description_de text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  sizes jsonb NOT NULL DEFAULT '[]'::jsonb,
  coming_soon boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  sort_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_products TO authenticated;
GRANT ALL ON public.gallery_products TO service_role;
ALTER TABLE public.gallery_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active gallery products" ON public.gallery_products FOR SELECT TO anon, authenticated USING (active = true OR private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can create gallery products" ON public.gallery_products FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gallery products" ON public.gallery_products FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery products" ON public.gallery_products FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE TRIGGER gallery_products_set_updated_at BEFORE UPDATE ON public.gallery_products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();