# Admin Panel Setup Guide

## 🔐 Admin Access Configuration

Your admin panel is now ready! Here's how to set up admin access:

---

## Creating Admin Users

### Step 1: Get Your User ID

First, you need to find your user ID from Supabase:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/iwcqutzgtpbdowghalnl
2. Navigate to **Authentication** → **Users**
3. Find your user account and copy the **User ID (UUID)**

### Step 2: Grant Admin Role

Run this SQL command in your Supabase SQL Editor to make a user an admin:

```sql
-- Replace 'your-user-uuid-here' with the actual user ID from Step 1
INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-uuid-here', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

**Quick Link to SQL Editor:**
https://supabase.com/dashboard/project/iwcqutzgtpbdowghalnl/sql/new

---

## Admin Role Types

Your system now supports 3 levels of admin access:

### 1. **Super Admin** (Full Access)
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid', 'super_admin');
```

**Permissions:**
- Manage other admins
- View all data
- Delete records
- Modify system settings
- Approve/reject payments
- Confirm/cancel orders
- View reports
- View activity logs

### 2. **Admin** (Standard Access)
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid', 'admin');
```

**Permissions:**
- Approve/reject payment requests
- Confirm/cancel orders
- View analytics and reports
- View activity logs

### 3. **Sub Admin** (View Only)
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid', 'sub_admin');
```

**Permissions:**
- View orders
- View payment requests
- (Cannot approve/reject or confirm/cancel)

---

## Quick Setup Script

To set up your first admin (yourself), follow these steps:

1. **Sign up** on your website at `/signup`
2. **Get your User ID** from Supabase Dashboard → Authentication → Users
3. **Run this SQL** (replace `YOUR_USER_ID_HERE` with your actual UUID):

```sql
-- Make yourself a super admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'super_admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

4. **Refresh the page** and navigate to `/admin`

---

## Admin Panel Features

### 📊 **Overview Tab**
- Total users count
- Total orders and revenue
- Credits statistics
- Pending requests count
- Real-time dashboard metrics

### 🛍️ **Orders Tab**
- View all product orders
- Filter by status (Pending, Confirmed, Canceled, etc.)
- Filter by product category
- **Confirm orders** → Deducts credits from user
- **Cancel orders** → No credit deduction, requires reason
- View full order details including user input fields
- Real-time order updates

### 💳 **Payments Tab**
- View all credit requests
- See payment screenshots
- **Approve requests** → Adds credits to user balance
- **Reject requests** → Requires rejection reason
- Track processed requests history

### 📝 **Activity Tab**
- Complete audit log of all actions
- Track who did what and when
- Filter by activity type
- Real-time activity feed

---

## Security Features

✅ **Row Level Security (RLS)** enabled on all tables
✅ **Role-based access control** using security definer functions
✅ **Activity logging** for all admin actions
✅ **Real-time updates** using Supabase subscriptions
✅ **Server-side validation** for all operations

---

## Adding More Admins

To add additional admin users:

```sql
-- Admin with standard permissions
INSERT INTO public.user_roles (user_id, role)
VALUES ('another-user-uuid', 'admin');

-- Sub-admin with view-only access
INSERT INTO public.user_roles (user_id, role)
VALUES ('viewer-user-uuid', 'sub_admin');
```

---

## Checking Current Admins

To see all current admin users:

```sql
SELECT 
  ur.user_id,
  ur.role,
  p.email,
  p.full_name,
  ur.created_at
FROM user_roles ur
LEFT JOIN profiles p ON p.id = ur.user_id
WHERE ur.role IN ('super_admin', 'admin', 'sub_admin')
ORDER BY ur.created_at DESC;
```

---

## Removing Admin Access

To remove admin privileges from a user:

```sql
-- Remove specific role
DELETE FROM user_roles
WHERE user_id = 'user-uuid' AND role = 'admin';

-- Remove all admin roles for a user
DELETE FROM user_roles
WHERE user_id = 'user-uuid';
```

---

## Important URLs

- **Admin Panel:** Your-Domain/admin
- **Supabase Dashboard:** https://supabase.com/dashboard/project/iwcqutzgtpbdowghalnl
- **SQL Editor:** https://supabase.com/dashboard/project/iwcqutzgtpbdowghalnl/sql/new
- **Users Management:** https://supabase.com/dashboard/project/iwcqutzgtpbdowghalnl/auth/users

---

## Troubleshooting

### "Access Denied" Error
- Make sure you've added your user ID to `user_roles` table
- Verify your user is logged in
- Check the role is spelled correctly: `admin`, `super_admin`, or `sub_admin`

### Can't See Admin Panel
- Navigate directly to `/admin` in your browser
- Make sure you're logged in
- Clear browser cache and reload

### Orders Not Appearing
- Check that orders are being created in `product_orders` table
- Verify RLS policies are enabled
- Check browser console for errors

---

## Need Help?

If you encounter any issues:
1. Check the browser console for errors (F12)
2. View Supabase logs in the dashboard
3. Verify your SQL queries ran successfully
4. Make sure you're using the correct user UUID

---

**🎉 Your admin panel is now fully configured and ready to use!**
