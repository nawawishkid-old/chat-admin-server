const { getLogger } = require("./utils");
const { LEVEL, LABEL } = require("../../init").get("log database");

module.exports = getLogger(LEVEL, LABEL);
