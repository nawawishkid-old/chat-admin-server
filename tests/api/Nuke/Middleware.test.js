const should = require("chai").should();
const Middleware = require("./Middleware");

describe("Test Middleware.js", () => {
  it("should accepts middleware only if it is a function", () => {
    const mddlwr = new Middleware();
    let hasThrown = false;

    try {
      mddlwr.add("middleware");
    } catch (err) {
      hasThrown = true;
    }

    hasThrown.should.be.true;
  });

  it("should assigns user-given arguments to each registered middleware as arguments", () => {
    const mddlwr = new Middleware();
    let count = 0;
    const counter1 = () => count++;
    const counter2 = () => count++;

    mddlwr.arguments(counter1, counter2);
    mddlwr.add((counter1, counter2, next) => {
      counter1();
      counter2();
      next();
    });
    mddlwr.run();

    count.should.eql(2);
  });

  it("should call next middleware only if the next callback given to current middleware was called", () => {
    const mddlwr = new Middleware();
    let secondIsCalled = false;
    const first = next => {
      next();
    };
    const second = next => {
      secondIsCalled = true;
    };

    mddlwr.add(first);
    mddlwr.add(second);
    mddlwr.run();

    secondIsCalled.should.be.true;
  });

  it("should not run next middleware if the next callback given to current middlware was not called", () => {
    const mddlwr = new Middleware();
    let secondIsCalled = false;
    const first = next => {};
    const second = next => {
      secondIsCalled = true;
    };

    mddlwr.add(first);
    mddlwr.add(second);
    mddlwr.run();

    secondIsCalled.should.be.false;
  });
});
