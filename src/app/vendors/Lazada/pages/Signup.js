import Page from "~/src/app/vendors/pages/Page";
import logger from "~/src/app/modules/logger/page";

class LazadaSignUpPage extends Page {
  /**
   * SignUp page of Lazada
   *
   * @param {WebDriver} driver Selenium WebDriver instance.
   * @returns {LazadaSignUpPage} LazadaSignUpPage instance
   */
  constructor(driver) {
    super(driver, "https://member.lazada.co.th/user/signup", {
      signupWithEmailButton:
        "form .mod-login .mod-login-change-register .mod-change-register-btn button[type=button]",
      fullNameInput: "form .mod-login .mod-login-input-name input[type=text]",
      emailInput: "form .mod-login .mod-login-input-email input[type=text]",
      passwordInput:
        "form .mod-login .mod-login-input-password input[type=password]",
      rePasswordInput:
        "form .mod-login .mod-login-input-re-password input[type=password]",
      signUpButton: "form .mod-login .mod-login-btn button[type=submit]"
    });
  }

  /**
   * Sign up
   *
   * @public
   * @param {String} type Type of sign up i.e. sign up with email, phone number.
   * @param {Object} data
   * @returns {undefined}
   */
  signUp = async (type, data) => {
    logger.debug("LazadaSignUpPage.signUp()");

    if (type === "email") {
      await this.signUpWithEmail();
    } else if (type === "phoneNumber") {
      await this.signUpWithPhoneNumber();
    } else {
      throw new Error(`Error: Invalid sign up type: ${type}`);
    }
  };

  signUpWithEmail = async data => {
    logger.debug("LazadaSignUpPage.signUpWithEmail()");

    await this._click("signupWithEmailButton");
    await this._key("emailInput", data.email);
    await this._key("fullNameInput", data.fullName);
    await this._key("passwordInput", data.password);
    await this._key("rePasswordInput", data.password);
  };

  signUpWithPhoneNumber = async data => {
    logger.debug("LazadaSignUpPage.signUpWithPhoneNumber()");

    // logic here
  };
}

export default LazadaSignUpPage;
