module.exports = (req, res, next) => {
  console.log("[MIDDLEWARE]: connectDB");

  const db = require("../database");

  db.connect();

  console.log("- next...");

  next();
};
