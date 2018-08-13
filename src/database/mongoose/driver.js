import mongoose from "mongoose";

const dbDriver = () => {
  const db = mongoose.connect("mongodb://localhost:27017/test");

  db.on("error", console.error.bind(console, "Database connection error: "));
  db.once("open", () => {
    console.log("Database connected.");
  });

  return db;
};

export default dbDriver;
