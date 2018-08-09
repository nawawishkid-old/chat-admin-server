class BaseException extends Error {
  constructor(name, ...params) {
	console.log('Params: ', ...params);
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    this.name = name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException);
    }

    // Custom debugging information
    // this.foo = foo;
    // this.date = new Date();
  }
}

export { BaseException };
