# Lecture 39: Docker practical

## Aim

Containerize the same Student API in FastAPI and Express.

## Files

- `express-app/.dockerignore`
- `express-app/Dockerfile`
- `express-app/package.json`
- `express-app/server.js`
- `fastapi-app/.dockerignore`
- `fastapi-app/Dockerfile`
- `fastapi-app/main.py`
- `fastapi-app/requirements.txt`

## How to run

```text
docker build -t student-api-fastapi:1.0 fastapi-app
docker run -d --name student-fastapi -p 8000:8000 student-api-fastapi:1.0
docker build -t student-api-express:1.0 express-app
docker run -d --name student-express -p 3000:3000 student-api-express:1.0
```

## Output

The Docker output has not been recorded yet.

## Test commands

```text
curl http://localhost:8000/health
curl http://localhost:8000/students
curl http://localhost:3000/health
curl http://localhost:3000/students
```

## Common problem and solution

If the API is unreachable, the server may be bound to `127.0.0.1`. Inside a container it must listen on `0.0.0.0`.
