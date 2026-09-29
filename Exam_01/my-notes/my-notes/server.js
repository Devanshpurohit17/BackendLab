const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

const PORT = 3000;

const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "notes_lab";

const client = new MongoClient(MONGO_URL);

let notesCollection;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

async function startServer() {
    try {
        await client.connect();

        console.log("Connected to MongoDB");

        const db = client.db(DB_NAME);

        notesCollection = db.collection("notes");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

startServer();

app.get("/", async (req, res) => {
    try {
        const search = req.query.search?.trim() || "";

        let query = {};

        if (search !== "") {
            query = {
                title: {
                    $regex: search,
                    $options: "i"
                }
            };
        }

        const notes = await notesCollection
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();

        res.render("index", {
            notes: notes
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading notes");
    }
});

app.get("/notes/new", (req, res) => {
    res.render("new");
});

app.post("/notes", async (req, res) => {
    try {
        const { title, content, category } = req.body;

        if (!title || !content) {
            return res.status(400).send(
                "Title and content are required."
            );
        }

        const newNote = {
            title: title.trim(),
            content: content.trim(),
            category: category ? category.trim() : "General",
            createdAt: new Date()
        };

        await notesCollection.insertOne(newNote);

        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding note");
    }
});

app.post("/notes/:id/delete", async (req, res) => {
    try {
        const id = req.params.id;

        await notesCollection.deleteOne({
            _id: new ObjectId(id)
        });

        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting note");
    }
});