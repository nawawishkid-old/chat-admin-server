const { should, makeRequest, makeResponse, getBody, db } = require("../utils");
const { prefix } = require("./utils");
const { getAccessToken } = require("../../src/controllers/auth");
const { testUser } = require("../utils").models;
const tokenLifespan = 60;
const secret = "secret";
const controller = getAccessToken({ tokenLifespan, secret });

describe(`${prefix} auth.getAccessToken()()`, () => {
  before(async () => {
    await db.connect();
  });

  after(() => {
    db.disconnect();
  });

  it("should responds with 200 and body.token when given username and password is valid", async () => {
    const user = await testUser.create().then(doc => doc);
    const req = makeRequest({
      body: { username: user.username, password: testUser.data.password }
    });
    const res = makeResponse();

    await controller(req, res);
    await testUser.remove();

    const body = getBody(res);

    res.should.have.property("statusCode", 200);
    body.should.have.property("msg", "Access token issued successfully");
    body.should.have.property("token").that.is.a("string");
  });

  it("should responds with 422 when no username and password given", async () => {
    const req = makeRequest();
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 422);
    body.should.have.property("msg", "Required username and password");
  });

  it("should responds with 401 when given username does not exist", async () => {
    const req = makeRequest({
      body: { username: "fakeUsername", password: "fakePassword" }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    body.should.have.property("msg", "Unauthenticated");
  });

  it("should responds with 401 when given username exists but password is incorrect", async () => {
    const user = await testUser.create().then(doc => doc);
    const req = makeRequest({
      body: { username: user.username, password: "fakePassword" }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);
    await testUser.remove();

    res.should.have.property("statusCode", 401);
    body.should.have.property("msg", "Unauthenticated");
  });
});
