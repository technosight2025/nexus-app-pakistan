-- 20260607000017_customers_public_mutations.sql

-- Temporary policies to allow public inserts/updates/reads for testing the Customers UI without authentication
CREATE POLICY "Public read access for customers (Testing)" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Public insert access for customers (Testing)" ON public.customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for customers (Testing)" ON public.customers FOR UPDATE USING (true);

CREATE POLICY "Public read access for customer_events (Testing)" ON public.customer_events FOR SELECT USING (true);
CREATE POLICY "Public insert access for customer_events (Testing)" ON public.customer_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access for customer_events (Testing)" ON public.customer_events FOR UPDATE USING (true);
