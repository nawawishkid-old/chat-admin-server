class IncompatibleException extends Error {
  constructor(...params) {
    super("IncompatibleException", ...params);
  }
}

export { IncompatibleException };
