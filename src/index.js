// require("babel-polyfill");
const app = require("./app");
const { HOST, PORT } = require("./configs").app;

app.listen(PORT, HOST, () => {
  console.log(
    `Server listening at ${HOST}:${PORT}`
  );
});
