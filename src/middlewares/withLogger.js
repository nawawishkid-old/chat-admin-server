module.exports = (req, res, next) => {
  console.log("[MIDDLEWARE]: withLogger");
  console.log(`- ${req.method.toUpperCase()} ${req.path}`);
  console.log("- req.body: ", req.body);
  console.log("- next...");

  next();
};
