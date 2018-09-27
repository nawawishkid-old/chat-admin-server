module.exports = (req, res, next) => {
  console.log(`${req.method.toUpperCase()} ${req.path}`);
  console.log("req.body: ", req.body);
  next();
};
