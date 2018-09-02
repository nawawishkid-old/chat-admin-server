import winston, { format } from "winston";
import { logger as config } from "~/src/app/config";
// import socketIOTransport from "./transports/socketio";

const logger = winston.createLogger({
  level: config.pipeline.level,
  format: format.combine(
    format.colorize(),
    format.label({ label: config.pipeline.label }),
    format.printf(info => {
      return `[${info.label}] ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
    // new socketIOTransport({
    //   socketEvent: "pipeline"
    // })
  ]
});

export default logger;
