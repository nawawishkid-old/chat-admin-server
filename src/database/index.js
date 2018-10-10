const mongoose = require("mongoose");
const { HOST, PORT, NAME, USERNAME, PASSWORD } = require("../configs").db;

exports.connect = () => {
  console.log("db.connect()");
  const { readyState } = mongoose.connection;
  // If already connected.
  if (readyState > 0 && readyState < 3) {
    console.log("db already connected.");
    return;
  }

  mongoose.set("debug", true);

  mongoose.connect(
    `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${NAME}`,
    {
      useNewUrlParser: true
    }
  );

  const db = mongoose.connection;

  db.on("error", err => {
    console.log("Database connection error: " + err);
    console.log(mongoose.connection.readyState);
  });
  db.once("open", () => {
    console.log("Database connected.");
    console.log(mongoose.connection.readyState);
  });

  return db;
};
