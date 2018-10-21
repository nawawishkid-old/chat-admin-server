const mongoose = require("mongoose");
const { apiTest, should } = require("./utils");
const { db, models } = require("../utils");
const { requestAccessToken } = require("./utils");
const { testUser, testTemplate, testTemplateInput } = models;
const { User, Template, TemplateInput } = require("../../src/models");
const path = "/api/template";
let accessToken, userId;
const createTemplate = async () => {
  // Create template
  return await Template.create({
    ...testTemplate.data,
    inputs: [mongoose.Types.ObjectId()],
    creatorId: userId
  });
};

/**
 * Test cases
 */
describe(`GET ${path}/:id?`, () => {
  before(async () => {
    await db.connect();
    await User.create(testUser.data).then(doc => {
      userId = doc._id.toString();
    });

    accessToken = await requestAccessToken();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  apiTest()
    .endpoint("get", path)
    .record("set", () => ["Authorization", "Bearer " + accessToken])
    .expecttt(404, "Template not found", (err, res, done) => {
      if (err) {
        done(err);
        return;
      }

      res.body.should.not.have.property("data");

      done();
    })
    .when("there is no template")
    .it();

  apiTest()
    .endpoint("get", path)
    .expect("www-authenticate", "Bearer realm='chat admin'")
    .expecttt(401, "Required JWT token")
    .with("www-authenticate header")
    .when("no authorization header given")
    .it();

  apiTest()
    .endpoint("get", path)
    .expect("www-authenticate", "Bearer realm='chat admin'")
    .expecttt(401, "Required JWT token")
    .with("www-authenticate header")
    .when("invalid JWT token given")
    .it();

  apiTest()
    .endpoint("get", path)
    .middleware(async (instance, next) => {
      await createTemplate();

      next();
    })
    .record("set", () => ["Authorization", "Bearer " + accessToken])
    .expecttt(200, "Template found", (err, res, done) => {
      if (err) return done(err);

      res.body.should.have.property("data").that.is.an("object");
      res.body.data.should.have.property("templates").that.is.an("array");
      res.body.data.templates[0].should.have.property("creatorId", userId);

      done();
    })
    .with("all templates of current user")
    .when("no template ID given")
    .it();

  apiTest()
    .record("get", async (store, next) => {
      const templateId = await createTemplate().then(doc => doc._id);

      store.templateId = templateId;

      return [path + "/" + templateId];
    })
    .record("set", store => ["Authorization", "Bearer " + accessToken])
    .expecttt(200, "Template found", (err, res, done) => {
      if (err) return done(err);

      res.body.should.have.property("data").that.is.an("object");
      res.body.data.should.have.property("template").that.is.an("object");
      res.body.data.template.should.have.property("creatorId", userId);

      done();
    })
    .with("single template of current user")
    .when("template id given")
    .it();
});

describe(`POST ${path}`, () => {
  before(async () => {
    await db.connect();
    await requestAccessToken();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  beforeEach(async () => await Template.remove({}));

  /**
   * ******************
   * All users have been removed, but the token still valid. This is inappropriate.
   * You should create new User before all 'it' in each 'describe'.
   * ******************
   */
  apiTest()
    .endpoint("post", path)
    .record("set", () => ["Authorization", "Bearer " + accessToken])
    .record("send", () => [{ ...testTemplate.data, creatorId: userId }])
    .expecttt(201, "Template created", (err, res, done) => {
      res.body.should.have.property("data").that.is.an("object");
      res.body.data.should.have.property("template").that.is.an("object");

      done();
    })
    .with("created template document")
    .when("creating a template")
    .it();
});
