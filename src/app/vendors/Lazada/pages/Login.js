import Page from "~/src/app/vendors/pages/Page";
import logger from "~/src/app/modules/logger/page";

class LazadaLoginPage extends Page {
  /**
   * Login page of Lazada
   *
   * @param {WebDriver} driver Selenium WebDriver instance.
   * @returns {LazadaLoginPage} LazadaLoginPage instance
   */
  constructor(driver) {
    super(driver, "https://member.lazada.co.th/user/login", {
      phoneNumOrEmailInput:
        "form .mod-login .mod-login-input-loginName input[type=text]",
      passwordInput:
        "form .mod-login .mod-login-input-password input[type=password]",
      loginButton: "form .mod-login .mod-login-btn button[type=submit]"
    });
  }

  /**
   * Login
   *
   * @param {Object} credential Customer's credential object i.e. email or phone number, and password.
   * @returns {undefined}
   */
  login = async credentials => {
    logger.debug("LazadaLoginPage.login()");
    const value = credentials.email || credentials.phoneNumber;

    await this._key("phoneNumOrEmailInput", value);
    await this._key("passwordInput", credentials.password);
    await this._click("loginButton");
  };
}

export default LazadaLoginPage;
