-- Create admin user from existing auth user by email
-- This script will find a user by email and give them admin privileges

-- Replace 'admin@guardianfleetagency.com' with your actual admin email
DO $$
DECLARE
    user_uuid UUID;
    admin_email TEXT := 'guardianfleetagency@gmail.com'; -- <-- CHANGE THIS EMAIL
BEGIN
    -- Find the user ID from auth.users by email
    SELECT id INTO user_uuid 
    FROM auth.users 
    WHERE email = admin_email;
    
    -- Check if user exists
    IF user_uuid IS NULL THEN
        RAISE NOTICE 'User with email % not found. Please sign up first at /auth/signup', admin_email;
    ELSE
        -- Insert or update admin user
        INSERT INTO public.admin_users (id, email, full_name, role, is_active)
        VALUES (
            user_uuid,
            admin_email,
            'System Administrator',
            'admin',
            true
        ) ON CONFLICT (id) DO UPDATE SET
            email = EXCLUDED.email,
            full_name = EXCLUDED.full_name,
            role = EXCLUDED.role,
            is_active = EXCLUDED.is_active,
            updated_at = NOW();
            
        RAISE NOTICE 'Admin user created successfully for %', admin_email;
    END IF;
END $$;
