DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_phone VARCHAR(20),
  prep_time SMALLINT,
  ordered_at TIMESTAMP NOT NULL,
  received_at TIMESTAMP,
  completed_at TIMESTAMP
);
