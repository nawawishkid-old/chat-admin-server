import Page from "~/src/WebSite/Page";
import { By } from "selenium-webdriver";

class SignUpPage extends Page {
  elementSelectors = {
    submit: "form .mod-login .mod-change-register-btn button",
    fullName: "form .mod-login .mod-login-input-name input[type=text]",
    email: "form .mod-login .mod-login-input-email input[type=text]",
    password: "form .mod-login .mod-login-input-password input[type=password]",
    repassword:
      "form .mod-login .mod-login-input-re-password input[type=password]"
  };

  constructor(driver) {
    super(driver, "SignUp", "https://member.lazada.co.th/user/register");
  }

  signUp = async (fullName, email, password) => {
    await this.load();

    console.log('findElem: ', this.task.findElement);

    const elem = await this.task.findElement
      .config({ retries: 3, retryAfter: 500 })
      .perform(this.driver, this.elementSelectors.fullName);

    console.log('ELEM: ', elem);

    // const fullNameInput = await this.getElement("fullName").then(elem =>
    //   elem.sendKeys(fullName)
    // );
    // .catch(err =>
    //   console.log("ERROR: ", err)
    // );
    // const emailInput = await this.getElement("email");
    // const passwordInput = await this.getElement("password");
    // const rePasswordInput = await this.getElement("repassword");
    // const submitBtn = await this.getElement("submit");

    // await Promise.all([
    //   fullNameInput.sendKeys(fullName)
    //   emailInput.sendKeys(email),
    //   passwordInput.sendKeys(password),
    //   rePasswordInput.sendKeys(password)
    // ])
    //   .then(async value => await this.selfie())
    //   .catch(err => console.log(err));

    this.close();
  };
}

export { SignUpPage };
