const {
  should,
  prefix,
  next,
  makeRequest,
  makeResponse,
  getBody
} = require("./utils");
const withRequestBodyFilter = require("../../src/middlewares/withRequestBodyFilter");
const obj = { isNext: false };

describe(`${prefix}withRequestBodyFilter`, () => {
  afterEach(() => {
    obj.isNext = false;
  });

  it("should remove unrelated request body property", () => {
    const requiredKeys = ["a"];
    const req = makeRequest({
      body: {
        a: "a",
        b: "b"
      }
    });
    const res = makeResponse();

    withRequestBodyFilter(...requiredKeys)(req, res, next(obj));

    obj.isNext.should.be.true;
    req.body.should.not.have.property("b");
  });

  it("should responds with 422 and body.msg when required argument(s) is not fulfilled", () => {
    const requiredKeys = ["a"];
    const req = makeRequest({
      body: { b: "b" }
    });
    const res = makeResponse();

    withRequestBodyFilter(...requiredKeys)(req, res, next(obj));

    const body = getBody(res);
    
		obj.isNext.should.be.false;
    res.should.have.property("statusCode", 422);
    body.should.have.property("msg").that.is.a("string");
    body.should.have.property("required").that.is.an('array');
		body.required.should.eql(requiredKeys);
  });
});
