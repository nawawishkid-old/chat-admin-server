const {
  should,
  makeRequest,
  makeResponse,
  getBody,
  db,
  models
} = require("../utils");
const { User, Template, TemplateInput } = require("../../src/models");
const prefix = require("./utils").prefix + "Template";
const { testUser, testTemplate, testTemplateInput } = models;
const { get } = require("../../src/controllers/template");

describe(`${prefix}.get()`, () => {
  let userId, templateInputId;

  before(async () => {
    await db.connect();

    userId = await User.create(testUser.data).then(doc => doc._id);
    templateInputId = await TemplateInput.create({
      ...testTemplateInput.data,
      creatorId: userId
    }).then(doc => doc._id);
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  beforeEach(async () => await Template.remove({}));

  it("should responds with 404, 'Template not found' body.msg if no template found", async () => {
    const req = makeRequest();
    const res = makeResponse();

    await get(req, res);

    const body = getBody(res);

    res.should.have.property("statusCode", 404);
    body.should.have.property("msg", "Template not found");
  });

  it("should responds with 200, 'Template found' body.msg if there is at least one template exists", async () => {
    const newDoc = {
      ...testTemplate.data,
      inputs: [templateInputId],
      creatorId: userId
    };

    await Template.create(newDoc);

    const req = makeRequest();
    const res = makeResponse();

    await get(req, res);

    const body = getBody(res);
    
		res.should.have.property("statusCode", 200);
    body.should.have.property("msg", "Template found");
		should.exist(body.data.templates);
  });
});
