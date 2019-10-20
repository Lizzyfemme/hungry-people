INSERT INTO orders(customer_phone, ordered_at, received_at, completed_at)
VALUES
('778-232-1659', now() - interval '1 hour', now() - interval '50 minutes', now() - interval '20 minutes'),
('604-552-1937', now() - interval '10 minutes', now() - interval '5 minutes', NULL),
('778-232-1659', now(), NULL, NULL);
