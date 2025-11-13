-- Create shipments table for tracking packages
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  sender_email VARCHAR(255) NOT NULL,
  sender_phone VARCHAR(20),
  sender_address TEXT NOT NULL,
  recipient_name VARCHAR(255) NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  recipient_phone VARCHAR(20),
  recipient_address TEXT NOT NULL,
  package_description TEXT,
  weight_kg DECIMAL(10,2),
  dimensions_cm VARCHAR(50), -- Format: "L x W x H"
  service_type VARCHAR(50) NOT NULL DEFAULT 'standard', -- standard, express, overnight
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, picked_up, in_transit, out_for_delivery, delivered, On Hold
  estimated_delivery_date DATE,
  actual_delivery_date DATE,
  shipping_cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tracking events table for detailed tracking history
CREATE TABLE IF NOT EXISTS public.tracking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- picked_up, in_transit, arrived_facility, out_for_delivery, delivered, On Hold
  event_description TEXT NOT NULL,
  location VARCHAR(255),
  event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin users table for dashboard access
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin', -- admin, manager, operator
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shipments (public read access for tracking, admin full access)
CREATE POLICY "shipments_public_read" ON public.shipments 
  FOR SELECT USING (true); -- Allow public tracking lookup

CREATE POLICY "shipments_admin_all" ON public.shipments 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- RLS Policies for tracking events (public read access, admin write access)
CREATE POLICY "tracking_events_public_read" ON public.tracking_events 
  FOR SELECT USING (true); -- Allow public tracking history lookup

CREATE POLICY "tracking_events_admin_write" ON public.tracking_events 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "tracking_events_admin_update" ON public.tracking_events 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- RLS Policies for admin users (admin access only)
CREATE POLICY "admin_users_select" ON public.admin_users 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "admin_users_insert" ON public.admin_users 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "admin_users_update" ON public.admin_users 
  FOR UPDATE USING (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON public.shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON public.shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_created_at ON public.shipments(created_at);
CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_id ON public.tracking_events(shipment_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_timestamp ON public.tracking_events(event_timestamp);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_shipments_updated_at 
  BEFORE UPDATE ON public.shipments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON public.admin_users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
