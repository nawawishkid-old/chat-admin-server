const should = require("chai").should();
const {
  parseParamsFromContent,
  filterUserParams,
  replaceContent
} = require("../src/modules/template-parser/utils");
const createTestCase = (content, open, close, params) => () => {
  const result = parseParamsFromContent(content, open, close);

  Object.keys(params).forEach(key => {
    result.should.have.property(key, params[key]);
  });
};

describe("TemplateParser parseParamsFromContent()", () => {
  it(
    "should parse single parameter from content with '{{' and '}}' as tags",
    createTestCase("Hello, {{name}}", "{{", "}}", { name: "{{name}}" })
  );

  it(
    "should parse multiple parameters with '{{' and '}}' as tags",
    createTestCase("Hello, {{yourName}}. My name is {{myName}}", "{{", "}}", {
      yourName: "{{yourName}}",
      myName: "{{myName}}"
    })
  );

  it(
    "should parse single parameter from content with '[[' and ']]' as tags",
    createTestCase("Hello, [[name]]", "[[", "]]", { name: "[[name]]" })
  );

  it(
    "should parse single parameter from content with '${' and '}' as tags",
    createTestCase("Hello, ${name}", "${", "}", { name: "${name}" })
  );

  it(
    "should parse single parameter from content with '<' and '>' as tags",
    createTestCase("Hello, <name>", "<", ">", { name: "<name>" })
  );

  it("should return array of common parameters between content and user-defined", () => {
    const contentParams = { name: "{{name}}" };
    const userParams = { name: "Nawawish" };
    const result = filterUserParams(contentParams, userParams);

    result.should.be.an("array");
    result[0].should.have.property("token", contentParams.name);
    result[0].should.have.property("value", userParams.name);
  });

  it("should replace matched string", () => {
    const content = "Hello, {{name}}";
    const values = [
      {
        token: "{{name}}",
        value: "Nawawish"
      }
    ];
    const result = replaceContent(content, values);

    result.should.eql("Hello, Nawawish");
  });
});
