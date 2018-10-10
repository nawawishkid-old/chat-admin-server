const { getLogger } = require("./utils");
const { LEVEL, LABEL } = require("../../configs/logger").app;

module.exports = getLogger(LEVEL, LABEL);
