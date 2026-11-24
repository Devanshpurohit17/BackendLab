# Lecture 4: HTTP requests

## Aim

Send requests with curl and fetch to the lecture 3 server.

## Files

- `fetch.js`
- `requests.sh`

## How to run

```text
sh requests.sh
node fetch.js
```

## Output

```text
[
  { id: 1, name: 'Aarav', branch: 'CSE' },
  { id: 3, name: 'Rohan', branch: 'CSE' }
]
1. All students
[{"id":1,"name":"Aarav","branch":"CSE"},{"id":2,"name":"Diya","branch":"ECE"},{"id":3,"name":"Rohan","branch":"CSE"}]
2. Student 3
{"id":3,"name":"Rohan","branch":"CSE"}
3. Unknown student
{"error":"Student not found"} status=404
4. Response headers
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 117
ETag: W/"75-o9qnxMtTo+sd/Q4MjI4EKLUrdzo"
Date: Tue, 24 Nov 2026 08:46:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
