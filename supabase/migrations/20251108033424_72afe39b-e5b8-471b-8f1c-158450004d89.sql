-- Step 2: Create products table with all features
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category product_category NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  quantity INTEGER,
  stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'coming_soon')),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_stock ON public.products(stock_status);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_products_updated_at();

-- Seed initial product data
-- Mobile Legends Diamonds
INSERT INTO public.products (product_id, name, category, price, quantity, stock_status, metadata) VALUES
('ml-55', '55 Diamonds', 'mobile_legends', 133, 55, 'in_stock', '{"type": "diamond"}'::jsonb),
('ml-86', '86 Diamonds', 'mobile_legends', 187, 86, 'in_stock', '{"type": "diamond"}'::jsonb),
('ml-172', '172 Diamonds', 'mobile_legends', 321, 172, 'in_stock', '{"type": "diamond"}'::jsonb),
('ml-257', '257 Diamonds', 'mobile_legends', 454, 257, 'in_stock', '{"type": "diamond"}'::jsonb),
('ml-344', '344 Diamonds', 'mobile_legends', 587, 344, 'in_stock', '{"type": "diamond"}'::jsonb),
('ml-429', '429 Diamonds', 'mobile_legends', 721, 429, 'in_stock', '{"type": "diamond"}'::jsonb),
('ml-514', '514 Diamonds', 'mobile_legends', 854, 514, 'in_stock', '{"type": "diamond"}'::jsonb),
('ml-706', '706 Diamonds', 'mobile_legends', 1121, 706, 'in_stock', '{"type": "diamond"}'::jsonb),
('ml-878', '878 Diamonds', 'mobile_legends', 1388, 878, 'in_stock', '{"type": "diamond"}'::jsonb),
('ml-963', '963 Diamonds', 'mobile_legends', 1521, 963, 'in_stock', '{"type": "diamond"}'::jsonb)
ON CONFLICT (product_id) DO NOTHING;

-- Roblox Robux
INSERT INTO public.products (product_id, name, category, price, quantity, stock_status, metadata) VALUES
('rb-1000', '1000 Robux', 'roblox', 1499, 1000, 'in_stock', '{"type": "robux"}'::jsonb),
('rb-2500', '2500 Robux', 'roblox', 3499, 2500, 'in_stock', '{"type": "robux"}'::jsonb),
('rb-5000', '5000 Robux', 'roblox', 6999, 5000, 'in_stock', '{"type": "robux"}'::jsonb),
('rb-10000', '10000 Robux', 'roblox', 13999, 10000, 'in_stock', '{"type": "robux"}'::jsonb)
ON CONFLICT (product_id) DO NOTHING;

-- Design Services
INSERT INTO public.products (product_id, name, category, price, description, stock_status, metadata) VALUES
('design-logo', 'Professional Logo Design', 'design', 997, 'Custom logo design with unlimited revisions', 'in_stock', '{"type": "logo", "deliveryTime": "3-5 days"}'::jsonb),
('design-post', 'Social Media Post Design', 'design', 504, 'Eye-catching social media posts', 'in_stock', '{"type": "post", "deliveryTime": "2-3 days"}'::jsonb),
('design-banner', 'Banner Design', 'design', 478, 'Professional banner designs for your brand', 'in_stock', '{"type": "banner", "deliveryTime": "2-4 days"}'::jsonb),
('design-thumbnail', 'Thumbnail Design', 'design', 502, 'Engaging YouTube thumbnails', 'in_stock', '{"type": "thumbnail", "deliveryTime": "1-2 days"}'::jsonb)
ON CONFLICT (product_id) DO NOTHING;

-- Enable realtime for product_orders
ALTER PUBLICATION supabase_realtime ADD TABLE public.product_orders;