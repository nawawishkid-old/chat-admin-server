const { BASE_URL } = require("../configs").app;

module.exports = (req, res, next) => {
  console.log("[MIDDLEWARE] setBaseUrl");

  console.log("- original URL: ", req.url);
  console.log("- baseUrl: ", BASE_URL);

  let baseUrl = BASE_URL || "";

  req.url = req.url.slice(-1) === "/" ? req.url.slice(0, -1) : req.url;
  req.url =
    req.url.slice(0, baseUrl.length) === baseUrl
      ? req.url.slice(baseUrl.length)
      : req.url;

  console.log("- set URL: ", req.url);

  next();
};
