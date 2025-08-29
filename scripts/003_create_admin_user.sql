-- Create a default admin user for testing
-- This should be run after the main schema is created

-- First, you need to create a user in Supabase Auth manually or through the signup process
-- Then run this script to give them admin privileges

-- Replace 'your-admin-email@example.com' with the actual admin email
-- Replace 'your-user-id' with the actual user ID from auth.users

-- Example admin user (replace with real data)
INSERT INTO public.admin_users (id, email, full_name, role, is_active)
VALUES (
  -- You'll need to get the actual user ID from auth.users after creating the auth user
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
  'admin@guardfleetagency.com',
  'System Administrator',
  'admin',
  true
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- To find the user ID after creating an auth user, you can run:
-- SELECT id, email FROM auth.users WHERE email = 'your-admin-email@example.com';
-- Then update the admin_users table with the correct ID
