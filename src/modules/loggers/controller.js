const { getLogger } = require("./utils");
const { LEVEL, LABEL } = require("../../init").get("log controller");

module.exports = getLogger(LEVEL, LABEL);
