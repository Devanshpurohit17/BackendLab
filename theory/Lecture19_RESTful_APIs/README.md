# Lecture 19: Implementing REST APIs

## Aim

Build a student API with filters, pagination, enrollments and error handling.

## Files

- `database.py`
- `main.py`
- `models.py`
- `requirements.txt`
- `schemas.py`

## How to run

```text
pip install -r requirements.txt
uvicorn main:app --reload
```

## Output

```text
POST /students -> 201 {"name":"Aarav","email":"aarav@example.com","branch":"CSE","department":"Computing","id":1}
POST /students -> 409 {"detail":"Email already exists"}
POST /students -> 422 {"detail":[{"type":"value_error","loc":["body","email"],"msg":"value is not a valid email address: An email address must have an @-sign.","input":"bad","ctx":{"reason":"An email address must have an @-sign."}}]}
POST /students -> 201 {"name":"Diya","email":"diya@example.com","branch":"IT","department":"Computing","id":2}
GET /students?page=1&limit=1 -> 200 {"items":[{"name":"Aarav","email":"aarav@example.com","branch":"CSE","department":"Computing","id":1}],"page":1,"limit":1,"total":2,"total_pages":2}
GET /students?branch=IT&search=diy -> 200 {"items":[{"name":"Diya","email":"diya@example.com","branch":"IT","department":"Computing","id":2}],"page":1,"limit":10,"total":1,"total_pages":1}
GET /students?search=%25 -> 200 {"items":[],"page":1,"limit":10,"total":0,"total_pages":0}
PUT /students/2 -> 409 {"detail":"Email already exists"}
PUT /students/1 -> 200 {"name":"Aarav","email":"aarav@example.com","branch":"ECE","department":"Computing","id":1}
POST /courses -> 201 {"code":"CSFS3008P","title":"Backend Development","id":1}
POST /courses -> 409 {"detail":"Course code already exists"}
POST /students/1/enrollments -> 201 {"id":1,"course":{"code":"CSFS3008P","title":"Backend Development","id":1}}
POST /students/1/enrollments -> 409 {"detail":"Already enrolled"}
POST /students/1/enrollments -> 404 {"detail":"Course not found"}
GET /students/1/enrollments -> 200 [{"id":1,"course":{"code":"CSFS3008P","title":"Backend Development","id":1}}]
DELETE /students/1 -> 204
GET /students/1 -> 404 {"detail":"Student not found"}
GET /docs -> 200 (HTML, 1021 chars)
```
