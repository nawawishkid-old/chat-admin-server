const { should } = require("../utils");

exports.autoInsertCreatedAtField = {
  it: "should automatically inserts 'created_at' field",
  getCallback: ({ model: Model, baseDoc }) => async () => {
    await Model.create({ ...baseDoc }, (err, doc) => {
      should.not.exist(err);
      should.exist(doc);
      doc.should.have.property("created_at").that.is.a("Date");
    });
  }
};

exports.notInsertUnrelatedField = {
  it: "should not inserts unrelated field(s)",
  getCallback: ({ model: Model, baseDoc }) => async () => {
    const newDoc = { ...baseDoc, sorry: "mybad" };

    await Model.create(newDoc).then(doc => {
      should.not.exist(doc.sorry);
    });
  }
};
