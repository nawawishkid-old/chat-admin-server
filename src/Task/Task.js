import logger from "~/src/Logger/index";

/**
 * Should have 'within' options
 * Should extends Node's EventEmitter class
 */
class Task {
  constructor(callback, options = {}) {
    this.promiseTaskCallback = this._wrapWithPromise(callback);
    this.options = {
      retries: 0,
      retryAfter: 0,
      retryEvery: 0,
      alwaysThrow: false,
      ...options
    };
    this.state = {
      retried: 0,
      isFailed: false,
      isSuccess: false
    };
  }

  /**
   *
   *
   * @api
   * @returns {Task}
   */
  onFailed = callback => {
    this.options.onFailed = callback;

    return this;
  };

  /**
   *
   *
   * @api
   * @returns {Task}
   */
  onSuccess = callback => {
    this.options.onSuccess = callback;

    return this;
  };

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
  perform = async (...params) => {
    logger.debug("_PERFORM");

    this.params = params;

    return await this.promiseTaskCallback
      .then(func => func(...params))
      .then(this._success)
      .catch(this._unsuccess);
  };

  _success = result => {
    const onSuccessValue = this._mayCall(this.options.onSuccess, result);

    logger.debug("_SUCCESS");
    logger.debug("Success result: ", typeof result);
    this.state.isSuccess = true;

    return onSuccessValue === null ? result : onSuccessValue;
  };

  _unsuccess = async err => {
    logger.debug("_UNSUCCESS");

    if (this.options.retries < 1) {
      logger.debug("No retry.");

      return this._failed(err);
    }

    return await this._retry(err);
  };

  _retry = async err => {
    logger.debug("_RETRY");

    if (this.state.retried >= this.options.retries) {
      logger.debug("Maximum retry reached.");
      return this._failed(err);
    }

    this.state.retried++;

    if (this.options.retryAfter > 0) {
      logger.debug(`Retry after ${this.options.retryAfter}`);

      return this._setPromiseTimeout(this.options.retryAfter).then(async () => {
        logger.debug("THEN!");
        return await this._callWrappedTaskCallback();
      });
    }

    return await this._callWrappedTaskCallback();
  };

  _failed = err => {
    const onFailedValue = this._mayCall(this.options.onFailed, err);

    logger.debug("_FAILED");
    this.state.isFailed = true;

    if (onFailedValue === null) {
      throw err;
    }

    return onFailedValue;
  };

  _callWrappedTaskCallback = async () => {
    return await this.promiseTaskCallback
      .then(func => func(...this.params))
      .then(this._success)
      .catch(this._retry);
  };

  /**
   * ===== Utils =====
   */
  _mayCall = (callback, ...rest) => {
    if (this._shouldCall(callback)) {
      return callback(...rest);
    }

    return null;
  };

  _shouldCall = callback => {
    return typeof callback === "function";
  };

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
