import Pipeline from "~/src/app/modules/task/Pipeline";
import { By } from "selenium-webdriver";
import logger from "~/src/app/modules/logger/task";

// Not use Closure variable here
const login = async (driver, data) => {
  console.log("login()");
  const p = new Pipeline({
    data: {
      logger: logger,
      driver: driver,
      pageUrl: "https://member.lazada.co.th/user/login",
      selectors: {
        phoneNumOrEmailInput:
          "form .mod-login .mod-login-input-loginName input[type=text]",
        passwordInput:
          "form .mod-login .mod-login-input-password input[type=password]",
        loginButton: "form .mod-login .mod-login-btn button[type=submit]"
      },
      args: data
    }
  });

  // Load page
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info("#1 Load page.");

    await ctx.pipeline.driver.get(ctx.pipeline.pageUrl);

    next();
  });

  // Type user's email or phone number into text field
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info(
      "#2 Type user's email or phone number into text field."
    );

    const input = ctx.pipeline.args.email || ctx.pipeline.args.phoneNumber;

    await ctx.pipeline.driver
      .findElement(By.css(ctx.pipeline.selectors.phoneNumOrEmailInput))
      .sendKeys(input);

    next();
  });

  // Type user's password into password field
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info("#3 Type user's password into password field.");

    await ctx.pipeline.driver
      .findElement(By.css(ctx.pipeline.selectors.passwordInput))
      .sendKeys(ctx.pipeline.args.password);

    next();
  });

  // Click login button
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info("#4 Click login button.");

    await ctx.pipeline.driver
      .findElement(By.css(ctx.pipeline.selectors.loginButton))
      .click();

    next();
  });

  return await p.perform();
};

export default login;
