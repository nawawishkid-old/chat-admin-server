exports.server = {
	host: process.env.CHATADMIN_SERVER_HOST || "0.0.0.0",
  port: process.env.CHATADMIN_SERVER_PORT || 11112
};

exports.db = {
  host: process.env.CHATADMIN_DATABASE_HOST || "localhost",
  port: process.env.CHATADMIN_DATABASE_PORT || "27017",
  name: process.env.CHATADMIN_DATABASE_NAME || "test",
  username: process.env.CHATADMIN_DATABASE_USERNAME || "admin",
  password: process.env.CHATADMIN_DATABASE_PASSWORD || "adminAtTest"
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
