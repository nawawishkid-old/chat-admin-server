/**
 * Remove unrelated request body property
 * and check if it has all required properties
 */
module.exports = (...requiredKeys) => (req, res, next) => {
  const bodyPropKeys = Object.keys(req.body);
  const missedProps = [];

  // Remove unrelated properties.
  bodyPropKeys.forEach(item => {
    if (requiredKeys.indexOf(item) < 0) {
      delete req.body[item];
    }
  });

  // Check required properties
  requiredKeys.forEach(key => {
    if (bodyPropKeys.indexOf(key) < 0) {
      missedProps.push(key);
    }
  });

  if (missedProps.length > 0) {
    const msg = "Not enough data, required " + missedProps.join(",");

    res.status(422).json({
      msg,
      required: missedProps
    });

    return;
  }

  next();
};
