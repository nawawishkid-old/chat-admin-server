import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method.toUpperCase()} ${req.path}`);
  next();
});
// app.options("/token", (req, res) => {
//   console.log("This is options!");
//   res.json({
//     msg: "This is options!"
//   });
// });

app.use((req, res, next) => {
  // console.log("set header!");
  res.set({
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*"
  });
  next();
});
app.use("/", routes.token);
app.use("/api/selenium", routes.api.selenium);
app.use("/api/template", routes.api.template);

export default app;
