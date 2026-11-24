# Lab Exam 01 A: My Notes (re-implementation)

## Aim

Add, view, filter and delete notes using Express, EJS and MongoDB. This is a later re-implementation for practice, not the code submitted in the exam.

## Files

- `package.json`
- `public/style.css`
- `server.js`
- `views/index.ejs`
- `views/new.ejs`

## How to run

```text
# MongoDB must be running
npm install
npm start
```

## Output

```text
GET /notes -> 200 (HTML, 446 chars)
POST /notes -> 400 (HTML, 554 chars)
POST /notes -> 302 Found. Redirecting to /notes
GET /notes?category=Study -> 200 (HTML, 714 chars)
GET /notes?category=Nope -> 200 (HTML, 485 chars)
POST /notes/bad/delete -> 400 (HTML, 15 chars)
POST /notes/6b054ec0d8c41d6abc806376/delete -> 302 Found. Redirecting to /notes
GET /notes -> 200 (HTML, 446 chars)
```
