# Lecture 14: Schema design and normalization

## Aim

Design a library schema and normalize an order table to 3NF. See er-diagram.md.

## Files

- `er-diagram.md`
- `library.sql`
- `orders_3nf.sql`

## How to run

```text
psql -d your_database -f library.sql
psql -d your_database -f orders_3nf.sql
```

## Output

```text
# library.sql
{"member":"Aarav","title":"Database Basics","authors":"Author A, Author B"}
{"member":"Aarav","title":"Web Servers","authors":"Author B"}

# orders_3nf.sql
{"order_id":1,"name":"Aarav","email":"aarav@example.com","product":"Laptop","price":"65000.00","quantity":1}
{"order_id":1,"name":"Aarav","email":"aarav@example.com","product":"Mouse","price":"500.00","quantity":2}
{"order_id":2,"name":"Diya","email":"diya@example.com","product":"Keyboard","price":"1500.00","quantity":1}
```
