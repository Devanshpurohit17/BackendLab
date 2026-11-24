# Experiment 12B: State management

## Aim

Build a login system and a to-do list using sessions and cookies.

## Files

- `login-app.js`
- `package.json`
- `session.js`
- `todo-app.js`
- `views/auth.ejs`
- `views/dashboard.ejs`
- `views/todo.ejs`

## How to run

```text
npm install
npm run login
# or
npm run todo
```

## Output

```text
GET /dashboard -> 302 Found. Redirecting to /login
POST /register -> 302 Found. Redirecting to /login
POST /register -> 400 (HTML, 491 chars)
POST /login -> 401 (HTML, 484 chars)
POST /login -> 401 (HTML, 484 chars)
POST /login -> 302 Found. Redirecting to /dashboard
GET /dashboard -> 200 (HTML, 260 chars)
POST /logout -> 302 Found. Redirecting to /login
GET /dashboard -> 302 Found. Redirecting to /login
POST /add -> 302 Found. Redirecting to /
GET / -> 200 (HTML, 575 chars)
POST /theme -> 302 Found. Redirecting to /
GET / -> 200 (HTML, 574 chars)
POST /delete/0 -> 302 Found. Redirecting to /
GET / -> 200 (HTML, 435 chars)
```
