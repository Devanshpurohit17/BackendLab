# Lecture 13: SQL and MongoDB

## Aim

Do the same student queries in PostgreSQL and MongoDB.

## Files

- `package.json`
- `students.js`
- `students.sql`

## How to run

```text
psql -d student_management -f students.sql
npm install
npm start
```

## Output

```text
# PostgreSQL
{"name":"Aarav","email":"aarav@example.com"}
{"name":"Rohan","email":"rohan@example.com"}

{"name":"Diya","enrollment_date":"2024-08-05T00:00:00.000Z"}
{"name":"Rohan","enrollment_date":"2024-08-06T00:00:00.000Z"}
{"name":"Kabir","enrollment_date":"2025-08-01T00:00:00.000Z"}

{"id":1,"name":"Aarav","branch":"CSE"}
{"id":2,"name":"Diya","branch":"CSE"}
{"id":3,"name":"Rohan","branch":"CSE"}
{"id":4,"name":"Meera","branch":"IT"}

# MongoDB
CSE students: [ 'Aarav', 'Rohan' ]
After January 2024: [ 'Diya', 'Rohan' ]
After update and delete: [ 'Diya', 'Rohan' ]
```
