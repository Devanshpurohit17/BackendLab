# Lecture 8: Server-side rendering

## Aim

Render pages with EJS and Jinja2 and serve static files.

## Files

- `express-ejs/package.json`
- `express-ejs/public/style.css`
- `express-ejs/server.js`
- `express-ejs/views/about.ejs`
- `express-ejs/views/students.ejs`
- `fastapi-jinja/main.py`
- `fastapi-jinja/requirements.txt`
- `fastapi-jinja/static/images/server.svg`
- `fastapi-jinja/templates/index.html`

## How to run

```text
cd express-ejs
npm install
npm start
# FastAPI
cd fastapi-jinja
pip install -r requirements.txt
uvicorn main:app --reload
```

## Output

```text
GET / -> 200 (HTML, 491 chars)
GET /about -> 200 (HTML, 243 chars)
GET /style.css -> 200 (HTML, 182 chars)
GET / -> 200 (HTML, 251 chars)
GET /static/images/server.svg -> 200 (HTML, 279 chars)
```
