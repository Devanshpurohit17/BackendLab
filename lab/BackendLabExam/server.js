// Exam 01 A: My Notes
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const client = new MongoClient(process.env.MONGO_URL || "mongodb://127.0.0.1:27017");
const notes = client.db(process.env.DB_NAME || "notes_lab").collection("notes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Express 4 needs this to pass async errors to the error handler
const wrap = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.get("/", (req, res) => res.redirect("/notes"));

app.get("/notes", wrap(async (req, res) => {
  const category = String(req.query.category || ""); // bonus: filter by category
  const filter = category ? { category } : {};
  const list = await notes.find(filter).sort({ createdAt: -1 }).toArray();
  const categories = await notes.distinct("category");
  res.render("index", { notes: list, categories, category });
}));

app.get("/notes/new", (req, res) => res.render("new", { error: null, note: {} }));

app.post("/notes", wrap(async (req, res) => {
  const title = String(req.body.title || "").trim();
  const content = String(req.body.content || "").trim();
  const category = String(req.body.category || "").trim() || "General";
  if (!title || !content) {
    return res.status(400).render("new", {
      error: "Title and content are required",
      note: { title, content, category },
    });
  }
  await notes.insertOne({ title, content, category, createdAt: new Date() });
  res.redirect("/notes");
}));

app.post("/notes/:id/delete", wrap(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("Invalid note id");
  await notes.deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect("/notes");
}));

app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).send("Something went wrong");
});

client
  .connect()
  .then(() => app.listen(PORT, () => console.log(`My Notes at http://localhost:${PORT}`)))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
