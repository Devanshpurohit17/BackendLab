// Exercise 2: to-do list stored per session, theme stored in a cookie
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require("./session"));
app.use((req, res, next) => {
  if (!req.session.todos) req.session.todos = [];
  next();
});

app.get("/", (req, res) => {
  const theme = req.cookies.theme === "dark" ? "dark" : "light";
  res.render("todo", { todos: req.session.todos, theme });
});

app.post("/add", (req, res) => {
  const item = (req.body.todoItem || "").trim();
  if (item) req.session.todos.push(item);
  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  const index = Number(req.params.index);
  req.session.todos = req.session.todos.filter((item, i) => i !== index);
  res.redirect("/");
});

app.post("/theme", (req, res) => {
  const theme = req.cookies.theme === "dark" ? "light" : "dark";
  res.cookie("theme", theme, { maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "lax" });
  res.redirect("/");
});

app.listen(PORT, () => console.log(`To-do app at http://localhost:${PORT}`));
