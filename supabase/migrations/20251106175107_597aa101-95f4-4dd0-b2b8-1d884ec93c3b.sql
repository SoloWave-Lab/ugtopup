-- Grant super_admin role to user
INSERT INTO public.user_roles (user_id, role)
VALUES ('cfeddac9-459f-4427-8f14-8fde2eae9edc', 'super_admin')
ON CONFLICT (user_id, role) DO NOTHING;