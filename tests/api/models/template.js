const Template = require("../../../src/models/Template");
const testTemplate = {
  data: {
    name: "test1",
    content: "abc",
    openTag: "{{",
    closingTag: "}}"
  },
  create: async data =>
    await Template.create(Object.assign(testTemplate.data, data)),
  remove: async () => await Template.remove({})
};

module.exports = testTemplate;
