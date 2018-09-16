import mongoose from "mongoose";
import { db as config } from "~/src/app/config";

export default {
  connect: () => {
    console.log("db.connect()");
    const { readyState } = mongoose.connection;
    // If already connected.
    if (readyState > 0 && readyState < 3) {
      console.log("db already connected.");
      return;
    }

    mongoose.set("debug", true);

    mongoose.connect(
      `mongodb://${config.username}:${config.password}@${config.host}:${
        config.port
      }/${config.name}`,
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
  }
};
