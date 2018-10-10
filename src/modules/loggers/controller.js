const { getLogger } = require("./utils");
const { LEVEL, LABEL } = require("../../configs/logger").controller;

module.exports = getLogger(LEVEL, LABEL);
