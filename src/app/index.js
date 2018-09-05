import "babel-polyfill";
import app from "./app";
import config from "./config";

app.listen(config.server.port, config.server.host, () => {
  console.log(
    `Server listening at ${config.server.host}:${config.server.port}`
  );
});
