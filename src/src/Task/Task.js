import { EventEmitter } from "events";
import logger from "~/src/Logger/task";

class Task extends EventEmitter {
  constructor(info, options = {}) {
    super();

    this.promiseTaskCallback = this._wrapWithPromise(info.callback);
    this.info = {
      title: "Untitled",
      description: "No description",
      ...info
    };
    this.options = {
      retries: 0,
      retryAfter: 0,
      retryEvery: 0,
      // within: 5000,
      alwaysThrow: false,
      exitOnFailed: false,
      ...options
    };
    this.state = {
      retried: 0,
      isFailed: false,
      isSuccess: false
    };
    this.logger = (level, msg) =>
      logger.log(level, `#${this.info.title} -- ${msg}`);
  }

  /**
   *
   *
   * @api
   * @returns {Task}
   */
  config = options => {
    this.options = {
      ...this.options,
      ...options
    };

    return this;
  };

  /**
   *
   *
   * @api
   * @returns {*}
   */
  perform = async () => {
    this.logger("debug", "Task.perform()");

    return await this.promiseTaskCallback
      .then(func => func(this, ...this.info.arguments))
      .then(this._success)
      .catch(this._unsuccess);
  };

  /**
   * EventEmitter's emit method wrapper
   */
  _trigger = (event, ...args) => {
    return this.emit(event, this, ...args);
  };

  _success = result => {
    this.logger("debug", "Task._success()");
    // this.logger('debug', "Success result: ", typeof result);

    this._trigger("success", result);
    this.state.isSuccess = true;

    return result;
  };

  _unsuccess = async err => {
    this.logger("debug", "Task._unsuccess()");

    this._trigger("unsuccess", err);

    if (this.options.retries < 1) {
      this.logger("debug", "No retry.");

      return this._failed(err);
    }

    return await this._retry(err);
  };

  _retry = async err => {
    this.logger("debug", "Task._retry()");

    if (this.state.retried >= this.options.retries) {
      this.logger("debug", "Maximum retry reached.");
      return this._failed(err);
    }

    this.state.retried++;

    this._trigger("retry", err);

    if (this.options.retryAfter > 0) {
      this.logger("debug", `- Will retry after ${this.options.retryAfter}`);

      return this._setPromiseTimeout(this.options.retryAfter).then(async () => {
        this.logger("debug", "- Retrying...");
        return await this._callWrappedTaskCallback();
      });
    }

    this.logger("debug", "- Retrying...");

    return await this._callWrappedTaskCallback();
  };

  _failed = err => {
    this.logger("debug", "Task._failed()");

    this.logger("error", err.message);
    this._trigger("failed", err);
    this.state.isFailed = true;

    if (this.options.exitOnFailed) {
      logger.info("Exiting process...");
      process.exit(1);
    }

    return err;
  };

  _callWrappedTaskCallback = async () => {
    return await this.promiseTaskCallback
      .then(func => func(this, ...this.info.arguments))
      .then(this._success)
      .catch(this._retry);
  };

  /**
   * ===== Utils =====
   */
  //  _mayCall = (callback, ...rest) => {
  //    if (this._shouldCall(callback)) {
  //      return callback(...rest);
  //    }
  //
  //    return null;
  //  };
  //
  //  _shouldCall = callback => {
  //    return typeof callback === "function";
  //  };

  _wrapWithPromise = callback => {
    return Promise.resolve(callback);
  };

  _setPromiseTimeout = ms => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };
}

export default Task;
