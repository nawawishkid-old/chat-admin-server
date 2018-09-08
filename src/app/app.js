import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/auth";
import apiRoutes from "./routes/api/index";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method.toUpperCase()} ${req.path}`);
  next();
});

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*"
  });
  next();
});

// app.use("/api/selenium", routes.api.selenium);
app.use("/api/template/input", apiRoutes.templateInput);
app.use("/api/template", apiRoutes.template);
app.use("/api/user", apiRoutes.user);
app.use("/auth", authRoute);

export default app;
