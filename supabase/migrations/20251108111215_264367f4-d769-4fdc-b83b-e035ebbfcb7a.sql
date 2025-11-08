-- Insert PUBG Mobile UC packages into products table
INSERT INTO products (product_id, name, category, price, quantity, description, image_url, is_active, stock_status, metadata)
VALUES
  ('PUBG-UC-60', '60 UC', 'pubg', 146, 60, 'PUBG Mobile 60 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}'),
  ('PUBG-UC-120', '120 UC', 'pubg', 292, 120, 'PUBG Mobile 120 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}'),
  ('PUBG-UC-240', '240 UC', 'pubg', 547, 240, 'PUBG Mobile 240 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}'),
  ('PUBG-UC-325', '325 UC', 'pubg', 698, 325, 'PUBG Mobile 325 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}'),
  ('PUBG-UC-660', '660 UC', 'pubg', 1446, 660, 'PUBG Mobile 660 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}'),
  ('PUBG-UC-720', '720 UC', 'pubg', 1543, 720, 'PUBG Mobile 720 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}'),
  ('PUBG-UC-1500', '1500 UC', 'pubg', 3276, 1500, 'PUBG Mobile 1500 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}'),
  ('PUBG-UC-1800', '1800 UC', 'pubg', 3588, 1800, 'PUBG Mobile 1800 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}'),
  ('PUBG-UC-3850', '3850 UC', 'pubg', 6767, 3850, 'PUBG Mobile 3850 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}'),
  ('PUBG-UC-8100', '8100 UC', 'pubg', 13878, 8100, 'PUBG Mobile 8100 UC Top-up - Instant Delivery', 'https://i.ibb.co/SDDFYS1T/SAVE-20251108-163359.jpg', true, 'in_stock', '{"type": "uc", "game": "PUBG Mobile"}')
ON CONFLICT (product_id) DO NOTHING;
