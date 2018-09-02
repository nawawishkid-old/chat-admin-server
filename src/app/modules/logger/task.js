import winston, { format } from "winston";
import { logger as config } from "~/src/app/config";
import socketIOTransport from "./transports/socketio";
// import app from "~/src/app/app";
// import io from "~/src/app/modules/io";

// console.log(app);

const logger = winston.createLogger({
  level: config.task.level,
  format: format.combine(
    format.colorize(),
    format.label({ label: config.task.label }),
    format.printf(info => {
      return `[${info.label}] ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new socketIOTransport({
      socketEvent: "task"
    })
  ]
});

logger.toJSON = () => "[Winston logger]";

export default logger;
