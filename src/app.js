const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { withAuth, withLogger, withCors, setBaseUrl } = require("./middlewares");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setBaseUrl);
app.use(withLogger);
app.use(withCors);

app.use("/api/template/parser", routes.templateParser);
app.use("/api/template/input", routes.templateInput);
app.use("/api/template", routes.template);
app.use("/api/users", routes.user);
app.use("/auth", routes.auth);

module.exports = app;
