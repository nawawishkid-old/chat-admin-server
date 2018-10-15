const { getLogger } = require("./utils");
const { LEVEL, LABEL } = require("../../init").get("log middleware");

module.exports = getLogger(LEVEL, LABEL);
