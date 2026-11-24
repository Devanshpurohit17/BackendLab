require("dotenv").config({ quiet: true });

const allowed = ["development", "staging", "production"];
const config = {
  port: Number(process.env.PORT) || 3000,
  env: process.env.APP_ENV || "development",
  apiKey: process.env.API_KEY,
};

if (!allowed.includes(config.env)) throw new Error("APP_ENV must be one of: " + allowed.join(", "));
// stop early when production has no secret
if (config.env === "production" && !config.apiKey) throw new Error("API_KEY is required in production");

module.exports = config;
