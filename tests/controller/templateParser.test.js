const {
  should,
  makeRequest,
  makeResponse,
  getBody,
  db,
  models
} = require("../utils");
const { User, Template, TemplateInput } = require("../../src/models");
const {
  createTestCase,
  shouldResponds422IfInvalidId,
  shouldResponds404IfMismatchedId
} = require("./utils");
const prefix = require("./utils").prefix + "[TemplateParser]";
const { testUser, testTemplate, testTemplateInput } = models;
const ctrl = require("../../src/controllers/templateParser");

describe(`${prefix} get()`, () => {
  let userId, templateId, templateInputId, testCase;

  before(async () => {
    await db.connect();

    userId = await User.create(testUser.data).then(doc => doc._id.toString());
    templateInputId = await TemplateInput.create({
      ...testTemplateInput.data,
      name: "name",
      label: "Name",
      creatorId: userId
    }).then(doc => doc._id);

    templateId = await Template.create({
      ...testTemplate.data,
      content: "Hello, {{name}}",
      opentTag: "{{",
      closingTag: "}}",
      inputs: [templateInputId],
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
    message: "Template parsed",
    name: {
      condition: "valid data given",
      data: "parsed template"
    },
    request: store => {
      store.query = {
        name: "Nawawish!"
      };

      return {
        params: { templateId },
        query: store.query,
        body: { creatorId: userId }
      };
    }
  });

  it(
    testCase.name,
    testCase.getCallback((res, req, store) => {
      const body = getBody(res);

      body.data.should.have.property(
        "parsedContent",
        "Hello, " + store.query.name
      );
    })
  );
});
