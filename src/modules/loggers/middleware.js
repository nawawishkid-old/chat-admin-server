const { getLogger } = require("./utils");
const { LEVEL, LABEL } = require("../../configs/logger").middleware;

module.exports = getLogger(LEVEL, LABEL);
