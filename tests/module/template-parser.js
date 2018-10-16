const should = require("chai").should();
const {
  parseParamsFromContent,
  matchUserParams,
  replaceContent
} = require("../../src/modules/template-parser/utils");
const templateParser = require("../../src/modules/template-parser");
const createTestCase = (content, open, close, params) => () => {
  const result = parseParamsFromContent(content, open, close);

  Object.keys(params).forEach(key => {
    result.should.have.property(key, params[key]);
  });
};

describe("TemplateParser main", () => {
  it("should parse one line content", () => {
    const content = "Hello, {{name}}";
    const openTag = "{{";
    const closingTag = "}}";
    const userParams = { name: "Nawawish" };
    const result = templateParser(content, userParams, openTag, closingTag);

    result.isComplete.should.be.true;
    result.mismatched.should.eql({});
    result.content.should.eql("Hello, Nawawish");
  });

  it("should parse multiple line content and keep new line character to be the same", () => {
    const content =
      "Hello, {{name}}\nLong time no see.\nHow about your {{thing}}?";
    const openTag = "{{";
    const closingTag = "}}";
    const userParams = { name: "Nawawish", thing: "dog" };
    const expectedString = `Hello, ${
      userParams.name
    }\nLong time no see.\nHow about your ${userParams.thing}?`;
    const result = templateParser(content, userParams, openTag, closingTag);

    result.isComplete.should.be.true;
    result.mismatched.should.eql({});
    result.content.should.eql(expectedString);
  });
});

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
});

describe("TemplateParser matchUserParams()", () => {
  it("should return object of tokens and values of common parameters between content and user-defined", () => {
    const contentParams = { name: "{{name}}" };
    const userParams = { name: "Nawawish" };
    const result = matchUserParams(contentParams, userParams);

    result.should.be.an("object");
    result.should.eql({
      name: {
        token: contentParams.name,
        value: userParams.name
      }
    });
  });

  it("should return empty object if there is no common parameters between content and user-defined", () => {
    const contentParams = { name: "{{name}}" };
    const userParams = { age: 18 };
    const result = matchUserParams(contentParams, userParams);

    result.should.eql({});
  });
});

describe("TemplateParser replaceContent()", () => {
  it("should replace single matched string", () => {
    const contentParams = { name: "{{name}}" };
    const content = `Hello, ${contentParams.name}`;
    const values = [
      {
        token: contentParams.name,
        value: "Nawawish"
      }
    ];
    const result = replaceContent(content, contentParams, values);

    result.isComplete.should.be.true;
    result.mismatched.should.eql({});
    result.content.should.eql(`Hello, ${values[0].value}`);
  });

  it("should replace multiple matched strings", () => {
    const contentParams = { name: "{{name}}", name2: "{{name2}}" };
    const content = `Hello, ${contentParams.name}. My name is ${
      contentParams.name2
    }.`;
    const values = [
      {
        token: contentParams.name,
        value: "Nawawish"
      },
      {
        token: contentParams.name2,
        value: "Shiwawan"
      }
    ];
    const result = replaceContent(content, contentParams, values);

    result.isComplete.should.be.true;
    result.mismatched.should.eql({});
    result.content.should.eql(
      `Hello, ${values[0].value}. My name is ${values[1].value}.`
    );
  });

  it("should not replace anything if there is no matched string", () => {
    const contentParams = { name: "{{name}}" };
    const content = `Hello, ${contentParams.name}`;
    const values = [];
    const result = replaceContent(content, contentParams, values);

    result.isComplete.should.be.false;
    result.mismatched.should.eql(contentParams);
    result.content.should.eql(content);
  });
});
