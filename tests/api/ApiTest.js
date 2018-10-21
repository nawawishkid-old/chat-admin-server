const should = require("chai").should();
const TestCaseMaker = require("./Nuke/TestCaseMaker");

class TestApi extends TestCaseMaker {
  constructor(...args) {
    super(...args);

    this.data = {
      nameInfo: {
        condition: "",
        expect: ""
      }
    };
  }

  it(name = null) {
    const testName = name ? name : this._getName();

    super.it(testName);
  }

  xit(name = null) {
    const testName = name ? name : this._getName();

    super.xit(testName);
  }

  expecttt(code, msg, callback = null) {
    this.code(code).msg(msg);

    this.expect(code, (err, res, done) => {
      if (err) return done(err);

      res.body.should.have.property("msg", msg);

      if (typeof callback === "function") {
        callback(err, res, done);
      } else {
        done(err, res);
      }
    });

    return this;
  }

  code(code) {
    this.data.code = code;

    return this;
  }

  msg(msg) {
    this.data.msg = msg;

    return this;
  }

  with(msg) {
    this.data.nameInfo.expect = msg;

    return this;
  }

  when(msg) {
    this.data.nameInfo.condition = msg;

    return this;
  }
  /**
   * **********
   * Private methods
   * **********
   */
  _getName() {
    const { code, msg, nameInfo } = this.data;
    let name = `should responds with ${code}`;

    if (msg) {
      name += ` '${msg}'`;
    }

    if (nameInfo.expect) {
      name += ` and ${nameInfo.expect}`;
    }

    if (nameInfo.condition) {
      name += `; if ${nameInfo.condition}`;
    }

    return name;
  }
}

module.exports = TestApi;
