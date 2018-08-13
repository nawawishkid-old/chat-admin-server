import mongoose from "mongoose";

mongoose.connect(
  "mongodb://localhost:27017/test",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

console.log(db.readyState);
db.on("error", console.error.bind(console, "Database connection error: "));
db.once("open", () => {
  console.log("Database connected.");
  console.log(db.readyState);
});
