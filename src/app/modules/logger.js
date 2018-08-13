import winston, { format } from "winston";
import { logger as config } from "../config";

const logger = winston.createLogger({
  level: config.level,
  format: format.combine(
    format.colorize(),
    format.label({ label: "App" }),
    format.printf(info => {
      return `[${info.label}] ${info.level}: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

export default logger;
