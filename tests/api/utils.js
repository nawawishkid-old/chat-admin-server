const app = require("./app");
const chai = require("chai");
const should = chai.should();
const supertest = require("supertest");
const ApiTest = require("./ApiTest");

const request = () => supertest(app);
const apiTest = (request = null) => {
  const arg = request ? request : supertest(app);

  return new ApiTest(arg);
};

const requestAccessToken = async () => {
  const { testUser } = require("../models");

  // Get access token
  return await request()
    .post("/auth/token")
    .send({
      username: testUser.data.username,
      password: testUser.data.password,
      grantType: "password"
    })
    .then(res => res.body.accessToken);
};

module.exports = Object.freeze({
  chai,
  should,
  request,
  apiTest,
  requestAccessToken
});
