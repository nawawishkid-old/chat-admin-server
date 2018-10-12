exports.dbError = Object.freeze({
  msg: "Database-related error occurred",
  code: 500
});
exports.notFound = Object.freeze({
  msg: "No entry found",
  code: 404
});
exports.found = Object.freeze({
  msg: "Found",
  code: 200
});
exports.created = Object.freeze({
  msg: "Created",
  code: 201
});
exports.createFailed = Object.freeze({
  msg: "Create failed",
  code: 422
});
exports.alreadyExists = Object.freeze({
  msg: "Entity already exists",
  code: 409
});
exports.updated = Object.freeze({
  msg: "Updated",
  code: 204 // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204 
});
exports.updateFailed = Object.freeze({
  msg: "Update failed",
  code: 422
});
exports.deleted = Object.freeze({
  msg: "Deleted",
  code: 200
});
exports.updateFailed = Object.freeze({
  msg: "Delete failed",
  code: 422
});
