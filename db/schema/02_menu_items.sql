DROP TABLE IF EXISTS menu_items CASCADE;

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_name VARCHAR(100) NOT NULL,
  description TEXT,
  photo_url VARCHAR(500),
  price MONEY NOT NULL,
  item_type_id INTEGER REFERENCES item_types(id) NOT NULL
);
