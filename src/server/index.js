import "babel-polyfill";
import http from "http";
import httpRouter from "router";
import finalHanlder from "finalhandler";
import signup from "~/src/api/Lazada/signup";
import { parse } from "querystring";
import driver from "~/src/drivers/index";

const router = httpRouter();
const server = http.createServer();

router.get("/", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.end("<h4>Hello, world</h4>");
});
router.post("/Lazada/signup", (req, res) => {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = parse(body);
    console.log("raw: ", body);
    console.log(data);
    console.log("typeof: ", typeof data);
    const pipeline = signup(
      driver,
      "https://member.lazada.co.th/user/register",
      {
        fullName: data.fullName,
        email: data.email,
        password: data.password
      }
    );

    pipeline
      .perform()
      .then(result => {
        console.log("SUCCESS!");
        res.end("ok");
      })
      .catch(err => console.log(err.message));
  });

  // console.log(req);
});

server.on("request", (req, res) => {
  console.log(`${req.method.toUpperCase()} ${req.url}`);
  router(req, res, finalHanlder(req, res));
});

server.listen(11112);
