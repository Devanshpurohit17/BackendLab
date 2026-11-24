-- Assignment 2, Part B
DROP TABLE IF EXISTS products;

-- Task 1: schema
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);

-- Task 2: five products in three categories
INSERT INTO products (name, category, price, attributes) VALUES
('Clean Code', 'book', 499.00, '{"author": "Robert C. Martin", "pages": 464}'),
('Eloquent JavaScript', 'book', 650.00, '{"author": "Marijn Haverbeke", "pages": 472}'),
('ProBook 14', 'laptop', 72000.00, '{"ram_gb": 16, "cpu": "Ryzen 7"}'),
('LiteBook 13', 'laptop', 41000.00, '{"ram_gb": 8, "cpu": "Core i3"}'),
('Wireless Mouse', 'accessory', 899.00, '{"color": "black", "wireless": true}');

-- Task 3: one query per category
SELECT name FROM products WHERE category = 'book' AND (attributes ->> 'pages')::int > 470;
SELECT name, attributes ->> 'cpu' AS cpu FROM products
WHERE category = 'laptop' AND (attributes ->> 'ram_gb')::int >= 16;
SELECT name FROM products WHERE category = 'accessory' AND attributes ->> 'color' = 'black';

-- Task 4: containment
SELECT name FROM products WHERE attributes @> '{"wireless": true}';

-- Operators used in Part A, question 3
SELECT attributes -> 'cpu' AS json_value, attributes ->> 'cpu' AS text_value,
       attributes ? 'cpu' AS has_cpu
FROM products WHERE name = 'ProBook 14';

-- Task 5: add an attribute without ALTER TABLE
UPDATE products SET attributes = attributes || '{"discount_pct": 10}' WHERE name = 'Wireless Mouse';
SELECT name, attributes FROM products WHERE name = 'Wireless Mouse';

-- Task 6: before and after the index
EXPLAIN ANALYZE SELECT name FROM products
WHERE category = 'laptop' AND (attributes ->> 'ram_gb')::int >= 16;
EXPLAIN ANALYZE SELECT name FROM products WHERE attributes @> '{"wireless": true}';
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);
ANALYZE products;
EXPLAIN ANALYZE SELECT name FROM products
WHERE category = 'laptop' AND (attributes ->> 'ram_gb')::int >= 16;
EXPLAIN ANALYZE SELECT name FROM products WHERE attributes @> '{"wireless": true}';

-- With five rows PostgreSQL prefers a sequential scan.
-- Turning it off only for this test shows that the index can be used.
SET enable_seqscan = off;
SET enable_bitmapscan = on;
EXPLAIN ANALYZE SELECT name FROM products WHERE attributes @> '{"wireless": true}';
RESET enable_seqscan;
RESET enable_bitmapscan;
