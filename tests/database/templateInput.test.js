const { should, db, models } = require("../utils");
const { testUser, testTemplateInput } = models;
const {
  autoInsertCreatedAtField,
  shouldNotInsertsIfUnrelatedField,
  shouldInsertsValidDocument,
  shouldNotReturnsField,
  shouldNotInsertsIfErrorField,
  shouldNotInsertsIfFieldIsMissing,
  shouldNotDuplicatesUniqueField
} = require("./cases");
const prefix = require("./utils").prefix + "[TemplateInput]";
const TemplateInput = require("../../src/models/TemplateInput");
const User = require("../../src/models/User");
const templateInputDoc = testTemplateInput.data;
const caseOptions = { model: TemplateInput, baseDoc: templateInputDoc };

describe(`${prefix} create`, () => {
  before(async () => {
    await db.connect();

    const { _id } = await User.create(testUser.data).then(doc => doc);

    templateInputDoc.creatorId = _id;
  });

  after(async () => {
    await db.reset();

    templateInputDoc.creatorId = undefined;

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
      const clonedTemplateInputDoc = { ...templateInputDoc };

      clonedTemplateInputDoc.creatorId = "hahaha";

      shouldNotInsertsIfErrorField.getCallback({
        model: TemplateInput,
        baseDoc: clonedTemplateInputDoc,
        field: "creatorId"
      })(done);
    }
  );

  it(
    shouldNotInsertsIfErrorField.getName(
      "'componentScheme' does not have 'type' property"
    ),
    done => {
      /**
       * If not wrapped in function, our altered baseDoc won't have creatorId props,
       * because creatorId props is attached in 'before' function of Mocha
       */
      shouldNotInsertsIfErrorField.getCallback({
        ...caseOptions,
        baseDoc: { ...caseOptions.baseDoc, componentScheme: {} },
        field: "componentScheme"
      })(done);
    }
  );

  it(
    shouldNotInsertsIfErrorField.getName(
      "'componentScheme.type' is not one of 'text', 'select', and 'number'"
    ),
    done => {
      const clonedComponentScheme = { ...templateInputDoc.componentScheme };

      clonedComponentScheme.type = "invalid type";

      const clonedDoc = {
        ...templateInputDoc,
        componentScheme: clonedComponentScheme
      };

      shouldNotInsertsIfErrorField.getCallback({
        ...caseOptions,
        baseDoc: clonedDoc,
        field: "componentScheme"
      })(done);
    }
  );

  it(
    shouldNotInsertsIfErrorField.getName(
      "'componentScheme.props' is not an object"
    ),
    done => {
      const clonedComponentScheme = { ...templateInputDoc.componentScheme };

      clonedComponentScheme.props = "string not an object";

      const clonedDoc = {
        ...templateInputDoc,
        componentScheme: clonedComponentScheme
      };

      shouldNotInsertsIfErrorField.getCallback({
        ...caseOptions,
        baseDoc: clonedDoc,
        field: "componentScheme"
      })(done);
    }
  );

  it(
    shouldNotInsertsIfErrorField.getName("'options' field is not an object"),
    done => {
      const clonedDoc = {
        ...templateInputDoc,
        options: []
      };

      shouldNotInsertsIfErrorField.getCallback({
        ...caseOptions,
        baseDoc: clonedDoc,
        field: "options"
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
    shouldNotInsertsIfFieldIsMissing.getName("label"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "label"
    })
  );

  it(
    shouldNotInsertsIfFieldIsMissing.getName("componentScheme"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "componentScheme"
    })
  );

  it(
    shouldNotInsertsIfFieldIsMissing.getName("creatorId"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "creatorId"
    })
  );

  it(
    shouldNotDuplicatesUniqueField.getName("name"),
    shouldNotDuplicatesUniqueField.getCallback(caseOptions)
  );
});

describe(`${prefix} get`, () => {
  before(async () => {
    await db.connect();

    const { _id } = await User.create(testUser.data).then(doc => doc);

    templateInputDoc.creatorId = _id;
  });

  after(async () => {
    await db.reset();

    templateInputDoc.creatorId = undefined;

    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  it(shouldNotReturnsField.getName("__v"), async () => {
    const { _id } = TemplateInput.create(templateInputDoc).then(doc => doc);

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

  it("should not be removed when 'template' document it relies on has been removed", async () => {
    const Template = require("../../src/models/Template");
		const { testTemplate } = models;

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

    // Remove template, should not remove its input document
    await Template.findOneAndRemove({ _id: templateId });

    // Get template, should find empty template.inputs array
    await TemplateInput.findOne({ _id: templateInputId }, (err, doc) => {
      should.not.exist(err);
      should.exist(doc);
    });
  });
});
