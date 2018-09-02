import winston, { format } from "winston";
import { logger as config } from "~/src/app/config";

const logger = winston.createLogger({
  level: config.app.level,
  format: format.combine(
    format.colorize(),
    format.label({ label: config.app.label }),
    format.printf(info => {
      return `[${info.label}] ${info.level}: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

export default logger;
