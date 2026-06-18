-- 20260607000011_fix_rls_recursion.sql

-- Drop the recursive policy
DROP POLICY IF EXISTS "Users can view organization members" ON public.organization_members;

-- Create a non-recursive policy. For now, users can only read their own membership. 
-- (If they need to see others in the org, a SECURITY DEFINER function is required).
CREATE POLICY "Users can view own membership" ON public.organization_members FOR SELECT USING (
  user_id = auth.uid()
);
