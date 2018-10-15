const { should, db, models } = require("../utils");
const { testUser } = models;
const {
  shouldAlterField,
  shouldAutoInsertsField,
  shouldNotInsertsIfUnrelatedField,
  shouldInsertsValidDocument,
  shouldNotReturnsField,
  shouldNotInsertsIfErrorField,
  shouldNotInsertsIfFieldIsMissing,
  shouldNotDuplicatesUniqueField
} = require("./cases");
const prefix = require("./utils").prefix + "[User]";
const User = require("../../src/models/User");
const userDoc = testUser.data;
const passwordHash = require("password-hash");
const caseOptions = { model: User, baseDoc: userDoc };

describe(`${prefix} create`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  it(
    shouldInsertsValidDocument.getName(),
    shouldInsertsValidDocument.getCallback(caseOptions)
  );

  it(
    shouldAlterField.getName("hashes", "password"),
    shouldAlterField.getCallback({
      ...caseOptions,
      field: "password",
      callback: (newValue, oldValue) =>
        passwordHash.verify(oldValue, newValue) ? newValue : oldValue
    })
  );

  it(
    shouldAlterField.getName("lowercase", "username"),
    shouldAlterField.getCallback({
      ...caseOptions,
      field: "username",
      callback: value => value.toLowerCase()
    })
  );

  it(
    shouldAlterField.getName("lowercase", "email"),
    shouldAlterField.getCallback({
      ...caseOptions,
      field: "email",
      callback: value => value.toLowerCase()
    })
  );

  it(
    shouldAutoInsertsField.getName("created_at"),
    shouldAutoInsertsField.getCallback({
      ...caseOptions,
      field: "created_at",
      fieldType: "Date"
    })
  );

  it(
    shouldNotInsertsIfErrorField.getName(
      "'email' is an invalid email address pattern"
    ),
    shouldNotInsertsIfErrorField.getCallback({
      ...caseOptions,
      baseDoc: { ...caseOptions.baseDoc, email: "invalid@email" },
      field: "email"
    })
  );

  it(
    shouldNotInsertsIfFieldIsMissing.getName("username"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "username"
    })
  );

  it(
    shouldNotInsertsIfFieldIsMissing.getName("name"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "name"
    })
  );

  it(
    shouldNotInsertsIfFieldIsMissing.getName("password"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "password"
    })
  );

  it(
    shouldNotInsertsIfFieldIsMissing.getName("email"),
    shouldNotInsertsIfFieldIsMissing.getCallback({
      ...caseOptions,
      field: "email"
    })
  );

  it(
    shouldNotDuplicatesUniqueField.getName("username"),
    shouldNotDuplicatesUniqueField.getCallback({
      ...caseOptions,
      email: "not@duplicate.com"
    })
  );

  it(
    shouldNotDuplicatesUniqueField.getName("email"),
    shouldNotDuplicatesUniqueField.getCallback({
      ...caseOptions,
      username: "notduplicate"
    })
  );

  it(
    shouldNotInsertsIfUnrelatedField.getName(),
    shouldNotInsertsIfUnrelatedField.getCallback(caseOptions)
  );
});

describe(`${prefix} get`, () => {
  let userId;

  before(async () => {
    await db.connect();

    userId = await User.create(userDoc).then(doc => doc._id);
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  it(shouldNotReturnsField.getName("password"), async () => {
    await shouldNotReturnsField.getCallback({
      ...caseOptions,
      _id: userId,
      field: "password"
    });
  });

  it(shouldNotReturnsField.getName("__v"), async () => {
    await shouldNotReturnsField.getCallback({
      ...caseOptions,
      _id: userId,
      field: "__v"
    })();
  });
});

describe(`${prefix} update`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  xit("should automatically updates 'updated_at' field on updating existing document", async () => {
    const createdDoc = await User.create(userDoc).then(doc => doc);
    const { _id, updated_at } = createdDoc;

    await User.findOneAndUpdate(
      { _id },
      { name: "Updated name" },
      { new: true } // return updated doc instead of old one
    ).then(doc => {
      should.exist(doc);
      doc.updated_at.should.not.eql(updated_at);
    });
  });
});

describe(`${prefix} remove`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  it("should remove user", async () => {
    const { _id } = await User.create(userDoc).then(doc => doc);

    await User.findByIdAndRemove(_id).then(doc => {
      should.exist(doc);
    });
  });
});
