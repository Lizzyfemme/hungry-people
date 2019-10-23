INSERT INTO orders(customer_phone, ordered_at, prep_time, received_at, completed_at)
VALUES
('778-232-1658', now() - interval '1 hour', 25, now() - interval '50 minutes', now() - interval '20 minutes'),
('604-552-1937', now() - interval '10 minutes', 17, now() - interval '5 minutes', NULL),
('778-232-1659', now(), NULL, NULL, NULL);
