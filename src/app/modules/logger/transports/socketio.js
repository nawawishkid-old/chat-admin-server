import Transport from "winston-transport";
import ioClient from "socket.io-client";

// console.log(app);
const socketClient = ioClient("http://localhost:11112");

export default class SocketIOTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.socket = socketClient;
    this.socketEvent = opts.socketEvent;
  }

  log = (info, callback) => {
    setImmediate(() => this.emit("logged", info));

    this._socketEmit(this.socketEvent, info.message);

    callback();
  };

  _socketEmit = (event, ...data) => {
    if (typeof this.socket === "undefined") {
      console.log("this.socket is undefined");
      return false;
    }

    // console.log("Emitting...");
    // console.log(this.socket);
    return this.socket.emit(event, ...data);
  };
}
