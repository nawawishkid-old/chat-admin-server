module.exports = app => {
  const { env } = require("../utils");

	// see: https://github.com/NodeRedis/node_redis
  app.set("redis host", env("CHATADMIN_REDIS_HOST", "127.0.0.1"));
  app.set("redis port", env("CHATADMIN_REDIS_PORT", 6379));

  return app;
};
