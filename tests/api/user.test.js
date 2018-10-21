const { apiTest, should } = require("./utils");
const { db } = require("../utils");
const path = "/api/users";
const mongoose = require("mongoose");
const User = require("../../src/models/User");
const { testUser } = require("../models");
const { requestAccessToken } = require("./utils");

describe(`GET ${path}/:id`, () => {
  let accessToken, userId;

  before(async () => {
    await db.connect();

    userId = await User.create(testUser.data).then(doc => doc._id.toString());
    accessToken = await requestAccessToken();
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  apiTest()
    .endpoint("get", path)
    .expect(404)
    .when("user ID is not given in URL path parameter")
    .it();

  apiTest()
    .endpoint("get", path + "/" + mongoose.Types.ObjectId())
    .expect("www-authenticate", "Bearer realm='chat admin'")
    .expecttt(401, "Required JWT token")
    .with("www-authenticate header")
    .when("no access token given")
    .it();

  /**
   * Isn't this mean any registered user of the system
   * could access any other user's information?
   * Because we need only access token issued by the system,
   * so, whoever has access token, could access all other users', init?
   */
  apiTest()
    .record("get", () => [path + "/" + userId])
    .record("set", () => ["Authorization", "Bearer " + accessToken])
    .expecttt(200, "User found")
    .with("user data")
    .when("valid access token given")
    .it();
});

describe(`POST ${path}`, () => {
  let accessToken, userId;

  before(async () => {
    await db.connect();

    // userId = await User.create(testUser.data).then(doc => doc._id.toString());
    // accessToken = await requestAccessToken();
  });

  after(async () => {
    await db.reset();

    db.disconnect();
  });

  apiTest()
    .endpoint("post", path)
    .send(testUser.data)
    .expecttt(201, "User created", (err, res, done) => {
      if (err) return done(err);

      res.body.should.have.property("data").that.is.an("object");
      res.body.data.should.have.property("user").that.is.an("object");

      done();
    })
    .with("created user document")
    .it();

  apiTest()
    .endpoint("post", path)
    .middleware(async (store, next) => {
      await User.create(testUser.data).catch(err => err);

      next();
    })
    .send(testUser.data)
    .expecttt(422, "Failed to create user", (err, res, done) => {
      if (err) return done(err);

      res.body.err.should.exist;

      done();
    })
    .with("body.err object")
    .when("creating user already exists")
    .it();

  apiTest()
    .endpoint("post", path)
    .record("send", () => {
      const clonedUserData = { ...testUser.data };

      delete clonedUserData.username;

      return [clonedUserData];
    })
    .expect(422, (err, res, done) => {
      if (err) return done(err);

      should.exist(res.body.required);

      done();
    })
    .with("res.body.required array")
    .when("not enough data to create user document")
    .it();

  /**
   * should responds with 422 and res.body.err; if given data is not enough to fulfilled the request
   */
});

describe(`POST ${path}/update/:id`, () => {
  const updatePath = path + "/update";

  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  apiTest()
    .record("post", async store => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );
      const accessToken = await requestAccessToken();

      store.accessToken = accessToken;

      return [updatePath + "/" + userId];
    })
    .record("set", store => ["Authorization", "Bearer " + store.accessToken])
    .send({ username: "5555" })
    .expecttt(200, "User updated")
    .with("updated user document")
    .when("valid user data and access token given")
    .it();

  apiTest()
    .endpoint("post", updatePath + "/" + mongoose.Types.ObjectId())
    .record("set", async () => {
      await User.create(testUser.data);
      const accessToken = await requestAccessToken();

      return ["Authorization", "Bearer " + accessToken];
    })
    .send({ username: "5555" })
    .expecttt(404, "User not found")
    .with("res.body.err")
    .when("given user ID does not exists")
    .it();

  apiTest()
    .record("post", async () => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );

      return [updatePath + "/" + userId];
    })
    .send({ username: "5555" })
    .expecttt(401, "Required JWT token")
    .when("no access token given")
    .it();
});

