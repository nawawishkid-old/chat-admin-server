import Transport from "winston-transport";
import http from "http";

export default class HttpResponseTransport extends Transport {
  constructor(opts) {
    super(opts);
    // Do something with `opts` here!
  }

  log = (level, message) => {
    // http
  };
}
