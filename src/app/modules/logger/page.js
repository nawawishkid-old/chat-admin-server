import winston, { format } from "winston";
import { logger as config } from "~/src/app/config";

const logger = winston.createLogger({
  level: config.Page.level,
  format: format.combine(
    format.colorize(),
    format.label({ label: config.Page.label }),
    format.printf(info => {
      return `[${info.label}] ${info.level}: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()]
});

logger.toJSON = () => "[Winston logger]";

export default logger;
