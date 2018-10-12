const TemplateInput = require("../../../src/models/TemplateInput");
const testTemplateInput = {
  data: {
    name: "test1",
    label: "Test #1",
    options: [],
    componentScheme: {
      type: "text",
      props: {}
    }
  },
  create: async data =>
    await TemplateInput.create(Object.assign(testTemplateInput.data, data)),
  remove: async () => await TemplateInput.remove({})
};

module.exports = testTemplateInput;
