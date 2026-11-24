// Task 5: serve the website and a real API
const express = require("express");
const { students } = require("./students.json");

const app = express();
const PORT = process.env.PORT || 3000;
const pages = ["index.html", "jquery1.html", "jquery2.html", "courses.html", "notice.html",
  "app.js", "style.css", "students.json", "students.xml", "courses.json"];

app.get("/api/students", (req, res) => res.json({ students }));
app.get("/", (req, res) => res.sendFile("index.html", { root: __dirname }));
// only the website files are public
app.get("/:file", (req, res, next) => {
  if (!pages.includes(req.params.file)) return next();
  res.sendFile(req.params.file, { root: __dirname });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
