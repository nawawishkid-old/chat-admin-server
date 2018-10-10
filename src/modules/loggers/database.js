const { getLogger } = require("./utils");
const { LEVEL, LABEL } = require("../../configs/logger").database;

module.exports = getLogger(LEVEL, LABEL);
