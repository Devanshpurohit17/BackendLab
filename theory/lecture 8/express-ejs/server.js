const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const students = [
  { id: 1, name: "Aarav", branch: "CSE" },
  { id: 2, name: "Diya", branch: "ECE" },
  { id: 3, name: "Rohan", branch: "IT" },
];

app.get("/", (req, res) => res.render("students", { students }));
app.get("/about", (req, res) =>
  res.render("about", { course: "Backend Development", lecturer: "Dr. Prateek Raj Gautam" }));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
