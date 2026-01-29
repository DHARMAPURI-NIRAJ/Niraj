-- Add SELECT policy for authenticated users to view messages
CREATE POLICY "Authenticated users can view messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);