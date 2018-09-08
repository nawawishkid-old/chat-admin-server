export default (...key) => {
  return (req, res, next) => {
    console.log("filterRequestBody()");
    const bodyKeys = Object.keys(req.body);

    bodyKeys.forEach(item => {
      // If the body prop's key is not in the given list, remove them from the body.
      if (key.indexOf(item) < 0) {
        delete req.body[item];
      }
    });

    next();
  };
};
