import config from "./config";
import server from "./modules/server";
// import db from "./modules/db";
import logger from "./modules/logger/index";
import socketio from "socket.io";

const app = {};

// Configurations
app.config = config;

// Logging
app.logger = logger;

// Server
app.server = server;

app.socket = socketio(server.listener);

// Database
// app.db = () => {
//   const config = app.config.database;
//   const db = mongoose.connect(
//     `mongodb://${config.host}:${config.port}/${config.name}`
//   );

//   db.on("error", () => {
//     app.logger.error("Database connection error: ");
//   });
//   db.once("open", () => {
//     app.logger.info("Database connected.");
//   });

//   return db;
// };

// console.log("~/src/app/app: ", app);

export default app;
