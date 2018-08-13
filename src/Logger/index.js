import winston, { format } from "winston";

// const { combine, printf } = format;
const myFormat = format.printf(info => {
  return `[${info.label}] ${info.level}: ${info.message}`;
});

export default winston.createLogger({
  level: "debug",
  // format: winston.format.simple(),
  format: format.combine(
    format.colorize(),
    // format.timestamp(),
    format.label({ label: "Task" }),
    myFormat
  ),
  transports: [new winston.transports.Console()]
});
