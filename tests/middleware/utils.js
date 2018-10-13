const should = require("chai").should();
const prefix = "[MIDDLEWARE] ";
/**
 * Mock express' middleware next callback
 *
 * @param {Object} obj Any object with isNext property to be altered
 */
const next = obj => () => {
  obj.isNext = true;
};
const getBody = res => {
  const data = res._getData();

  return data ? JSON.parse(data) : {};
};

module.exports = Object.freeze({ should, prefix, next, getBody });
