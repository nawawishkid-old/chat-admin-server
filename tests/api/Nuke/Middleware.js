class Middleware {
  constructor() {
    this._middlewares = [];
    this._middlewareIndex = 0;
    this._arguments = [];
  }

  arguments(...args) {
    this._arguments = args;

    return this;
  }

  add(middleware) {
    if (typeof middleware !== "function") {
      throw new Error(
        "Middleware must be a function. But '" + typeof middleware + "' given."
      );
    }

    this._middlewares.push(middleware);

    return this;
  }

  run() {
    const middleware = this._middlewares[this._middlewareIndex];

    if (typeof middleware === "function") {
      middleware(...this._arguments, this._next.bind(this));
    }
  }

  _next() {
    this._middlewareIndex++;
    this.run();
  }
}

module.exports = Middleware;
