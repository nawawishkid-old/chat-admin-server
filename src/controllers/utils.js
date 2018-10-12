/**
 * HTTP response helper for determining whether server should responds with json data or not
 *
 * @param {Object} res Express's Response object
 * @param {integer} status HTTP status code
 * @param {Object} json JSON object
 */
exports.end = (res, status, json) => {
  res.status(status);

  if (Object.keys(json).length > 0) {
    res.json(json);

    return;
  }

  res.end();
};
