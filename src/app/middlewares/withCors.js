module.exports = (req, res, next) => {
  console.log("[MIDDLEWARE]: withCors");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*"
  };

  Object.keys(headers).forEach(key =>
    console.log("- " + key + ": " + headers[key])
  );

  res.set(headers);

	console.log("- next...");

  next();
};
