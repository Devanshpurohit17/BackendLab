const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const me = { name: "Devansh Purohit", rollNumber: "590017030", branch: "CSE" };
const students = [
  { id: 1, name: "Aarav", course: "CSE" },
  { id: 2, name: "Diya", course: "IT" },
];
const timetable = [
  { day: "Monday", time: "10:00", subject: "Backend Development", faculty: "Faculty A" },
  { day: "Tuesday", time: "11:00", subject: "Operating Systems", faculty: "Faculty B" },
  { day: "Wednesday", time: "09:00", subject: "Cryptography", faculty: "Faculty C" },
];

app.get("/", (req, res) => res.render("index"));

// Task 1: text, HTML and JSON responses
app.get("/text", (req, res) => res.type("text").send(`${me.name}, ${me.rollNumber}, ${me.branch}`));
app.get("/html", (req, res) => res.send(`<h1>${me.name}</h1><p>${me.rollNumber} - ${me.branch}</p>`));
app.get("/json", (req, res) => res.json(me));

// Task 2: calculator, e.g. /calculate?op=add&a=5&b=3
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  modulus: (a, b) => a % b,
  power: (a, b) => a ** b,
};

app.get("/calculate", (req, res) => {
  const { op, a, b } = req.query;
  const x = Number(a);
  const y = Number(b);
  if (!Object.hasOwn(operations, op)) return res.status(400).json({ error: "Unknown operation" });
  if (!a || !b || Number.isNaN(x) || Number.isNaN(y)) {
    return res.status(400).json({ error: "a and b must be numbers" });
  }
  if ((op === "divide" || op === "modulus") && y === 0) {
    return res.status(400).json({ error: "Cannot divide by zero" });
  }
  res.json({ op, a: x, b: y, result: operations[op](x, y) });
});

// Task 3: student management
app.get("/students", (req, res) => res.json(students));

app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

app.post("/students/add", (req, res) => {
  const { name, course } = req.body;
  if (!name || !course) return res.status(400).json({ error: "name and course are required" });
  const student = { id: students.length + 1, name, course };
  students.push(student);
  res.status(201).json(student);
});

// Task 4: timetable using EJS
app.get("/timetable", (req, res) => res.render("timetable", { timetable }));

// Task 5: form handling
app.get("/register", (req, res) => res.render("register", { error: null }));

app.post("/register", (req, res) => {
  const { name, email, course, semester } = req.body;
  if (!name || !email || !course || !semester) {
    return res.status(400).render("register", { error: "All fields are required" });
  }
  res.render("result", { name, email, course, semester });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
