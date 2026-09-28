CREATE TABLE public.gallery_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  dropbox_path text NOT NULL,
  couple_name text NOT NULL,
  wedding_date text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  cover_path text,
  highlight_paths text[] NOT NULL DEFAULT '{}',
  story_label_de text NOT NULL DEFAULT 'Eure Geschichte',
  story_label_en text NOT NULL DEFAULT 'Your story',
  story_heading_de text NOT NULL DEFAULT 'Ein Tag, in Bildern erzählt.',
  story_heading_en text NOT NULL DEFAULT 'One day, told in pictures.',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_configs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_configs TO authenticated;
GRANT ALL ON public.gallery_configs TO service_role;
ALTER TABLE public.gallery_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active galleries" ON public.gallery_configs FOR SELECT TO anon USING (active = true);
CREATE POLICY "Authenticated can read galleries" ON public.gallery_configs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can create galleries" ON public.gallery_configs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update galleries" ON public.gallery_configs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete galleries" ON public.gallery_configs FOR DELETE TO authenticated USING (true);
CREATE TRIGGER gallery_configs_set_updated_at BEFORE UPDATE ON public.gallery_configs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();