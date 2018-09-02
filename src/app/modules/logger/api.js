import winston, { format } from "winston";
import { logger as config } from "~/src/app/config";

const logger = winston.createLogger({
  level: config.api.level,
  format: format.combine(
    format.colorize(),
    format.label({ label: config.api.label }),
    format.printf(info => {
      return `[${info.label}] ${info.level}: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

export default logger;
