const { should, makeRequest, makeResponse, getBody, db } = require("../utils");
const prefix = require("./utils").prefix + "[Auth]";
const {
  getAccessToken,
  getRevocationController
} = require("../../src/controllers/auth");
const { createAccessToken, wait } = require("../utils");
const { testUser } = require("../models");
const User = require("../../src/models/User");
const accessTokenLifespan = 10;
const refreshTimeout = 3;
const secret = "secret";
const controller = getAccessToken({
  refreshTimeout,
  accessTokenLifespan,
  secret
});

describe(`${prefix} getAccessToken()() (common)`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  it("should responds with 422 if no grant type given in request body", async () => {
    const req = makeRequest();
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 422);
    body.should.have.property("msg", "Required grant type");
  });

  it("should responds with 422 and an array of expected grant types if invalid grant type given in request body", async () => {
    const req = makeRequest({
      body: { grantType: "this is invalid" }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 422);
    body.should.have.property("msg", "Invalid grant type");
    body.should.have.property("expected").that.is.an("array");
  });
});

describe(`${prefix} getAccessToken()() (grantType: password)`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  it("should responds with 422 if no username and password given in request body", async () => {
    const req = makeRequest({ body: { grantType: "password" } });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 422);
    body.should.have.property("msg", "Required username and password");
  });

  it("should responds with 401 when given username does not exists", async () => {
    const req = makeRequest({
      body: {
        grantType: "password",
        username: "fakeUsername",
        password: "fakePassword"
      }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    body.should.have.property("msg", "Unauthenticated");
  });

  it("should responds with 401 when given username exists but password is incorrect", async () => {
    const user = await User.create(testUser.data).then(doc => doc);
    const req = makeRequest({
      body: {
        grantType: "password",
        username: user.username,
        password: "fakePassword"
      }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);
    await User.remove({});

    res.should.have.property("statusCode", 401);
    body.should.have.property("msg", "Unauthenticated");
  });

  it("should responds with 200 and body.token when given username and password is valid", async () => {
    const user = await User.create(testUser.data).then(doc => doc);
    const req = makeRequest({
      body: {
        grantType: "password",
        username: user.username,
        password: testUser.data.password
      }
    });
    const res = makeResponse();

    await controller(req, res);
    await User.remove({});

    const body = getBody(res);

    res.should.have.property("statusCode", 200);
    body.should.have.property("msg", "Access token issued successfully");
    body.should.have.property("accessToken").that.is.a("string");
  });
});

describe(`${prefix} getAccessToken()() (grantType: refresh)`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  it("should responds with 422 if no refresh token given in request body", async () => {
    const req = makeRequest({
      body: {
        grantType: "refresh"
      }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 422);
    body.should.have.property("msg", "Required refresh token");
  });

  it("should responds with 401 if invalid refresh token given", async () => {
    const req = makeRequest({
      body: {
        grantType: "refresh",
        refreshToken: 10789909453234
      }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    body.should.have.property("msg", "Invalid refresh token");
  });

  xit("should responds with 401 if expired refresh token given", async function() {
    // extends test timeout
    this.timeout(5000);

    // 1) request new access token using username and password
    const user = await User.create(testUser.data).then(doc => doc);
    const req1 = makeRequest({
      body: {
        grantType: "password",
        username: user.username,
        password: testUser.data.password
      }
    });
    const res1 = makeResponse();
    const refreshTimeout = 1;
    const accessTokenLifespan = 1;
    const newController = getAccessToken({
      refreshTimeout,
      accessTokenLifespan,
      secret
    });

    await newController(req1, res1);

    const { accessToken } = getBody(res1);
    // waiting for access token (or refresh token in this case) and refresh timeout to be expired
    const awaitTime = (accessTokenLifespan + refreshTimeout) * 1000;

    await wait(awaitTime);

    // 2) request new access token using previous access token
    const req2 = makeRequest({
      body: {
        grantType: "refresh",
        refreshToken: accessToken
      }
    });
    const res2 = makeResponse();

    await newController(req2, res2);

    const body = getBody(res2);

    res2.should.have.property("statusCode", 401);
    body.should.have.property("msg", "Refresh token expired");
  });

  xit("should responds with 200 and new access token if given token is expired but its refresh timeout still in time", async function() {
    // extends test timeout
    this.timeout(5000);

    // 1) request new access token using username and password
    const user = await User.create(testUser.data).then(doc => doc);
    const req1 = makeRequest({
      body: {
        grantType: "password",
        username: user.username,
        password: testUser.data.password
      }
    });
    const res1 = makeResponse();
    const refreshTimeout = 1;
    const accessTokenLifespan = 1;
    const newController = getAccessToken({
      refreshTimeout,
      accessTokenLifespan,
      secret
    });

    await newController(req1, res1);

    const { accessToken } = getBody(res1);
    // waiting for access token (or refresh token in this case) to be expired
    const awaitTime = accessTokenLifespan * 1000;

    await wait(awaitTime);

    // 2) request new access token using previous access token
    const req2 = makeRequest({
      body: {
        grantType: "refresh",
        refreshToken: accessToken
      }
    });
    const res2 = makeResponse();

    await newController(req2, res2);

    const body = getBody(res2);

    res2.should.have.property("statusCode", 200);
    body.should.have.property("msg", "Access token issued successfully");
    body.should.have.property("accessToken").that.is.a("string");
  });

  it("should responds with 200 and new access token if new access token is requested before expiration time of existing access token", async function() {
    // 1) request new access token using username and password
    const user = await User.create(testUser.data).then(doc => doc);
    const req1 = makeRequest({
      body: {
        grantType: "password",
        username: user.username,
        password: testUser.data.password
      }
    });
    const res1 = makeResponse();
    const refreshTimeout = 1;
    const accessTokenLifespan = 1;
    const newController = getAccessToken({
      refreshTimeout,
      accessTokenLifespan,
      secret
    });

    await newController(req1, res1);

    const { accessToken } = getBody(res1);

    // 2) request new access token using previous access token
    const req2 = makeRequest({
      body: {
        grantType: "refresh",
        refreshToken: accessToken
      }
    });
    const res2 = makeResponse();

    await newController(req2, res2);

    const body = getBody(res2);

    res2.should.have.property("statusCode", 200);
    body.should.have.property("msg", "Access token issued successfully");
    body.should.have.property("accessToken").that.is.a("string");
  });
});

describe(`${prefix} getRevocationController(options)()`, () => {
  const controller = getRevocationController({ secret });
  const { promisify } = require("util");
  const redis = require("redis").createClient();
  const flushAllAsync = promisify(
    redis.send_command.bind(redis, "flushAll")
  ).bind(redis);

  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();

    db.disconnect();

    await flushAllAsync();

    redis.quit();
  });

  beforeEach(async () => {
    await db.reset();
    await flushAllAsync();
  });

  it("should responds with 422 if no access token given", async () => {
    const req = makeRequest();
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 422);
    body.should.have.property("msg", "Required access token");
  });

  it("should responds with 401 if invalid access token given", async () => {
    const req = makeRequest({
      body: {
        accessToken: "abc.def.ghi"
      }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    body.should.have.property("msg", "Invalid access token");
  });

  xit("should responds with 401 if expired access token given (same boundary as the previous test case)", async function() {
    this.timeout(5000);

    const refreshTimeout = 1;
    const accessTokenLifespan = 1;
    const token = await createAccessToken({
      refreshTimeout,
      accessTokenLifespan,
      secret
    });

    // Await for token to be expired
    await wait((refreshTimeout + accessTokenLifespan) * 1000);

    const req = makeRequest({
      body: {
        accessToken: token
      }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    body.should.have.property("msg", "Invalid access token");
  });

  it("should responds with 200 if token is revoked successfully", async () => {
    const accessToken = await createAccessToken({
      refreshTimeout: 60,
      accessTokenLifespan: 60,
      secret
    });
    const req = makeRequest({
      body: {
        accessToken
      }
    });
    const res = makeResponse();

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 200);
    body.should.have.property("msg", "Access token revoked successfully");
  });
});
