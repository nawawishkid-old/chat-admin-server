import http from "http";
import httpRouter from "router";
import finalHanlder from "finalhandler";

const router = httpRouter();
const server = http.createServer();

router.get("/", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.end("<h4>Hello, world</h4>");
});

server.on("request", (req, res) => {
  console.log(`${req.method.toUpperCase()} ${req.url}`);
  router(req, res, finalHanlder(req, res));
});

server.listen(11112);
