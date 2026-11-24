# Lecture 5: REST API with FastAPI

## Aim

Create a course CRUD API with a department filter.

## Files

- `main.py`
- `requirements.txt`

## How to run

```text
pip install -r requirements.txt
uvicorn main:app --reload
```

## Output

```text
GET /courses -> 200 [{"title":"Backend Development","credits":4,"department":"CSE","id":1},{"title":"Digital Electronics","credits":3,"department":"ECE","id":2}]
GET /courses?department=CSE -> 200 [{"title":"Backend Development","credits":4,"department":"CSE","id":1}]
POST /courses -> 201 {"title":"DBMS","credits":4,"department":"CSE","id":3}
PUT /courses/3 -> 200 {"title":"DBMS","credits":3,"department":"IT","id":3}
DELETE /courses/3 -> 204
GET /courses/3 -> 404 {"detail":"Course not found"}
POST /courses -> 422 {"detail":[{"type":"less_than_equal","loc":["body","credits"],"msg":"Input should be less than or equal to 6","input":99,"ctx":{"le":6}}]}
GET /docs -> 200 (HTML, 1009 chars)
GET /redoc -> 200 (HTML, 891 chars)
```
