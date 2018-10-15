const Template = require("../src/models/Template");
const TemplateInput = require("../src/models/TemplateInput");
const User = require("../src/models/User");

const testTemplate = {
  data: {
    name: "test1",
    content: "abc",
    openTag: "{{",
    closingTag: "}}",
    inputs: [],
    creatorId: undefined
  },
  create: async data =>
    await Template.create(Object.assign(testTemplate.data, data)),
  remove: async () => await Template.remove({})
};

const testTemplateInput = {
  data: {
    name: "test1",
    label: "Test #1",
    options: {},
    componentScheme: {
      type: "text",
      props: {},
      options: []
    },
    creatorId: undefined
  },
  create: async data =>
    await TemplateInput.create(Object.assign(testTemplateInput.data, data)),
  remove: async () => await TemplateInput.remove({})
};
const testUser = {
  data: {
    name: "Test #1",
    username: "test1",
    password: "test1",
    email: "test1@test.com"
  },
  create: async data => await User.create(Object.assign(testUser.data, data)),
  remove: async () => await User.remove({})
};

module.exports = { testTemplate, testTemplateInput, testUser };
