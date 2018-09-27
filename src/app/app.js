const express = require("express");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const apiRoutes = require("./routes/api/index");
const {
  withAuth,
  withCreatorId,
  withLogger,
  withCors
} = require("./middlewares");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(withLogger);
// app.use(withCors);

// app.use("/api/selenium", routes.api.selenium);
app.use("/api/template/parser", withAuth, apiRoutes.templateParser);
app.use(
  "/api/template/input",
  withAuth,
  withCreatorId,
  apiRoutes.templateInput
);
app.use("/api/template", apiRoutes.template);
app.use("/api/users", withAuth, apiRoutes.user);
app.use("/auth", authRoute);

module.exports = app;
