import Pipeline from "~/src/app/modules/task/Pipeline";
import { By } from "selenium-webdriver";
import logger from "~/src/app/modules/logger/task";

// Not use Closure variable here
const signup = async (driver, data) => {
  console.log("signup()");
  const p = new Pipeline({
    data: {
      logger: logger,
      driver: driver,
      pageUrl: "https://member.lazada.co.th/user/register",
      selectors: {
        signupWithEmailButton:
          "form .mod-login .mod-login-change-register .mod-change-register-btn button[type=button]",
        fullNameInput: "form .mod-login .mod-login-input-name input[type=text]",
        emailInput: "form .mod-login .mod-login-input-email input[type=text]",
        passwordInput:
          "form .mod-login .mod-login-input-password input[type=password]",
        rePasswordInput:
          "form .mod-login .mod-login-input-re-password input[type=password]",
        signupButton: "form .mod-login .mod-login-btn button[type=submit]"
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

  // Click signup with email button
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info("#2 Click signup with email button.");

    await ctx.pipeline.driver
      .findElement(By.css(ctx.pipeline.selectors.signupWithEmailButton))
      .click();

    next();
  });

  // Type user's full name into text field
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info("#3 Type user's full name into text field.");

    await ctx.pipeline.driver
      .findElement(By.css(ctx.pipeline.selectors.fullNameInput))
      .sendKeys(ctx.pipeline.args.fullName);

    next();
  });

  // Type user's email into email field
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info("#4 Type user's email into email field.");

    await ctx.pipeline.driver
      .findElement(By.css(ctx.pipeline.selectors.emailInput))
      .sendKeys(ctx.pipeline.args.email);

    next();
  });

  // Type user's password into password field
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info("#5 Type user's password into password field.");

    await ctx.pipeline.driver
      .findElement(By.css(ctx.pipeline.selectors.passwordInput))
      .sendKeys(ctx.pipeline.args.password);

    next();
  });

  // Type user's password into repassword field
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info("#6 Type user's password into repassword field.");

    await ctx.pipeline.driver
      .findElement(By.css(ctx.pipeline.selectors.rePasswordInput))
      .sendKeys(ctx.pipeline.args.password);

    next();
  });

  // Click signup button
  p.add(async (ctx, next) => {
    ctx.pipeline.logger.info("#7 Click signup button.");

    await ctx.pipeline.driver
      .findElement(By.css(ctx.pipeline.selectors.signupButton))
      .click();

    next();
  });

  return await p.perform();
};

export default signup;
