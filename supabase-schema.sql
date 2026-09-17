-- Enums
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'failed', 'cancelled', 'refunded');
CREATE TYPE license_status AS ENUM ('active', 'activated', 'revoked', 'expired');

-- Tables
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_email TEXT NOT NULL,
  product_id TEXT REFERENCES products(id),
  amount DECIMAL NOT NULL,
  payment_status order_status DEFAULT 'pending',
  payment_reference TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS licenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) UNIQUE,
  license_key TEXT UNIQUE NOT NULL,
  product_id TEXT REFERENCES products(id),
  status license_status DEFAULT 'active',
  device_hash TEXT,
  activated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Insert the base products (Using ₹99 and ₹399) - Ignore if already exists
INSERT INTO products (id, name, price) VALUES 
('lucky', 'Lucky', 99.00),
('extra-lucky', 'Extra Lucky', 399.00)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);

-- Allow public to INSERT an order (for our frontend checkout)
CREATE POLICY "Allow public insert to orders" ON orders FOR INSERT WITH CHECK (true);

-- Allow public to SELECT an order they just created (by ID)
CREATE POLICY "Allow public select orders" ON orders FOR SELECT USING (true);

-- Allow public to SELECT their license if they know the order_id
CREATE POLICY "Allow public select licenses" ON licenses FOR SELECT USING (true);


-- =========================================================================
-- DATABASE TRIGGER: Auto-generate license when order is marked 'paid'
-- =========================================================================

CREATE OR REPLACE FUNCTION generate_license_on_paid()
RETURNS TRIGGER 
SECURITY DEFINER
AS $$
DECLARE
  new_license_key TEXT;
BEGIN
  -- Check if status changed to 'paid'
  IF NEW.payment_status = 'paid' AND OLD.payment_status != 'paid' THEN
    -- Generate a unique key: HANG-XXXX-XXXX-XXXX
    new_license_key := 'HANG-' || 
                       upper(substring(replace(gen_random_uuid()::text, '-', ''), 1, 4)) || '-' ||
                       upper(substring(replace(gen_random_uuid()::text, '-', ''), 5, 4)) || '-' ||
                       upper(substring(replace(gen_random_uuid()::text, '-', ''), 9, 4));
    
    -- Insert the license
    INSERT INTO licenses (order_id, license_key, product_id, status)
    VALUES (NEW.id, new_license_key, NEW.product_id, 'active');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS order_paid_trigger ON orders;
CREATE TRIGGER order_paid_trigger
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION generate_license_on_paid();
