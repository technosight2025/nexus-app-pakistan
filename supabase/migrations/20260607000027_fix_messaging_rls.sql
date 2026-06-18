-- 20260607000023_fix_messaging_rls.sql

-- Drop recursive policies causing infinite recursion errors
DROP POLICY IF EXISTS "Users can view conversations they are part of" ON public.conversations;
DROP POLICY IF EXISTS "Users can view conversation participants" ON public.conversation_participants;
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.messages;

-- Enable public read during development
DROP POLICY IF EXISTS "Public read conversations" ON public.conversations;
CREATE POLICY "Public read conversations" ON public.conversations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read conversation_participants" ON public.conversation_participants;
CREATE POLICY "Public read conversation_participants" ON public.conversation_participants FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read messages" ON public.messages;
CREATE POLICY "Public read messages" ON public.messages FOR SELECT USING (true);
