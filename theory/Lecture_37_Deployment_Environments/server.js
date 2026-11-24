const express = require("express");
const config = require("./config");
const app = express();

app.get("/health", (req, res) => res.json({ status: "healthy", environment: config.env }));

// shows whether the key exists, but never the key itself
app.get("/config", (req, res) => res.json({ environment: config.env, apiKeySet: Boolean(config.apiKey) }));

app.listen(config.port, () => console.log(`${config.env} server on port ${config.port}`));
