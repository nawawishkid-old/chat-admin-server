const SupertestProxy = require("./SupertestProxy");

class TestCaseMaker extends SupertestProxy {
  constructor(...args) {
    super(...args);

    this.data = {
      testName: "Untitled test"
    };
  }

  it(name) {
    it(...this._getItArguments(name));
  }

  xit(name) {
    xit(...this._getItArguments(name));
  }

  name(msg) {
    this.data.testName = msg;

    return this;
  }

  /**
   * **************
   * Private methods
   * **************
   */
  _getItArguments(name) {
    return [name, done => super.request(done)];
  }
}

module.exports = TestCaseMaker;