describe(`PATCH ${path}/:id`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  apiTest()
    .record("patch", async store => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );
      const accessToken = await requestAccessToken();

      store.accessToken = accessToken;

      return [path + "/" + userId];
    })
    .record("set", store => ["Authorization", "Bearer " + store.accessToken])
    .send({ username: "5555" })
    .expecttt(200, "User updated")
    .with("updated user document")
    .when("valid user data and access token given")
    .it();

  apiTest()
    .endpoint("patch", path + "/" + mongoose.Types.ObjectId())
    .record("set", async () => {
      await User.create(testUser.data);
      const accessToken = await requestAccessToken();

      return ["Authorization", "Bearer " + accessToken];
    })
    .send({ username: "5555" })
    .expecttt(404, "User not found")
    .with("res.body.err")
    .when("given user ID does not exists")
    .it();

  apiTest()
    .record("patch", async () => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );

      return [path + "/" + userId];
    })
    .send({ username: "5555" })
    .expecttt(401, "Required JWT token")
    .when("no access token given")
    .it();
});

describe(`PUT ${path}/:id`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  apiTest()
    .record("put", async store => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );
      const accessToken = await requestAccessToken();

      store.accessToken = accessToken;

      return [path + "/" + userId];
    })
    .record("set", store => ["Authorization", "Bearer " + store.accessToken])
    .send({ username: "5555" })
    .expecttt(200, "User updated")
    .with("updated user document")
    .when("valid user data and access token given")
    .it();

  apiTest()
    .endpoint("put", path + "/" + mongoose.Types.ObjectId())
    .record("set", async () => {
      await User.create(testUser.data);
      const accessToken = await requestAccessToken();

      return ["Authorization", "Bearer " + accessToken];
    })
    .send({ username: "5555" })
    .expecttt(404, "User not found")
    .with("res.body.err")
    .when("given user ID does not exists")
    .it();

  apiTest()
    .record("put", async () => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );

      return [path + "/" + userId];
    })
    .send({ username: "5555" })
    .expecttt(401, "Required JWT token")
    .when("no access token given")
    .it();
});

describe(`POST ${path}/delete/:id`, () => {
  const deletePath = `${path}/delete`;

  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  apiTest()
    .record("post", async () => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );

      return [`${deletePath}/${userId}`];
    })
    .record("set", async () => [
      "Authorization",
      "Bearer " + (await requestAccessToken())
    ])
    .expecttt(200, "User deleted", (err, res, done) => {
      if (err) return done(err);

      should.exist(res.body.data.user);

      done();
    })
    .with("delete user document")
    .when("user exists and valid access token given")
    .it();

  apiTest()
    .endpoint("post", deletePath + "/" + mongoose.Types.ObjectId())
    .record("set", async () => {
      await User.create(testUser.data);

      return ["Authorization", "Bearer " + (await requestAccessToken())];
    })
    .expecttt(404, "User not found")
    .when("given user ID does not exist")
    .it();

  apiTest()
    .record("post", async () => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );

      return [deletePath + "/" + userId];
    })
    .expecttt(401, "Required JWT token")
    .when("no access token given")
    .it();
});

describe(`DELETE ${path}/:id`, () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.reset();
    db.disconnect();
  });

  beforeEach(async () => await db.reset());

  apiTest()
    .record("delete", async () => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );

      return [path + "/" + userId];
    })
    .record("set", async () => {
      return ["Authorization", "Bearer " + (await requestAccessToken())];
    })
    .expecttt(200, "User deleted", (err, res, done) => {
      if (err) return done(err);

      should.exist(res.body.data.user);

      done();
    })
    .with("deleted user document")
    .when("valid user ID and access token given")
    .it();

  apiTest()
    .endpoint("delete", path + "/" + mongoose.Types.ObjectId())
    .record("set", async () => {
      await User.create(testUser.data);

      return ["Authorization", "Bearer " + (await requestAccessToken())];
    })
    .expecttt(404, "User not found")
    .when("give user ID does not exists")
    .it();

  apiTest()
    .record("delete", async () => {
      const userId = await User.create(testUser.data).then(doc =>
        doc._id.toString()
      );

      return [path + "/" + userId];
    })
    .expecttt(401, "Required JWT token")
    .when("no access token given")
    .it();
});
