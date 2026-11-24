# Experiment 13A: MongoDB and Mongoose

## Aim

Register and log in users stored in MongoDB. Passwords are hashed with bcrypt.

## Files

- `models/User.js`
- `package.json`
- `server.js`
- `views/home.ejs`
- `views/message.ejs`
- `views/users.ejs`

## How to run

```text
# MongoDB must be running
npm install
npm start
```

## Output

```text
GET / -> 200 (HTML, 732 chars)
POST /signup -> 201 (HTML, 183 chars)
POST /signup -> 409 (HTML, 182 chars)
POST /signup -> 400 (HTML, 173 chars)
POST /login -> 200 (HTML, 195 chars)
POST /login -> 401 (HTML, 178 chars)
POST /login -> 401 (HTML, 178 chars)
GET /users -> 200 (HTML, 256 chars)
```
