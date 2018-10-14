const should = require("chai").should();
const httpMocks = require("node-mocks-http");
const prefix = "[CONTROLLER] ";
const makeRequest = (options = null) => httpMocks.createRequest(options);
const makeResponse = (options = null) => httpMocks.createResponse(options);
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
/**
 * Mocked logger
 */
// const emptyFunc = () => {};
// const logger = {
//   info: emptyFunc,
//   warn: emptyFunc,
//   debug: emptyFunc,
//   error: emptyFunc,
//   verbose: emptyFunc
// };

const db = {
  connect: async () => {
    const db = require("../../src/modules/database");

    return await db.connect({
      host: "localhost",
      port: 27017,
      username: "root",
      password: "mongodb181409943",
      name: "chatadmin_test",
      authSrc: "admin"
    })();
  },
  disconnect: () => {
    require("mongoose").disconnect();
  }
};

module.exports = Object.freeze({
  should,
  prefix,
  next,
  getBody,
  makeRequest,
  makeResponse,
  db
  // logger
});
