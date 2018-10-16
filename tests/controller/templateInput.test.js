const {
  should,
  makeRequest,
  makeResponse,
  getBody,
  db,
  models
} = require("../utils");
const { User, TemplateInput } = require("../../src/models");
const {
  createTestCase,
  shouldResponds422IfInvalidId,
  shouldResponds404IfMismatchedId
} = require("./utils");
const prefix = require("./utils").prefix + "[TemplateInput]";
const { testUser, testTemplateInput } = models;
const ctrl = require("../../src/controllers/templateInput");

describe(`${prefix} get()`, () => {
  let userId, templateInputId, testCase;

  before(async () => {
    await db.connect();

    userId = await User.create(testUser.data).then(doc => doc._id);

    templateInputId = await TemplateInput.create({
      ...testTemplateInput.data,
      creatorId: userId
    }).then(doc => doc._id.toString());
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  testCase = createTestCase({
    controller: ctrl.get,
    status: 200,
    message: "TemplateInput found",
    name: {
      condition: "there is at least one template exists",
      data: "all templates"
    },
    request: () => ({ body: { creatorId: userId } })
  });

  it(
    testCase.name,
    testCase.getCallback(res =>
      getBody(res).data.templateInputs.length.should.eql(1)
    )
  );

  testCase = createTestCase({
    controller: ctrl.get,
    status: 200,
    message: "TemplateInput found",
    name: {
      condition: "template ID is specified",
      data: "one matched template object instead of array with single item"
    },
    request: store => ({
      params: { id: templateInputId },
      body: { creatorId: userId }
    })
  });

  it(
    testCase.name,
    testCase.getCallback((res, req, store) => {
      const { templateInput } = getBody(res).data;

      should.exist(templateInput);
      templateInput.should.have.property("_id", templateInputId);
    })
  );

  testCase = shouldResponds404IfMismatchedId("templateInput", ctrl.get);

  it(testCase.name, testCase.getCallback());

  testCase = shouldResponds422IfInvalidId("templateInput", ctrl.get, "get");

  it(testCase.name, testCase.getCallback());
});

describe(`${prefix} create()`, () => {
  let testCase;

  before(async () => await db.connect());

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  beforeEach(async () => await TemplateInput.remove({}));

  testCase = createTestCase({
    controller: ctrl.create,
    status: 201,
    message: "TemplateInput created",
    name: {
      data: "created templateInput",
      condition: "valid data given"
    },
    request: store => ({
      body: { ...testTemplateInput.data, creatorId: store.creatorId }
    }),
    pre: async store => {
      store.creatorId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );
    }
  });

  it(
    testCase.name,
    testCase.getCallback((res, req, store) => {
      const { templateInput } = getBody(res).data;

      should.exist(templateInput);
      templateInput.should.have.property("creatorId", store.creatorId);
    })
  );

  testCase = createTestCase({
    controller: ctrl.create,
    status: 422,
    message: "Failed to create templateInput",
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
  let userId, templateInputId, testCase;

  before(async () => {
    await db.connect();

    userId = await User.create(testUser.data).then(doc => doc._id);
    templateInputId = await TemplateInput.create({
      ...testTemplateInput.data,
      creatorId: userId
    }).then(doc => doc._id.toString());
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  beforeEach(async () => await TemplateInput.remove({}));

  testCase = createTestCase({
    controller: ctrl.update,
    status: 200,
    message: "TemplateInput updated",
    name: {
      data: "updated templateInput",
      condition: "valid data given"
    },
    request: store => {
      store.updatedName = "Updated name";

      return {
        params: { id: store.templateInputId },
        body: { name: store.updatedName, creatorId: userId }
      };
    },
    pre: async store => {
      const newDoc = {
        ...testTemplateInput.data,
        inputs: [templateInputId],
        creatorId: userId
      };

      store.templateInputId = await TemplateInput.create(newDoc).then(doc =>
        doc._id.toString()
      );
    }
  });

  it(
    testCase.name,
    testCase.getCallback((res, req, store) => {
      const { templateInput } = getBody(res).data;

      should.exist(templateInput);
      templateInput.should.have.property("name", store.updatedName);
      templateInput.should.have.property("_id", store.templateInputId);
    })
  );

  testCase = shouldResponds404IfMismatchedId("templateInput", ctrl.update);

  it(testCase.name, testCase.getCallback());

  testCase = shouldResponds422IfInvalidId(
    "templateInput",
    ctrl.update,
    "update"
  );

  it(testCase.name, testCase.getCallback());
});

describe(`${prefix} delete()`, () => {
  let userId, templateId, templateInputId, testCase;

  before(async () => {
    await db.connect();

    userId = await User.create(testUser.data).then(doc => doc._id);

    templateInputId = await TemplateInput.create({
      ...testTemplateInput.data,
      creatorId: userId
    }).then(doc => doc._id.toString());
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  testCase = createTestCase({
    controller: ctrl.delete,
    status: 200,
    message: "TemplateInput deleted",
    name: {
      data: "deleted templateInput",
      condition: "'req.params.id' match existing templateInput"
    },
    request: store => ({
      params: { id: templateInputId }
    })
  });

  it(
    testCase.name,
    testCase.getCallback(res => {
      const { templateInput } = getBody(res).data;

      should.exist(templateInput);
      templateInput.should.have.property("_id", templateInputId);
    })
  );

  testCase = shouldResponds404IfMismatchedId(
    "templateInput",
    ctrl.delete,
    "delete"
  );

  it(testCase.name, testCase.getCallback());

  testCase = shouldResponds422IfInvalidId(
    "templateInput",
    ctrl.delete,
    "delete"
  );

  it(testCase.name, testCase.getCallback());
});
