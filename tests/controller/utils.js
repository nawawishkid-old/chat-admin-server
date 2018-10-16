const {
  should,
  makeRequest,
  makeResponse,
  getBody,
  db,
  models
} = require("../utils");

exports.prefix = "[CONTROLLER]";

const createTestCase = ({ controller, status, message, name, ...rest }) => {
  if (typeof controller !== "function") {
    throw new Error("controller is required and must be callable");
  }

  if (!status || !message || !name) {
    throw new Error("status, message, and name are required");
  }

  const obj = {};
  const store = {};
  const getRequest = () =>
    typeof rest.request === "function" ? rest.request(store) : rest.request;
  const getResponse = () =>
    typeof rest.response === "function" ? rest.response(store) : rest.response;

  obj.name = `should responds with ${status}, '${message}' message`;

  if (name.data) {
    obj.name += `, and ${name.data}`;
  }

  obj.name += `; if ${name.condition}`;

  obj.getCallback = (callback = null) => async () => {
    if (typeof rest.pre === "function") {
      await rest.pre(store);
    }

    const req = makeRequest(getRequest());
    const res = makeResponse(getResponse());

    await controller(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", status);
    body.should.have.property("msg", message);

    if (typeof callback === "function") {
      callback(res, req, store);
    }

    if (typeof rest.post === "function") {
      await rest.post();
    }
  };

  return obj;
};

exports.createTestCase = createTestCase;

exports.shouldResponds422IfInvalidId = (
  resource,
  controller,
  action,
  options = {}
) => {
  const args = {
    controller,
    status: 422,
    message: `Failed to ${action} ${resource}`,
    name: {
      condition: "'req.params.id' is invalid"
    },
    request: { params: { id: "thisisinvalid" } }
  };

  return createTestCase({
    ...args,
    ...options
  });
};

exports.shouldResponds404IfMismatchedId = (
  resource,
  controller,
  options = {}
) =>
  createTestCase({
    controller,
    status: 404,
    message: `${resource.slice(0, 1).toUpperCase() +
      resource.slice(1)} not found`,
    name: {
      condition: "'req.params.id' does not match any existing template"
    },
    request: { params: { id: require("mongoose").Types.ObjectId() } },
    ...options
  });
