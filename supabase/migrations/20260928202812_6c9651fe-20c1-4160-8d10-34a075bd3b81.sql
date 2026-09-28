DROP POLICY "Public can read active gallery products" ON public.gallery_products;
CREATE POLICY "Public can read active gallery products" ON public.gallery_products FOR SELECT TO anon, authenticated USING (active = true);
CREATE POLICY "Admins can read inactive gallery products" ON public.gallery_products FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));