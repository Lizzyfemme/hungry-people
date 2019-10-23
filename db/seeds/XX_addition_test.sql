INSERT INTO orders(customer_phone, ordered_at, received_at, completed_at)
VALUES
('778-232-1659', now(), NULL, NULL);

INSERT INTO line_items(menu_item_id, order_id, quantity)
VALUES
(2,9,2);
