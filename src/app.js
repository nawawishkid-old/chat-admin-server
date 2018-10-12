/**
 * Only server instantiation file should import this 'app' module.
 * 
 * If you want to configure Express instance before serving, use 'init' module instead.
 */

const app = require("./init");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { withAuth, withLogger, withCors, setBaseUrl } = require("./middlewares");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setBaseUrl);
app.use(withLogger);
app.use(withCors);

// Must change API resource name to be plural
app.use("/api/template/parser", routes.templateParser);
app.use("/api/template/input", routes.templateInput);
app.use("/api/template", routes.template);
app.use("/api/users", routes.user);
app.use("/auth", routes.auth);

module.exports = app;
