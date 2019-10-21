SELECT orders.id, orders.customer_phone, line_items.quantity, menu_items.menu_item_name
FROM line_items
JOIN orders ON orders.id = order_id
JOIN menu_items ON menu_items.id = menu_item_id;
