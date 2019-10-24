INSERT INTO orders(customer_phone, ordered_at, prep_time, received_at, completed_at)
VALUES
('778-232-1659', now() - interval '1 hour', 28, now() - interval '50 minutes', now() - interval '20 minutes'),
('604-342-3465', now() - interval '20 minutes', 7, now() - interval '5 minutes', NULL),
('778-543-3434', now() - interval '15 minutes', 9, now() - interval '1 minutes', NULL),
('604-552-1937', now() - interval '10 minutes', NULL, NULL, NULL),
('778-232-1659', now(), NULL, NULL, NULL),
('778-743-1634', now() - interval '9 minutes', NULL, NULL, NULL),
('778-555-4054', now() - interval '8 minutes', NULL, NULL, NULL),
('778-555-1234', now() - interval '5 minutes', NULL, NULL, NULL);
