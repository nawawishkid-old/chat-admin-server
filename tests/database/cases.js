const { should } = require("../utils");
const createTestCase = (getName, getCallback) => {
  const obj = {};

  obj.getName = typeof getName === "string" ? () => getName : getName;
  obj.getCallback = ({ model, baseDoc, ...rest }, callback = () => {}) =>
    getCallback({ model, baseDoc, ...rest }, callback);

  return obj;
};

exports.shouldInsertsValidDocument = createTestCase(
  "should inserts new document which has the same fields of given valid data object",
  ({ model, baseDoc }, callback) => async () => {
    await model.create(baseDoc, (err, doc) => {
      callback(err, doc);

      should.not.exist(err);
      should.exist(doc);

      Object.keys(baseDoc).forEach(key => {
        doc.should.have.property(key);
      });
    });
  }
);

// Changed to shouldAutoInsertsField to be more general
exports.shouldAutoInsertsField = createTestCase(
  field => `should automatically inserts '${field}' field`,
  ({ model, baseDoc, field, fieldType }, callback) => async () => {
    await model.create({ ...baseDoc }, (err, doc) => {
      callback(err, doc);

      should.not.exist(err);
      should.exist(doc);
      doc.should.have.property(field).that.is.a(fieldType);
    });
  }
);

exports.shouldAlterField = createTestCase(
  (action, field) => `should alters (${action}) '${field}'`,
  ({ model, baseDoc, field, callback }, callback2) => async () => {
    const newDoc = { ...baseDoc };

    await model.create(newDoc, (err, doc) => {
      callback2(err, doc);

      should.not.exist(err);
      should.exist(doc);
      doc.should.have.property(field, callback(doc[field], newDoc[field]));
    });
  }
);

exports.shouldNotInsertsIfUnrelatedField = createTestCase(
  "should not inserts unrelated field(s)",
  ({ model, baseDoc }, callback) => async () => {
    const newDoc = { ...baseDoc, sorry: "mybad" };

    await model
      .create(newDoc)
      .catch(err => {
        callback(err, null);

        should.not.exist(err);
      })
      .then(doc => {
        callback(null, doc);

        should.not.exist(doc.sorry);
      });
  }
);

const shouldNotInsertsIfErrorField = createTestCase(
  condition => `should not inserts if ${condition}`,
  ({ model, baseDoc, field }, callback) => done => {
    if (!field) {
      throw new Error("Error field must be specified");
    }

    //console.log('baseDoc: ', baseDoc);
    const newDoc = { ...baseDoc };

    model.create(newDoc, (err, doc) => {
      callback(err, doc);

      doc.should.eql([]);
      should.exist(err.errors[field]);

      done();
    });
  }
);

exports.shouldNotInsertsIfErrorField = shouldNotInsertsIfErrorField;

exports.shouldNotInsertsIfFieldIsMissing = createTestCase(
  field => shouldNotInsertsIfErrorField.getName(`'${field}' field is missing`),
  ({ model, baseDoc, field }, callback = () => {}) => done => {
    const newDoc = { ...baseDoc };

    delete newDoc[field];

    return shouldNotInsertsIfErrorField.getCallback(
      {
        model,
        baseDoc: newDoc,
        field
      },
      callback
    )(done);
  }
);

exports.shouldNotDuplicatesUniqueField = createTestCase(
  field => `should not duplicates document with unique '${field}'`,
  ({ model, baseDoc, ...rest }, callback) => async () => {
    const newDoc = { ...baseDoc, ...rest };

    await model.create(baseDoc);
    await model
      .create(newDoc)
      .catch(err => {
        callback(err, null);

        should.exist(err);
        err.should.have.property("code", 11000);
      })
      .then(doc => {
        callback(null, doc);

        should.not.exist(doc);
      });
  }
);

exports.shouldNotReturnsField = createTestCase(
  field => `should not returns '${field}' field by default`,
  ({ model, _id, field }, callback) => async () => {
    await model
      .findOne({ _id })
      .catch(err => {
        callback(err, null);

        should.not.exist(err);
      })
      .then(doc => {
        callback(null, doc);

        should.exist(doc);
        should.not.exist(doc[field]);
      });
  }
);
