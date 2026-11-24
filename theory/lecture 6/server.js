const crypto = require("crypto");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax", maxAge: 30 * 60 * 1000 },
}));

// Session: data is kept on the server
app.get("/visits", (req, res) => {
  req.session.visits = (req.session.visits || 0) + 1;
  res.json({ visits: req.session.visits });
});

// Login and logout (demo only: there is no password check here, see Exp 12B)
app.post("/login", (req, res, next) => {
  if (!req.body.username) return res.status(400).json({ error: "username is required" });
  req.session.regenerate((err) => {
    if (err) return next(err);
    req.session.username = req.body.username;
    res.json({ message: "Logged in" });
  });
});
app.get("/profile", (req, res) => {
  if (!req.session.username) return res.status(401).json({ error: "Please log in" });
  res.json({ username: req.session.username });
});
app.post("/logout", (req, res) => req.session.destroy(() => res.json({ message: "Logged out" })));

// Cookie: data is kept in the browser
app.get("/set-cookie", (req, res) => {
  res.cookie("language", "en", { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 1000 });
  res.json({ message: "Cookie set" });
});
app.get("/get-cookie", (req, res) => res.json({ language: req.cookies.language || null }));

// Query string: data is kept in the URL, e.g. /welcome?user=Devansh&role=student
app.get("/welcome", (req, res) => {
  const { user = "Guest", role = "visitor" } = req.query;
  res.json({ message: `Welcome ${user}, your role is ${role}` });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
