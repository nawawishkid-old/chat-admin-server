export const server = {
  host: "localhost",
  port: "11112"
};

export const db = {
  host: "localhost",
  port: "27017",
  name: "test",
  username: "admin",
  password: "adminAtTest"
};

export const logger = {
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

export const SECRET_KEY = "secretKey";
export const ACCESS_TOKEN_LIFESPAN = 60 * 60;
export const REFRESH_TOKEN_LIFESPAN = 60 * 30;

export default {
  server,
  db,
  logger,
  SECRET_KEY
};
