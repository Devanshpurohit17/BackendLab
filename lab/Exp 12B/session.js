const crypto = require("crypto");
const session = require("express-session");

// Without SESSION_SECRET a random secret is used, so sessions end on restart.
module.exports = session({
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax" }, // no maxAge: ends with the browser
});
