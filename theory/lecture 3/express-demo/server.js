const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const students = [
  { id: 1, name: "Aarav", branch: "CSE" },
  { id: 2, name: "Diya", branch: "ECE" },
  { id: 3, name: "Rohan", branch: "CSE" },
];

app.get("/", (req, res) => res.send("Welcome to the Student Management API"));
app.get("/students", (req, res) => res.json(students));

// Lab exercise: students of one branch
app.get("/students/branch/:branch", (req, res) => {
  const branch = req.params.branch.toUpperCase();
  res.json(students.filter((s) => s.branch === branch));
});

app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

app.get("/html", (req, res) => res.send("<h1>Student Portal</h1><p>This is an HTML response.</p>"));
app.get("/page", (req, res) => res.render("students", { students }));

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
