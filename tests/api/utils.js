const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

module.exports = Object.freeze({
  chai,
  should
});
