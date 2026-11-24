const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/userdb";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// show a message page
const message = (res, status, text) => res.status(status).render("message", { text });

app.get("/", (req, res) => res.render("home"));

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return message(res, 400, "All fields are required");
  try {
    await User.create({ username, email, password: await bcrypt.hash(password, 10) });
    message(res, 201, `User ${username} registered successfully`);
  } catch (error) {
    if (error.code === 11000) return message(res, 409, "Username or email already exists");
    message(res, 500, "Could not register the user");
  }
});

app.post("/login", async (req, res) => {
  const { username = "", password = "" } = req.body;
  const user = await User.findOne({ username: String(username) });
  if (!user || !(await bcrypt.compare(String(password), user.password))) {
    return message(res, 401, "Invalid username or password");
  }
  message(res, 200, `Welcome back, ${user.username}! Joined on ${user.createdAt.toDateString()}`);
});

app.get("/users", async (req, res) => {
  const users = await User.find().select("-password").sort("username");
  res.render("users", { users });
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
