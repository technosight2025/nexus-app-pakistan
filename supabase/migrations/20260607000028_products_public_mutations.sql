-- Relax RLS for products during testing phase
DROP POLICY IF EXISTS "Users can view products in their organization" ON public.products;
DROP POLICY IF EXISTS "Users can insert products in their organization" ON public.products;
DROP POLICY IF EXISTS "Users can update products in their organization" ON public.products;
DROP POLICY IF EXISTS "Users can delete products in their organization" ON public.products;

CREATE POLICY "Public read access for products (Testing)" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public insert access for products (Testing)" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for products (Testing)" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Public delete access for products (Testing)" ON public.products FOR DELETE USING (true);
