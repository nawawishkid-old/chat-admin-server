import "babel-polyfill";
import WebSite from "~/src/WebSite/WebSite";
// import action from "./actions/index";
import page from "./pages/index";

class Lazada extends WebSite {
  constructor(driver) {
    super(driver);

    this.pages = {
      SignUp: page.SignUpPage
    };
  }

  signUp = (...params) => {
    // console.log(this.pages.SignUp);
    const page = new this.pages.SignUp(this.driver);
    return page.signUp(...params);
  };
}

export { Lazada };
