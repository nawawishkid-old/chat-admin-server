const { should, db, models } = require("../utils");
const { testUser, testTemplateInput, testTemplate } = models;
const {
  autoInsertCreatedAtField,
  shouldNotInsertsIfUnrelatedField,
  shouldInsertsValidDocument,
  shouldNotReturnsField,
  shouldNotInsertsIfErrorField,
  shouldNotInsertsIfFieldIsMissing
} = require("./cases");
const prefix = require("./utils").prefix + "[Template]";
const Template = require("../../src/models/Template");
const TemplateInput = require("../../src/models/TemplateInput");
const User = require("../../src/models/User");
const templateDoc = testTemplate.data;
const caseOptions = { model: Template, baseDoc: templateDoc };

describe(`${prefix} create`, () => {
  before(async () => {
    await db.connect();

    const { _id } = await User.create(testUser.data).then(doc => doc);

    templateDoc.creatorId = _id;
  });

  after(async () => {
    await db.reset();

    templateDoc.creatorId = undefined;

    db.disconnect();
  });

  beforeEach(async () => {
    await db.reset();
  });

  it(
    shouldInsertsValidDocument.getName(),
    shouldInsertsValidDocument.getCallback(caseOptions)
  );

  it(
    shouldNotInsertsIfUnrelatedField.getName(),
    shouldNotInsertsIfUnrelatedField.getCallback(caseOptions)
  );

  it(
    shouldNotInsertsIfErrorField.getName(
      "'creatorId' field exists but invalid"
    ),
    done => {
      const clonedTemplateDoc = { ...templateDoc };

      clonedTemplateDoc.creatorId = "hahaha";

      shouldNotInsertsIfErrorField.getCallback({
        model: Template,
        baseDoc: clonedTemplateDoc,
        field: "creatorId"
      })(done);
    }
  );

  it(
    shouldNotInsertsIfFieldIsMissing.getName("name"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "name"
    })
  );

  it(
    shouldNotInsertsIfFieldIsMissing.getName("content"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "content"
    })
  );

  it(
    shouldNotInsertsIfFieldIsMissing.getName("creatorId"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "creatorId"
    })
  );
});

describe(`${prefix} get`, () => {
  before(async () => {
    await db.connect();

    const { _id } = await User.create(testUser.data).then(doc => doc);

    templateDoc.creatorId = _id;
  });

  after(async () => {
    await db.reset();

    templateDoc.creatorId = undefined;

    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  it(shouldNotReturnsField.getName("__v"), async () => {
    const { _id } = Template.create(templateDoc).then(doc => doc);

    shouldNotReturnsField.getCallback({ ...caseOptions, _id, field: "__v" });
  });
});

describe(`${prefix} remove`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();
    await db.disconnect();
  });

  beforeEach(async () => {
    await db.reset();
  });

  it("should remove deleted templateInput ID from existing template document if the templateInput has been removed", async () => {
    // Create user
    const userId = (await User.create(testUser.data).then(doc => doc))._id;

    // Create templateInput
    const templateInputId = (await TemplateInput.create({
      ...testTemplateInput.data,
      creatorId: userId
    }).then(doc => doc))._id;

    // Create template
    const templateId = (await Template.create({
      ...testTemplate.data,
      inputs: [templateInputId],
      creatorId: userId
    }).then(doc => doc))._id;

    // Remove templateInput, should remove its id from template.inputs field
    await TemplateInput.findOneAndRemove({ _id: templateInputId });

    // Get template, should find empty template.inputs array
    await Template.findOne({ _id: templateId }, (err, doc) => {
      should.not.exist(err);
      doc.inputs.should.eql([]);
    });
  });
});
