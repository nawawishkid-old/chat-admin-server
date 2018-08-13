import winston, { format } from "winston";

const myFormat = format.printf(info => {
  return `[${info.label}] ${info.level}: ${info.message}`;
});

export default winston.createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    // format.timestamp(),
    format.label({ label: "Pipeline" }),
    myFormat
  ),
  transports: [new winston.transports.Console()]
});
