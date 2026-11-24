const os = require("os");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
let visits = 0;

app.get("/", (req, res) => {
  visits += 1;
  // inside Docker the host name is the container id
  res.json({ message: "Hello from Express in Docker", container: os.hostname(), visits });
});
app.get("/health", (req, res) => res.json({ status: "healthy" }));

const server = app.listen(port, "0.0.0.0", () => console.log("Listening on port " + port));

// docker stop sends SIGTERM
process.on("SIGTERM", () => server.close(() => process.exit(0)));
