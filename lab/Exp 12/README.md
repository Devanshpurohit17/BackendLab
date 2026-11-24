# Experiment 12: Node, Express and EJS

## Aim

Create routes, a calculator API, student management, and EJS pages and forms.

## Files

- `package.json`
- `server.js`
- `views/index.ejs`
- `views/register.ejs`
- `views/result.ejs`
- `views/timetable.ejs`

## How to run

```text
npm install
npm start
```

## Output

```text
GET / -> 200 (HTML, 485 chars)
GET /text -> 200 Devansh Purohit, 590017030, CSE
GET /html -> 200 (HTML, 46 chars)
GET /json -> 200 {"name":"Devansh Purohit","rollNumber":"590017030","branch":"CSE"}
GET /calculate?op=add&a=5&b=3 -> 200 {"op":"add","a":5,"b":3,"result":8}
GET /calculate?op=power&a=2&b=5 -> 200 {"op":"power","a":2,"b":5,"result":32}
GET /calculate?op=modulus&a=7&b=4 -> 200 {"op":"modulus","a":7,"b":4,"result":3}
GET /calculate?op=divide&a=1&b=0 -> 400 {"error":"Cannot divide by zero"}
GET /calculate?op=toString&a=1&b=2 -> 400 {"error":"Unknown operation"}
GET /students -> 200 [{"id":1,"name":"Aarav","course":"CSE"},{"id":2,"name":"Diya","course":"IT"}]
GET /students/9 -> 404 {"error":"Student not found"}
POST /students/add -> 201 {"id":3,"name":"Kabir","course":"ME"}
POST /students/add -> 400 {"error":"name and course are required"}
GET /timetable -> 200 (HTML, 626 chars)
POST /register -> 200 (HTML, 281 chars)
POST /register -> 400 (HTML, 575 chars)
```
