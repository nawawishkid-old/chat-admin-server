const express = require("express");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const apiRoutes = require("./routes/api/index");
const { withAuth, withLogger, withCors, setBaseUrl } = require("./middlewares");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setBaseUrl);
app.use(withLogger);
app.use(withCors);

app.use("/api/template/parser", apiRoutes.templateParser);
app.use("/api/template/input", apiRoutes.templateInput);
app.use("/api/template", apiRoutes.template);
app.use("/api/users", apiRoutes.user);
app.use("/auth", authRoute);

module.exports = app;
