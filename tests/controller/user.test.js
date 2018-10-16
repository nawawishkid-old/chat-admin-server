const {
  should,
  makeRequest,
  makeResponse,
  getBody,
  db,
  models
} = require("../utils");
const { User } = require("../../src/models");
const {
  createTestCase,
  shouldResponds422IfInvalidId,
  shouldResponds404IfMismatchedId
} = require("./utils");
const prefix = require("./utils").prefix + "[User]";
const { testUser } = models;
const ctrl = require("../../src/controllers/user");

describe(`${prefix} get()`, () => {
  let userId, testCase;

  before(async () => {
    await db.connect();

    userId = await User.create(testUser.data).then(doc => doc._id.toString());
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  testCase = createTestCase({
    controller: ctrl.get,
    status: 200,
    message: "User found",
    name: {
      condition: "there is at least one template exists",
      data: "all templates"
    },
    request: () => ({ params: { id: userId } })
  });

  it(
    testCase.name,
    testCase.getCallback(res => should.exist(getBody(res).data.user))
  );

  testCase = createTestCase({
    controller: ctrl.get,
    status: 200,
    message: "User found",
    name: {
      condition: "template ID is specified",
      data: "one matched template"
    },
    request: store => ({
      params: { id: userId }
    })
  });

  it(
    testCase.name,
    testCase.getCallback((res, req, store) => {
      const { user } = getBody(res).data;

      should.exist(user);
      user.should.have.property("_id", userId);
    })
  );

  testCase = shouldResponds404IfMismatchedId("user", ctrl.get);

  it(testCase.name, testCase.getCallback());

  testCase = shouldResponds422IfInvalidId("user", ctrl.get, "get");

  it(testCase.name, testCase.getCallback());
});

describe(`${prefix} create()`, () => {
  let testCase;

  before(async () => await db.connect());

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  beforeEach(async () => await User.remove({}));

  testCase = createTestCase({
    controller: ctrl.create,
    status: 201,
    message: "User created",
    name: {
      data: "created user",
      condition: "valid data given"
    },
    request: { body: testUser.data }
  });

  it(
    testCase.name,
    testCase.getCallback((res, req, store) => {
      const { user } = getBody(res).data;

      should.exist(user);
      user.should.have.property("_id");
    })
  );

  testCase = createTestCase({
    controller: ctrl.create,
    status: 422,
    message: "Failed to create user",
    name: {
      condition: "invalid data given",
      data: "error object"
    },
    request: { body: { a: "hahah" } }
  });

  it(
    testCase.name,
    testCase.getCallback(res => {
      const body = getBody(res);

      should.not.exist(body.data);
      should.exist(body.err);
    })
  );
});

describe(`${prefix} update()`, () => {
  let userId, testCase;

  before(async () => {
    await db.connect();

    userId = await User.create(testUser.data).then(doc => doc._id.toString());
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  beforeEach(async () => await User.remove({}));

  testCase = createTestCase({
    controller: ctrl.update,
    status: 200,
    message: "User updated",
    name: {
      data: "updated user",
      condition: "valid data given"
    },
    request: store => {
      store.updatedName = "Updated name";

      return {
        params: { id: store.userId },
        body: { name: store.updatedName }
      };
    },
    pre: async store => {
      store.userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );
    }
  });

  it(
    testCase.name,
    testCase.getCallback((res, req, store) => {
      const { user } = getBody(res).data;

      should.exist(user);
      user.should.have.property("name", store.updatedName);
      user.should.have.property("_id", store.userId);
    })
  );

  testCase = shouldResponds404IfMismatchedId("user", ctrl.update);

  it(testCase.name, testCase.getCallback());

  testCase = shouldResponds422IfInvalidId("user", ctrl.update, "update");

  it(testCase.name, testCase.getCallback());
});

describe(`${prefix} delete()`, () => {
  let userId, templateId, testCase;

  before(async () => {
    await db.connect();

    userId = await User.create(testUser.data).then(doc => doc._id.toString());
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  testCase = createTestCase({
    controller: ctrl.delete,
    status: 200,
    message: "User deleted",
    name: {
      data: "deleted user",
      condition: "'req.params.id' match existing user"
    },
    request: store => ({
      params: { id: userId }
    })
  });

  it(
    testCase.name,
    testCase.getCallback(res => {
      const { user } = getBody(res).data;

      should.exist(user);
      user.should.have.property("_id", userId);
    })
  );

  testCase = shouldResponds404IfMismatchedId("user", ctrl.delete, "delete");

  it(testCase.name, testCase.getCallback());

  testCase = shouldResponds422IfInvalidId("user", ctrl.delete, "delete");

  it(testCase.name, testCase.getCallback());
});
