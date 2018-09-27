exports.create = (...key) => {
  return (req, res, next) => {
    console.log("[MIDDLEWARE]: withRequestBodyFilter");
    const bodyKeys = Object.keys(req.body);

    // Remove unrelated properties.
    bodyKeys.forEach(item => {
      if (key.indexOf(item) < 0) {
        delete req.body[item];
      }
    });

    // Check required properties
    const isInvalid = key.some(item => bodyKeys.indexOf(item) < 0);

    if (isInvalid) {
      res.status(422).json({
        msg: "Invalid argument"
      });
      return;
    }

    next();
  };
};
