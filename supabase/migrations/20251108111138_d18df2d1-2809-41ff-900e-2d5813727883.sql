-- Add 'pubg' to product_category enum type
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'pubg' 
    AND enumtypid = 'product_category'::regtype
  ) THEN
    ALTER TYPE product_category ADD VALUE 'pubg';
  END IF;
END $$;
