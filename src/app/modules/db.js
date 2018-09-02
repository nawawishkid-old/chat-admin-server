import mongoose from "mongoose";
import { db as config } from "../config";
import logger from "./logger/index";

mongoose.connect(
  `mongodb://${config.host}:${config.port}/${config.name}`,
  {
    useNewUrlParser: true
  }
);

const db = mongoose.connection;

db.on("error", () => {
  logger.error("Database connection error: ");
});
db.once("open", () => {
  logger.info("Database connected.");
});

export default db;
