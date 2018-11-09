module.exports = app => {
  const { env } = require("../utils");
  const host = env("CHATADMIN_REDIS_HOST", "127.0.0.1");
  const port = env("CHATADMIN_REDIS_PORT", 6379);
  const password = env("CHATADMIN_REDIS_PASSWORD");
  const options = { host, port };

  if (password) {
    options.password = password;
  }

  // see: https://github.com/NodeRedis/node_redis
  app.set("redis host", host);
  app.set("redis port", port);
  app.set("redis password", password);
  app.set("redis options", options);

  return app;
};
