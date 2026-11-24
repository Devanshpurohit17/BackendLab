-- The order table from the lecture, normalized to 3NF
DROP TABLE IF EXISTS order_items, orders, products, customers;

CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_id INTEGER REFERENCES orders(order_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, product_id)
);

INSERT INTO customers VALUES (1, 'Aarav', 'aarav@example.com'), (2, 'Diya', 'diya@example.com');
INSERT INTO products VALUES (1, 'Laptop', 65000), (2, 'Mouse', 500), (3, 'Keyboard', 1500);
INSERT INTO orders VALUES (1, 1), (2, 2);
INSERT INTO order_items VALUES (1, 1, 1), (1, 2, 2), (2, 3, 1);

-- joining the tables gives back the original rows
SELECT o.order_id, c.name, c.email, p.name AS product, p.price, i.quantity
FROM orders o
JOIN customers c ON c.customer_id = o.customer_id
JOIN order_items i ON i.order_id = o.order_id
JOIN products p ON p.product_id = i.product_id
ORDER BY o.order_id, p.product_id;
