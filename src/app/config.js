exports.server = {
  host: "localhost",
  port: "11112"
};

exports.db = {
  host: "localhost",
  port: "27017",
  name: "test",
  username: "admin",
  password: "adminAtTest"
};

exports.logger = {
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

exports.SECRET_KEY = "secretKey";
exports.ACCESS_TOKEN_LIFESPAN = 60 * 60;
exports.REFRESH_TOKEN_LIFESPAN = 60 * 30;
