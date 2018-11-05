require("dotenv").config();

const app = require("./app");
const HOST = app.get("host");
const PORT = app.get("port");

const server = app.listen(PORT, HOST, () => {
  console.log(
    `Server listening at ${HOST}:${PORT} in ${app.get("env")} environment...\n`
  );
});

exports.app = app;
exports.server = server;