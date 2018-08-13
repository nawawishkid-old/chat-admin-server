const server = {
  host: "localhost",
  port: "11112"
};
const db = {
  host: "localhost",
  port: "27017",
  name: "test",
  username: "",
  password: ""
};
const logger = {
  level: "debug"
};

export { server, db, logger };
export default {
  server,
  db,
  logger
};
