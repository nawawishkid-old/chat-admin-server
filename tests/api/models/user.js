const User = require("../../../src/models/User");
const testUser = {
  data: {
    name: "Test #1",
    username: "test1",
    password: "test1",
    email: "test1@test.test"
  },
  create: async data => await User.create(Object.assign(testUser.data, data)),
  remove: async () => await User.remove({})
};

module.exports = testUser;
