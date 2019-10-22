SELECT orders.id, orders.customer_phone, string_agg(CONCAT (line_items.quantity, ' ', menu_items.menu_item_name), ', ')

FROM line_items
JOIN orders ON orders.id = order_id
JOIN menu_items ON menu_items.id = line_items.menu_item_id
GROUP BY orders.id;



