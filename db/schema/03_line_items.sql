DROP TABLE IF EXISTS line_items CASCADE;

CREATE TABLE line_items (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) NOT NULL,
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  quantity SMALLINT
);
