const Middleware = require("./Middleware");

class SupertestProxy extends Middleware {
  constructor(supertest) {
    super();

    this.supertest = supertest;
    this.data = {};
    this.state = {};
    this.store = {};
  }

  request(done) {
    // console.log("Nuke.request(done)");
    this._addDone(done);
    this.middleware(this._request.bind(this));
    this._runMiddlewares();
  }

  async _request(instance, next) {
    // console.log("Nuke._request()");
    await this._assignMethods();

    next();
  }

  /**
   * *************
   * Custom methods
   * *************
   */
  endpoint(method, path) {
    this.data.method = method;
    this.data.path = path;
    this.record(method, [path]);

    return this;
  }

  middleware(callback) {
    // console.log("Nuke.middleware()");
    super.add(callback);

    return this;
  }

  /**
   * Inside of before() callback should not do any expect() which has callback as an argument.
   */
  before(callback) {
    this.middleware(callback);

    return this;
  }

  /**
   * ************
   * Supertest proxy methods
   * ************
   */
  expect(...args) {
    // console.log("Nuke.expect()");
    if (typeof args[0] === "number") {
      this.data.code = args[0];
    }

    this.record("expect", args);

    return this;
  }

  set(...args) {
    if (!this.data.headers) {
      this.data.headers = {};
    }

    this.data.headers[args[0]] = args[1];

    this.record("set", args);

    return this;
  }

  send(...args) {
    this.record("send", args);

    return this;
  }

  /**
   * ***********
   * Private methods
   * ***********
   */
  _runMiddlewares() {
    super.arguments(this.store);
    super.run();
  }

  async _assignMethods() {
    // console.log("Nuke._assignMethods()");
    let request = this.supertest;

    for (let i = 0; i < this.data.records.length; i++) {
      let record = this.data.records[i];
      let { method, args } = record;
      const isLastRecord = i === this.data.records.length - 1;

      if (isFunction(args)) {
        args = await args(this.store);
      }

      if (isLastRecord) {
        args = this.__assignDoneCallback(args);
      }
      // console.log("request: ", request);
      // console.log("method: ", method);
      // console.log("args: ", ...args);
      request = request[method](...args);
    }
  }

  __assignDoneCallback(args) {
    const lastArgument = args.slice(-1)[0];

    if (isFunction(lastArgument)) {
      args[args.length - 1] = (err, res) => {
        lastArgument(err, res, this._done);
      };
    } else {
      args.push(this._done);
    }

    return args;
  }

  record(method, args) {
    // console.log("Nuke.record()");
    if (!this.data.records) {
      this.data.records = [];
    }

    const obj = { method, args };

    this.data.records.push(obj);

    return this;
  }

  _addCallback(key, callback) {
    if (!this.callback) {
      this.callback = {};
    }

    this.callback[key] = callback;

    return this;
  }

  _addDone(done) {
    this._done = (...args) => {
      // Make this._done() becomes this._next()
      // if (this.state.hasAfter) {
      //   this._next(...args);

      //   return;
      // }

      // Prevent duplicate call
      if (!this.state.isDone) {
        this.state.isDone = true;

        done(...args);
      }
    };
  }

  // _runBefore(next) {
  //   console.log("Nuke._runBefore()");
  //   if (!this.callback || !isFunction(this.callback.before)) {
  //     next();

  //     return;
  //   }

  //   this.callback.before(this, next);
  // }
}

const isFunction = arg => typeof arg === "function";

module.exports = SupertestProxy;
