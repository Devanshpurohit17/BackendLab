# Assignment 2: PostgreSQL JSONB

## Aim

Use JSONB in PostgreSQL and compare with MongoDB.

## Files

- `590017030_assignment2.md`
- `package.json`
- `products.js`
- `products.sql`

## How to run

```text
psql -d your_database -f products.sql
npm install
npm start
```

## Output

```text
# PostgreSQL
(run on PGlite, PostgreSQL compiled to WebAssembly)

{"name":"Eloquent JavaScript"}

{"name":"ProBook 14","cpu":"Ryzen 7"}

{"name":"Wireless Mouse"}

{"name":"Wireless Mouse"}

{"json_value":"Ryzen 7","text_value":"Ryzen 7","has_cpu":true}

{"name":"Wireless Mouse","attributes":{"color":"black","wireless":true,"discount_pct":10}}

Seq Scan on products  (cost=0.00..14.27 rows=1 width=218) (actual time=0.033..0.051 rows=1.00 loops=1)
  Filter: (((category)::text = 'laptop'::text) AND (((attributes ->> 'ram_gb'::text))::integer >= 16))
  Rows Removed by Filter: 4
  Buffers: shared hit=1
Planning Time: 0.080 ms
Execution Time: 0.162 ms

Seq Scan on products  (cost=0.00..12.38 rows=2 width=218) (actual time=0.011..0.013 rows=1.00 loops=1)
  Filter: (attributes @> '{"wireless": true}'::jsonb)
  Rows Removed by Filter: 4
  Buffers: shared hit=1
Planning Time: 0.039 ms
Execution Time: 0.026 ms

Seq Scan on products  (cost=0.00..1.11 rows=1 width=13) (actual time=0.011..0.013 rows=1.00 loops=1)
  Filter: (((category)::text = 'laptop'::text) AND (((attributes ->> 'ram_gb'::text))::integer >= 16))
  Rows Removed by Filter: 4
  Buffers: shared hit=1
Planning:
  Buffers: shared hit=21
Planning Time: 0.159 ms
Execution Time: 0.027 ms

Seq Scan on products  (cost=0.00..1.06 rows=1 width=13) (actual time=0.013..0.014 rows=1.00 loops=1)
  Filter: (attributes @> '{"wireless": true}'::jsonb)
  Rows Removed by Filter: 4
  Buffers: shared hit=1
Planning:
  Buffers: shared hit=10
Planning Time: 0.369 ms
Execution Time: 0.028 ms

Bitmap Heap Scan on products  (cost=12.93..16.94 rows=1 width=13) (actual time=0.615..0.618 rows=1.00 loops=1)
  Recheck Cond: (attributes @> '{"wireless": true}'::jsonb)
  Heap Blocks: exact=1
  Buffers: shared hit=4
  ->  Bitmap Index Scan on idx_products_attributes  (cost=0.00..12.93 rows=1 width=0) (actual time=0.594..0.595 rows=1.00 loops=1)
        Index Cond: (attributes @> '{"wireless": true}'::jsonb)
        Index Searches: 1
        Buffers: shared hit=3
Planning:
  Buffers: shared hit=1
Planning Time: 0.050 ms
Execution Time: 0.745 ms

# MongoDB
Books over 470 pages: [ 'Eloquent JavaScript' ]
Laptops 16GB+: [ 'ProBook 14' ]
Black accessories: [ 'Wireless Mouse' ]
Wireless: [ 'Wireless Mouse' ]
```
