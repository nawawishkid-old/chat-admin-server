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
  }
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
  }
};
const testUser = {
  data: {
    name: "Test #1",
    username: "test1",
    password: "test1",
    email: "test1@test.com"
  }
};

module.exports = { testTemplate, testTemplateInput, testUser };
