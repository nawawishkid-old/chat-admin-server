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
  app: {
    level: "debug",
    label: "App"
  },
  api: {
    level: "debug",
    label: "API"
  },
  pipeline: {
    level: "debug",
    label: "Pipeline"
  },
  task: {
    level: "debug",
    label: "Task"
  },
  Page: {
    level: "debug",
    label: "Page"
  }
};

export { server, db, logger };
export default {
  server,
  db,
  logger
};
