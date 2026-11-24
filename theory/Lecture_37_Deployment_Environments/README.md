# Lecture 37: Deployment environments

## Aim

Read settings and secrets from environment variables.

## Files

- `.env.example`
- `config.js`
- `package.json`
- `server.js`

## How to run

```text
npm install
cp .env.example .env
npm start
```

## Output

```text
GET /health -> 200 {"status":"healthy","environment":"staging"}
GET /config -> 200 {"environment":"staging","apiKeySet":true}
APP_ENV=production without API_KEY -> exits with: API_KEY is required in production
```
