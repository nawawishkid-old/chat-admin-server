const {
  should,
  next,
  makeRequest,
  makeResponse,
  getBody
} = require("../utils");
const { prefix } = require("./utils");
const withCreatorId = require("../../src/middlewares/withCreatorId");
const SECRET = "secret";
let obj = { isNext: false };

describe(`${prefix}withCreatorId`, () => {
  it("should attach user ID from JWT token to request body as 'creatorId' property", () => {
    const jwt = require("jsonwebtoken");
    const userId = "abc";
    const token = jwt.sign({ sub: userId }, SECRET, { expiresIn: 60 });
    const req = makeRequest({
      headers: {
        Authorization: "Bearer " + token
      }
    });
    const res = makeResponse();

    withCreatorId(req, res, next(obj));

    obj.isNext.should.be.true;
    res.should.not.have.property("statusCode", 401);
    req.body.should.have.property("creatorId", userId);
  });

  it("should responds with 401, www-authenticate and 'Required JWT token' body.msg when no JWT token given.", () => {
    const req = makeRequest();
    const res = makeResponse();

    withCreatorId(req, res, null);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    res._headers.should.have.property("www-authenticate").that.is.a("string");
    body.should.have.property("msg", "Required JWT token");
  });

  it("should responds with 401, www-authenticate and 'Invalid JWT token' body.msg when invalid JWT token given.", () => {
    const req = makeRequest({
      headers: {
        Authorization: "Bearer abc.def.hij"
      }
    });
    const res = makeResponse();

    withCreatorId(req, res, null);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    res._headers.should.have.property("www-authenticate").that.is.a("string");
    body.should.have.property("msg", "Invalid JWT token");
  });
});
