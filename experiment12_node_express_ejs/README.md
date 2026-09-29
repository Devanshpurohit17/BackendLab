# Experiment 12 — Node.js, Express.js and EJS Templating

## Objective

To understand and implement server-side JavaScript using Node.js, build RESTful APIs with Express.js, handle HTTP requests and responses, work with URL parameters and POST data, implement EJS templating, and use Nodemon.

## Requirements

Install Node.js and npm.

Check installation:

```bash
node -v
npm -v
```

## Installation

Open the terminal inside this project folder:

```bash
npm install
```

## Run normally

```bash
npm start
```

Open:

http://localhost:3000

## Run with Nodemon

```bash
npm run dev
```

Nodemon automatically restarts the server when `server.js` is changed.

## Routes

### Web routes

- `GET /` — Home page
- `GET /students` — Student directory
- `GET /student/:id` — Dynamic EJS page using a URL parameter
- `POST /students` — Receives HTML form data

### REST API routes

- `GET /api/students` — Return all students as JSON
- `GET /api/students/:id` — Return one student
- `POST /api/students` — Create a student using JSON
- `DELETE /api/students/:id` — Delete a student

## Testing the POST API

Using Postman or Thunder Client:

Method:

POST

URL:

http://localhost:3000/api/students

Body → JSON:

```json
{
  "name": "Devansh Purohit",
  "email": "devansh@example.com",
  "course": "Computer Science"
}
```

## Important

This experiment uses an in-memory JavaScript array instead of a database. Restarting the server resets the student data.

That is intentional for demonstrating Node.js, Express.js, HTTP methods, URL parameters, POST data and EJS templating without introducing a database into the experiment.
