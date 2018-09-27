exports.getTokenFromHttpHeader = authHeader => {
  console.log("authHeader: ", authHeader);
  if (typeof authHeader === "undefined") {
    return null;
  }

  // "Bearer <token>"
  return authHeader.split(" ")[1];
};
