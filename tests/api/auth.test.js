const { apiTest, should } = require("./utils");
const { db, models } = require("../utils");
const { testUser } = models;
const User = require("../../src/models/User");
const path = "/auth/token";

describe(`POST ${path}`, function() {
  before(async () => {
    await db.connect();
    await User.create(testUser.data);
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  apiTest()
    .endpoint("post", path)
    .send({
      username: testUser.data.username,
      password: testUser.data.password
    })
    .expecttt(200, "Access token issued successfully", (err, res, done) => {
      res.body.should.have.property("token").that.is.a("string");

      done();
    })
    .with("access token")
    .when("valid credential given")
    .it();

  apiTest()
    .endpoint("post", path)
    .send({ username: "ahhaha", password: "hahaha" })
    .expecttt(401, "Unauthenticated", (err, res, done) => {
      res.body.should.not.have.property("token");

      done();
    })
    .when("invalid credential given")
    .it();

  apiTest()
    .endpoint("post", path)
    .send({ username: testUser.data.username, password: 1234 })
    .expecttt(401, "Unauthenticated", (err, res, done) => {
      res.body.should.not.have.property("token");

      done();
    })
    .when("user exists but password is invalid")
    .it();

  apiTest()
    .endpoint("post", path)
    .expecttt(422, "Required username and password")
    .when("no credential given")
    .it();

  /**
   * It should not authenticate when the token is not expired, but its subject (user) has been removed
   */
});
