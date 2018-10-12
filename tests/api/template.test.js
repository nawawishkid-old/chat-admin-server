const app = require("./app");
const { chai, should } = require("./utils");
const testUser = require("./models/user");
const testTemplate = require("./models/template");
const testTemplateInput = require("./models/templateInput");
const path = "/api/template";
let accessToken, userId;
const requestAccessToken = async () => {
  await testUser.create().then(doc => {
    userId = doc._id.toString();
  });

  // Get access token
  await chai
    .request(app)
    .post("/auth/token")
    .send({
      username: testUser.data.username,
      password: testUser.data.password
    })
    .then(res => {
      accessToken = res.body.token;
    });
};
const createTemplate = async () => {
  // Create template input
  const inputId = await testTemplateInput
    .create({ creatorId: userId })
    .then(doc => doc._id);

  // Create template
  return await testTemplate.create({
    inputs: [inputId],
    creatorId: userId
  });
};

describe(`GET ${path}/:id?`, () => {
  before(async () => {
    await requestAccessToken();
  });

  after(async () => await testUser.remove());

  it("responds with 404 code when there is no template", done => {
    chai
      .request(app)
      .get(path)
      .set("Authorization", "Bearer " + accessToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.not.have.property("data");

        done();
      });
  });

  it("responds with 401 code and www-authenticate header when no authorization header supply", done => {
    chai
      .request(app)
      .get(path)
      .end((err, res) => {
        res.should.have.status(401);
        res.header.should.have.property("www-authenticate").that.is.a("string");
        res.body.should.eql({});

        done();
      });
  });

  it("responds with 401 code and www-authenticate header when JWT token is supplied but invalid", done => {
    chai
      .request(app)
      .get(path)
      .end((err, res) => {
        res.should.have.status(401);
        res.header.should.have.property("www-authenticate").that.is.a("string");
        res.body.should.eql({});

        done();
      });
  });

  it("gets all templates of current user when no template id supplied", async () => {
    await createTemplate();
    await chai
      .request(app)
      .get(path)
      .set("Authorization", "Bearer " + accessToken)
      .then(async res => {
        // Reset templateinputs collection before assertion
        // to prevent duplicate key
        await testTemplateInput.remove({});

        res.should.have.status(200);
        res.body.should.have.property("data").that.is.an("object");
        res.body.data.should.have.property("templates").that.is.an("array");
        res.body.data.templates[0].should.have.property("creatorId", userId);
      });
  });

  it("gets single template of current user when template id supplied", async () => {
    const templateId = await createTemplate().then(doc => doc._id);

    await chai
      .request(app)
      .get(`${path}/${templateId}`)
      .set("Authorization", "Bearer " + accessToken)
      .then(async res => {
        await testTemplateInput.remove();

        res.should.have.status(200);
        res.body.should.have.property("data").that.is.an("object");
        res.body.data.should.have.property("templates").that.is.an("array");
        res.body.data.templates.length.should.eql(1);
        res.body.data.templates[0].should.have.property("creatorId", userId);
      });
  });
});
