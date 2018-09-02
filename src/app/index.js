import "babel-polyfill";
import app from "./app";
// import server from "./modules/server";
// import socketio from "socket.io";
// import io from './modules/io';

// const io = socketio(server.listener);

// app.socket.on("connection", socket => {
//   console.log("SOCKET: ", socket.handshake);
//   socket.on("test", (from, msg) => {
//     console.log(from, msg);
//     socket.emit("test", "The server", "I'm here!");
//   });

//   socket.on("task", data => {
//     console.log("ON SERVER: ", data);
//     socket.broadcast.emit("task_result", data);
//   });
// });

app.server
  .start()
  .then(() => {
    console.log(`Server running at: ${app.server.info.uri}`);
  })
  .catch(err => {
    console.log("Error: ", err.message);
    process.exit(1);
  });
