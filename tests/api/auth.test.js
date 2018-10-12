const app = require("./app");
const { chai, should } = require("./utils");
const testUser = require("./models/user");

describe("POST auth/token", function() {
  this.timeout(5000);

  before(async () => await testUser.create());

  after(async () => await testUser.remove());

  it("should return access token when received valid credential", done => {
    chai
      .request(app)
      .post("/auth/token")
      .send({
        username: testUser.data.username,
        password: testUser.data.password
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("msg", "Authenticated");
        res.body.should.have.property("token").that.is.a("string");

        done();
      });
  });

  it("should not return access token when receive invalid credential", done => {
    chai
      .request(app)
      .post("/auth/token")
      .send({ username: "ahhaha", password: "hahaha" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("msg", "Unauthenticated");
        res.body.should.not.have.property("token");

        done();
      });
  });

  it("should not return access token when user exists but password mismatched", done => {
    chai
      .request(app)
      .post("/auth/token")
      .send({ username: testUser.data.username, password: 1234 })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.not.have.property("token");

        done();
      });
  });

  it("should inform client when no credential received", done => {
    chai
      .request(app)
      .post("/auth/token")
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property("msg", "Required username and password");

        done();
      });
  });
});
