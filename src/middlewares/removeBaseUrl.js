module.exports = BASE_URL => (req, res, next) => {
  if (req.url === "/") {
    next();

    return;
  }

  let baseUrl = BASE_URL || "";
  // Original length before stripping trailing slash
  const baseUrlOriginalLength = baseUrl.length;
  const hasTrailingSlash = url => url.slice(-1) === "/";
  const stripTrailingSlash = url => url.slice(0, -1);
  const hasBaseUrl = (url, baseUrl) => url.slice(0, baseUrl.length) === baseUrl;
  const removeBaseUrl = (url, baseUrl) => url.slice(baseUrlOriginalLength);

  if (hasTrailingSlash(baseUrl)) {
    baseUrl = stripTrailingSlash(baseUrl);
  }

  if (hasTrailingSlash(req.url)) {
    req.url = stripTrailingSlash(req.url);
  }

  if (hasBaseUrl(req.url, baseUrl)) {
    req.url = removeBaseUrl(req.url, baseUrl);
  }

  // Prevent empty request url for... ... I don't know
  if (req.url === "") {
    req.url = "/";
  }

  next();
};
