const { getLogger } = require("./utils");
const { LEVEL, LABEL } = require("../../init").get("log app");

module.exports = getLogger(LEVEL, LABEL);
