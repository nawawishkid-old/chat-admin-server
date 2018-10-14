const { should, db, models } = require("../utils");
const { testUser } = models;
const {
  autoInsertCreatedAtField,
  notInsertUnrelatedField
} = require("./cases");
const prefix = "[DATABASE] ";
const User = require("../../src/models/User");
const userDoc = testUser.data;
const passwordHash = require("password-hash");
const caseOptions = { model: User, baseDoc: userDoc };

describe(`${prefix}User create`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await User.remove({});
    db.disconnect();
  });

  beforeEach(async () => await User.remove({}));

  it("should inserts new document which has the same fields of given valid data object", async () => {
    await User.create({ ...userDoc }, (err, doc) => {
      should.not.exist(err);
      should.exist(doc);

      Object.keys(userDoc).forEach(key => {
        doc.should.have.property(key); //, userDoc[key]);
      });
    });
  });

  it("should hashes user password", async () => {
    await User.create({ ...userDoc }, (err, doc) => {
      should.not.exist(err);
      should.exist(doc);
      passwordHash.verify(userDoc.password, doc.password).should.be.true;
    });
  });

  it("should lowercase username", async () => {
    await User.create({ ...userDoc }, (err, doc) => {
      should.not.exist(err);
      should.exist(doc);
      doc.should.have.property("username", userDoc.username.toLowerCase());
      // passwordHash.verify(userDoc.password, doc.password).should.be.true;

      // delete userDoc.password;

      // Object.keys(userDoc).forEach(key => {
      //   doc.should.have.property(key); //, userDoc[key]);
      // });
    });
  });

  it("should lowercase email", async () => {
    await User.create({ ...userDoc }, (err, doc) => {
      should.not.exist(err);
      should.exist(doc);
      doc.should.have.property("email", userDoc.email.toLowerCase());
      // passwordHash.verify(userDoc.password, doc.password).should.be.true;

      // delete userDoc.password;

      // Object.keys(userDoc).forEach(key => {
      //   doc.should.have.property(key); //, userDoc[key]);
      // });
    });
  });

  it(
    autoInsertCreatedAtField.it,
    autoInsertCreatedAtField.getCallback(caseOptions)
  );

  it("should not inserts if email is an invalid email address pattern", async () => {
    const newDoc = { ...userDoc, email: "invalid@email" };

    await User.create(newDoc).catch(err => {
      should.exist(err.errors.email);
    });
  });

  it("should not inserts if 'username' field is missing", async () => {
    const newDoc = { ...userDoc };

    delete newDoc.username;

    await User.create(newDoc).catch(err => {
      should.exist(err.errors.username);
    });
  });

  it("should not inserts if 'name' field is missing", async () => {
    const newDoc = { ...userDoc };

    delete newDoc.name;

    await User.create(newDoc).catch(err => {
      should.exist(err.errors.name);
    });
  });

  it("should not inserts if 'password' field is missing", async () => {
    const newDoc = { ...userDoc };

    delete newDoc.password;

    await User.create(newDoc).catch(err => {
      should.exist(err.errors.password);
    });
  });

  it("should not inserts if 'email' field is missing", async () => {
    const newDoc = { ...userDoc };

    delete newDoc.email;

    await User.create(newDoc).catch(err => {
      should.exist(err.errors.email);
    });
  });

  it("should not duplicates document with unique 'username'", async () => {
    const newDoc = { ...userDoc, email: "not@duplicate.field" };

    await User.create(userDoc);
    await User.create(newDoc).catch(err => {
      should.exist(err);
      err.should.have.property("code", 11000);
    });
  });

  it("should not duplicates document with unique 'email'", async () => {
    const newDoc = { ...userDoc, username: "notduplicate" };

    await User.create(userDoc);
    await User.create(newDoc).catch(err => {
      should.exist(err);
      err.should.have.property("code", 11000);
    });
  });

  it(
    notInsertUnrelatedField.it,
    notInsertUnrelatedField.getCallback(caseOptions)
  );
});

describe(`${prefix}User get`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await User.remove({});
    db.disconnect();
  });

  beforeEach(async () => await User.remove({}));

  it("should not returns 'password' field by default", async () => {
    const userId = await User.create(userDoc).then(doc => doc._id);

    await User.findOne({ _id: userId }).then(doc => {
      should.exist(doc);
      should.not.exist(doc.password);
    });
  });

  it("should not returns '__v' built-in field by default", async () => {
    const userId = await User.create(userDoc).then(doc => doc._id);

    await User.findOne({ _id: userId }).then(doc => {
      should.exist(doc);
      should.not.exist(doc.__v);
    });
  });
});

describe(`${prefix}User update`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await User.remove({});
    db.disconnect();
  });

  beforeEach(async () => await User.remove({}));

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

describe(`${prefix}User remove`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await User.remove({});
    db.disconnect();
  });

  beforeEach(async () => await User.remove({}));

  it("should remove user", async () => {
    const { _id } = await User.create(userDoc).then(doc => doc);

    await User.findByIdAndRemove(_id).then(doc => {
      should.exist(doc);
    });
  });
});
