const httpMocks = require("node-mocks-http");
const { should, prefix, next, getBody } = require("./utils");
const removeBaseUrl = require("../../src/middlewares/removeBaseUrl");
const baseUrl = "/base-url";
let obj = { isNext: false };

describe(`${prefix}removeBaseUrl`, () => {
  afterEach(() => {
    obj.isNext = false;
  });

  it("should removes base URL when the base URL has trailing slash", () => {
    const path = "/";
    const baseUrlWithTrailingSlash = baseUrl + "/";
    const req = httpMocks.createRequest({
      url: baseUrlWithTrailingSlash + path
    });

    removeBaseUrl(baseUrlWithTrailingSlash)(req, null, next(obj));

    obj.isNext.should.be.true;
    req.url.should.eql(path);
  });

  it("should removes base URL and strips trailing slash of the request URL", () => {
    const path = "/abc";
    const pathWithTrailingSlash = path + "/";
    const req = httpMocks.createRequest({
      url: baseUrl + pathWithTrailingSlash
    });

    removeBaseUrl(baseUrl)(req, null, next(obj));

    obj.isNext.should.be.true;
    req.url.should.eql(path);
  });
});
