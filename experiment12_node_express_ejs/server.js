const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// ---------- Middleware ----------
app.use(express.urlencoded({ extended: true })); // Read HTML form POST data
app.use(express.json());                         // Read JSON request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve CSS/static files

// ---------- EJS configuration ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------- Sample in-memory data ----------
let students = [
    { id: 1, name: "Aarav Sharma", email: "aarav@example.com", course: "Computer Science" },
    { id: 2, name: "Meera Singh", email: "meera@example.com", course: "Artificial Intelligence" },
    { id: 3, name: "Kabir Verma", email: "kabir@example.com", course: "Data Science" }
];

// ============================================================
// EJS WEB ROUTES
// ============================================================

// Home page
app.get("/", (req, res) => {
    res.render("index", {
        title: "Experiment 12",
        students,
        message: null
    });
});

// Students page
app.get("/students", (req, res) => {
    res.render("students", {
        title: "Student Directory",
        students
    });
});

// URL parameter example: /student/2
app.get("/student/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).send("Student not found.");
    }

    res.render("student", {
        title: student.name,
        student
    });
});

// POST form example
app.post("/students", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).send("Name, email and course are required.");
    }

    const newStudent = {
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name: name.trim(),
        email: email.trim(),
        course: course.trim()
    };

    students.push(newStudent);
    res.redirect("/students");
});

// ============================================================
// REST API ROUTES
// ============================================================

// GET /api/students
app.get("/api/students", (req, res) => {
    res.json({
        success: true,
        count: students.length,
        data: students
    });
});

// GET /api/students/:id
app.get("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.json({
        success: true,
        data: student
    });
});

// POST /api/students
app.post("/api/students", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            success: false,
            message: "name, email and course are required"
        });
    }

    const newStudent = {
        id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name: String(name).trim(),
        email: String(email).trim(),
        course: String(course).trim()
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
});

// DELETE /api/students/:id
app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const oldLength = students.length;

    students = students.filter(s => s.id !== id);

    if (students.length === oldLength) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.json({
        success: true,
        message: "Student deleted successfully"
    });
});

// ---------- 404 handler ----------
app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});

// ---------- Start server ----------
app.listen(PORT, () => {
    console.log(`Experiment 12 server running at http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/students`);
});