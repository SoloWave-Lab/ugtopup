-- Step 1: Add new enum values (must be done in separate transaction)
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'mobile_legends';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'roblox';
ALTER TYPE product_category ADD VALUE IF NOT EXISTS 'design';