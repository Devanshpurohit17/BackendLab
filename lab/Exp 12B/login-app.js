// Exercise 1: login system using sessions
const express = require("express");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const users = []; // in memory, cleared when the server restarts

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(require("./session"));

function requireLogin(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

app.get("/", (req, res) => res.redirect("/dashboard"));
app.get("/register", (req, res) => res.render("auth", { title: "Register", action: "/register", error: null }));
app.get("/login", (req, res) => res.render("auth", { title: "Login", action: "/login", error: null }));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const fail = (error) => res.status(400).render("auth", { title: "Register", action: "/register", error });
  if (!username || !password) return fail("Username and password are required");
  if (users.some((u) => u.username === username)) return fail("Username already exists");
  users.push({ username, password: await bcrypt.hash(password, 10) });
  res.redirect("/login");
});

app.post("/login", async (req, res, next) => {
  const { username, password = "" } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).render("auth", { title: "Login", action: "/login", error: "Invalid username or password" });
  }
  // a new session id after login prevents session fixation
  req.session.regenerate((err) => {
    if (err) return next(err);
    req.session.user = { username };
    res.redirect("/dashboard");
  });
});

app.get("/dashboard", requireLogin, (req, res) => res.render("dashboard", { user: req.session.user }));
app.post("/logout", (req, res) => req.session.destroy(() => res.redirect("/login")));

app.listen(PORT, () => console.log(`Login app at http://localhost:${PORT}`));
