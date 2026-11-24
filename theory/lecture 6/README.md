# Lecture 6: Sessions, cookies and query strings

## Aim

Compare three ways to keep state.

## Files

- `package.json`
- `server.js`

## How to run

```text
npm install
npm start
```

## Output

```text
GET /visits -> 200 {"visits":1}
GET /visits -> 200 {"visits":2}
GET /profile -> 401 {"error":"Please log in"}
POST /login -> 200 {"message":"Logged in"}
GET /profile -> 200 {"username":"devansh"}
POST /logout -> 200 {"message":"Logged out"}
GET /profile -> 401 {"error":"Please log in"}
GET /set-cookie -> 200 {"message":"Cookie set"}
GET /get-cookie -> 200 {"language":"en"}
GET /welcome?user=Devansh&role=student -> 200 {"message":"Welcome Devansh, your role is student"}
```
