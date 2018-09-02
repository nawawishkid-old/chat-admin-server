import io from "socket.io-client";
import http from "http";
import queryString from "querystring";

const socket = io("http://localhost:11112");

socket.on("test", (from, msg) => {
  console.log(from, msg);
});

socket.emit("test", "The client", "Are you there, server?");

socket.on("task_result", data => {
  console.log("Task: ", data);
});

console.log("Fetching...");

const postData = queryString.stringify({
  fullName: "a abc",
  email: "a@a.com",
  password: "12345"
});

const req = http.request(
  {
    method: "POST",
    host: "localhost",
    port: 11112,
    path: "/v0/vendor/Lazada/method/signup",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData)
    }
  },
  res => {
    // console.log(res);
    res.setEncoding("utf8");
    console.log(res.statusCode);
    console.log(res.headers);
    res.on("data", chunk => {
      console.log("DATA: ", chunk);
    });
  }
);

req.write(postData);
req.on("error", err => console.log(err));
req.end();
// ("localhost:11112/v0/vendor/Lazada/method/signup", {
//   method: "POST"
// }).then(result => console.log("Data fetched!"));
