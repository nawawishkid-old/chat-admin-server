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
    const fullNameInput = await this.getElement("fullName");
    const emailInput = await this.getElement("email");
    const passwordInput = await this.getElement("password");
    const rePasswordInput = await this.getElement("repassword");
    const submitBtn = await this.getElement("submit");

    fullNameInput.sendKeys(fullName);
    emailInput.sendKeys(email);
    passwordInput.sendKeys(password);
    rePasswordInput.sendKeys(password);

    const screenshot = await this.load()
      .takeScreenshot()
      .catch(err => console.log("Error: could not take screenshot", err));

    console.log("Screenshot: ", screenshot);
    // submitBtn.click();

    // return await this.load().then(async () => {
    //   console.log("Authenticating page...");

    //   const element = await this.driver
    //     .findElement(By.css(this.elementSelectors.submit))
    //     .then(() => {
    //       console.log("Page authenticated.");
    //       return true;
    //     })
    //     .catch(err => {
    //    	  console.log("Page unauthenticated.");
    //       return false;
    //     });

    //   console.log(element);
    // });

    this.close();
  };
}

export { SignUpPage };
