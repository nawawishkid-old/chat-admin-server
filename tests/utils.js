const httpMocks = require("node-mocks-http");

exports.should = require("chai").should();
exports.makeRequest = (options = null) => httpMocks.createRequest(options);
exports.makeResponse = (options = null) => httpMocks.createResponse(options);
exports.models = require("./models");

/**
 * Mock express' middleware next callback
 *
 * @param {Object} obj Any object with isNext property to be altered
 */
exports.next = obj => () => {
  obj.isNext = true;
};
exports.getBody = res => {
  const data = res._getData();

  return data ? JSON.parse(data) : {};
};
exports.db = {
  connect: async () => {
    const db = require("../src/modules/database");

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
