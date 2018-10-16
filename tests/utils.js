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
  const result = data ? JSON.parse(data) : {};

  return result;
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
  },
  reset: async () => {
    const user = require("../src/models/User").remove({});
    const template = require("../src/models/Template").remove({});
    const templateInput = require("../src/models/TemplateInput").remove({});

    await Promise.all([user, template, templateInput]);
  }
};
