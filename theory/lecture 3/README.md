# Lecture 3: Express and Flask servers

## Aim

Create first servers in Express and Flask.

## Files

- `express-demo/package.json`
- `express-demo/server.js`
- `express-demo/views/students.ejs`
- `flask-demo/app.py`
- `flask-demo/requirements.txt`

## How to run

```text
cd express-demo
npm install
npm start
# Flask
cd flask-demo
pip install -r requirements.txt
python app.py
```

## Output

```text
GET / -> 200 (HTML, 37 chars)
GET /students -> 200 [{"id":1,"name":"Aarav","branch":"CSE"},{"id":2,"name":"Diya","branch":"ECE"},{"id":3,"name":"Rohan","branch":"CSE"}]
GET /students/2 -> 200 {"id":2,"name":"Diya","branch":"ECE"}
GET /students/99 -> 404 {"error":"Student not found"}
GET /students/branch/cse -> 200 [{"id":1,"name":"Aarav","branch":"CSE"},{"id":3,"name":"Rohan","branch":"CSE"}]
GET /html -> 200 (HTML, 55 chars)
GET /page -> 200 (HTML, 206 chars)
GET /students -> 200 [{"branch":"CSE","id":1,"name":"Aarav"},{"branch":"ECE","id":2,"name":"Diya"}]
GET /students/9 -> 404 {"error":"Student not found"}
POST /students -> 201 {"branch":"IT","id":3,"name":"Rohan"}
POST /students -> 400 {"error":"name and branch are required"}
GET /students/3 -> 200 {"branch":"IT","id":3,"name":"Rohan"}
```
