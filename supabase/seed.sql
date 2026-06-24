-- Dev seed: set a user as admin
-- Replace 'your-user-uuid' with the actual UUID from auth.users
-- update profiles set role = 'admin' where email = 'admin@example.com';

-- Additional sample slots beyond the auto-generated ones
-- These are already seeded by the migration trigger, this file is for manual additions
select 'Seed complete. Set admin role manually via Supabase dashboard.' as message;
