import LoginPage from "~/src/app/vendors/Lazada/pages/Login";
import Pipeline from "~/src/app/modules/task/Pipeline";

/**
 * Login pipeline
 *
 * @param {WebDriver} driver Selenium WebDriver instance.
 * @param {Object} credential Customer's credential object i.e. email or phone number, and password.
 */
const login = async (driver, credential) => {
  const page = new LoginPage(driver);
  const p = new Pipeline("Log in");

  p.add(async (ctx, next) => {
    console.log("- Loading page.");
    await page.load();

    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Logging in.");
    await page.login(credential);

    next();
  });

  return await p.perform();
};

export default login;
