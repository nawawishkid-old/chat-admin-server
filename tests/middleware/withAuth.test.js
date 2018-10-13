const httpMocks = require("node-mocks-http");
const { should, prefix, getBody } = require("./utils");
const withAuth = require("../../src/middlewares/withAuth");
const SECRET = "secret";
const authMiddleware = withAuth({ secret: SECRET });

/**
 * Keep in mind that node-mocks-http is mocking node http
 * which is a bit different from express http,
 * some property or method may not exists
 * e.g. res.status in express is res.statusCode in native node http
 */
describe(`${prefix}withAuth`, () => {
  it("should responds with 401, www-authenticate and 'Invalid JWT token' body.msg when invalid JWT token given.", () => {
    const req = httpMocks.createRequest({
      headers: {
        Authorization: "Bearer abc.def.hij"
      }
    });
    const res = httpMocks.createResponse();

    authMiddleware(req, res, null);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    res._headers.should.have.property("www-authenticate").that.is.a("string");
    body.should.have.property("msg", "Invalid JWT token");
  });

  it("should responds with 401, www-authenticate and 'Required JWT token' body.msg when no JWT token given.", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    authMiddleware(req, res, null);

    const body = getBody(res);

    res.should.have.property("statusCode", 401);
    res._headers.should.have.property("www-authenticate").that.is.a("string");
    body.should.have.property("msg", "Required JWT token");
  });

  it("should call next() when valid JWT token given", () => {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ sub: "abc" }, SECRET, { expiresIn: 60 });
    const req = httpMocks.createRequest({
      headers: {
        Authorization: "Bearer " + token
      }
    });
    const res = httpMocks.createResponse();
		let isNext = false;

    authMiddleware(req, res, () => { isNext = true; });
    
		isNext.should.be.true;
  });
});
