/**
 * Set default value of environment variable or validate it.
 *
 * @param {string} varName Environment variable name.
 * @param {*} fallback Default value. It could be callback function that validate the variable.
 * @param {Object} options Options that control this function's behavior
 * @return {*}
 */
exports.env = (varName, fallback = "", options = {}) => {
  const variable = process.env[varName];
  const defaultValue =
    typeof fallback === "function" ? fallback(variable) : fallback;

  if (options.override) {
    return defaultValue;
  }

  return variable || defaultValue;
};
