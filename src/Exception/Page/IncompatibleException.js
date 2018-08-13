import { BaseException } from "~/src/Exception/BaseException";

class IncompatibleException extends BaseException {
  constructor(...params) {
    super("IncompatibleException", ...params);
  }
}

export { IncompatibleException };
