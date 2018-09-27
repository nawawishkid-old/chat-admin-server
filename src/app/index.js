// require("babel-polyfill");
const app = require("./app");
const config = require("./config");

app.listen(config.server.port, config.server.host, () => {
  console.log(
    `Server listening at ${config.server.host}:${config.server.port}`
  );
});
