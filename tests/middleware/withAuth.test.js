const { prefix } = require("./utils");
const {
  should,
  db,
  next,
  makeRequest,
  makeResponse,
  getBody,
  createAccessToken,
  revokeAccessToken
} = require("../utils");
const withAuth = require("../../src/middlewares/withAuth");
const SECRET = "secret";
const authMiddleware = withAuth({ secret: SECRET });
let obj = { isNext: false };

/**
 * Keep in mind that node-mocks-http is mocking node http
 * which is a bit different from express http,
 * some property or method may not exists
 * e.g. res.status in express is res.statusCode in native node http
 */
describe(`${prefix}withAuth`, () => {
  it("should responds with 401, www-authenticate and 'Invalid JWT token' body.msg when invalid JWT token given.", async () => {
    const req = makeRequest({
      headers: {
        Authorization: "Bearer abc.def.hij"
      }
    });
    const res = makeResponse();

    await authMiddleware(req, res, null);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    res._headers.should.have.property("www-authenticate").that.is.a("string");
    body.should.have.property("msg", "Invalid JWT token");
  });

  it("should responds with 401, www-authenticate and 'Required JWT token' body.msg when no JWT token given.", async () => {
    const req = makeRequest();
    const res = makeResponse();

    await authMiddleware(req, res, null);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    res._headers.should.have.property("www-authenticate").that.is.a("string");
    body.should.have.property("msg", "Required JWT token");
  });

  xit("should call next() when valid JWT token given", async () => {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ sub: "abc" }, SECRET, { expiresIn: 60 });
    const req = makeRequest({
      headers: {
        Authorization: "Bearer " + token
      }
    });
    const res = makeResponse();

    await authMiddleware(req, res, next(obj));

    obj.isNext.should.be.true;
  });

  it("should responds with 401 if revoked token given", async () => {
    await db.connect();
    await db.reset();

    const secret = "secret";
    const accessToken = await createAccessToken({
      refreshTimeout: 60,
      accessTokenLifespan: 60,
      secret
    });

    await revokeAccessToken({ accessToken, secret });

    const req = makeRequest({
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    const res = makeResponse();

    await authMiddleware(req, res, next(obj));

    const body = getBody(res);

    obj.isNext.should.be.false;
    body.should.have.property("msg", "Access token was revoked");

    await db.reset();
    db.disconnect();
  });
});
