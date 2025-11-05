-- Insert sample shipments for testing
INSERT INTO public.shipments (
  tracking_number, sender_name, sender_email, sender_address,
  recipient_name, recipient_email, recipient_address,
  package_description, weight_kg, dimensions_cm, service_type, status,
  estimated_delivery_date, shipping_cost
) VALUES 
(
  'GFA001234567890',
  'John Smith',
  'john.smith@example.com',
  '123 Main St, New York, NY 10001',
  'Jane Doe',
  'jane.doe@example.com',
  '456 Oak Ave, Los Angeles, CA 90210',
  'Electronics - Laptop Computer',
  2.5,
  '40 x 30 x 8',
  'express',
  'in_transit',
  CURRENT_DATE + INTERVAL '2 days',
  45.99
),
(
  'GFA001234567891',
  'Mike Johnson',
  'mike.j@example.com',
  '789 Pine St, Chicago, IL 60601',
  'Sarah Wilson',
  'sarah.w@example.com',
  '321 Elm St, Miami, FL 33101',
  'Documents - Legal Papers',
  0.5,
  '30 x 25 x 2',
  'overnight',
  'out_for_delivery',
  CURRENT_DATE,
  89.99
),
(
  'GFA001234567892',
  'Emily Davis',
  'emily.davis@example.com',
  '555 Broadway, Seattle, WA 98101',
  'Robert Brown',
  'robert.b@example.com',
  '777 Market St, San Francisco, CA 94102',
  'Clothing - Winter Jacket',
  1.2,
  '35 x 25 x 15',
  'standard',
  'delivered',
  CURRENT_DATE - INTERVAL '1 day',
  19.99
);

-- Insert corresponding tracking events
INSERT INTO public.tracking_events (shipment_id, event_type, event_description, location, event_timestamp)
SELECT 
  s.id,
  'picked_up',
  'Package picked up from sender',
  'New York Distribution Center',
  s.created_at + INTERVAL '1 hour'
FROM public.shipments s WHERE s.tracking_number = 'GFA001234567890';

INSERT INTO public.tracking_events (shipment_id, event_type, event_description, location, event_timestamp)
SELECT 
  s.id,
  'in_transit',
  'Package in transit to destination facility',
  'Chicago Hub',
  s.created_at + INTERVAL '1 day'
FROM public.shipments s WHERE s.tracking_number = 'GFA001234567890';

INSERT INTO public.tracking_events (shipment_id, event_type, event_description, location, event_timestamp)
SELECT 
  s.id,
  'picked_up',
  'Package picked up from sender',
  'Chicago Distribution Center',
  s.created_at + INTERVAL '30 minutes'
FROM public.shipments s WHERE s.tracking_number = 'GFA001234567891';

INSERT INTO public.tracking_events (shipment_id, event_type, event_description, location, event_timestamp)
SELECT 
  s.id,
  'out_for_delivery',
  'Package out for delivery',
  'Miami Local Facility',
  s.created_at + INTERVAL '18 hours'
FROM public.shipments s WHERE s.tracking_number = 'GFA001234567891';

INSERT INTO public.tracking_events (shipment_id, event_type, event_description, location, event_timestamp)
SELECT 
  s.id,
  'picked_up',
  'Package picked up from sender',
  'Seattle Distribution Center',
  s.created_at + INTERVAL '45 minutes'
FROM public.shipments s WHERE s.tracking_number = 'GFA001234567892';

INSERT INTO public.tracking_events (shipment_id, event_type, event_description, location, event_timestamp)
SELECT 
  s.id,
  'delivered',
  'Package delivered successfully',
  'San Francisco Local Facility',
  s.created_at + INTERVAL '2 days'
FROM public.shipments s WHERE s.tracking_number = 'GFA001234567892';
