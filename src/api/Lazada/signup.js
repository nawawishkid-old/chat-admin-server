// import Page from "../WebSite/Page";
// import driver from "~/src/drivers/index";
import Pipeline from "~/src/Task/Pipeline";
import TaskBox from "~/src/Task/TaskBox";
import getLoadUrlTask from "../common/loadUrl";
import getDomTask from "../common/dom";
import getSelfieTask from "../common/selfie";

const pipeline = (driver, url, data) => {
  const info = [
    {
      title: "Clicking 'sign up with email' button",
      selector:
        "form .mod-login .mod-login-change-register .mod-change-register-btn button[type=button]",
      action: "click"
    },
    {
      title: "Filling full name form field.",
      selector: "form .mod-login .mod-login-input-name input[type=text]",
      input: data.fullName,
      action: "sendKeys"
    },
    {
      title: "Filling email form field.",
      selector: "form .mod-login .mod-login-input-email input[type=text]",
      input: data.email,
      action: "sendKeys"
    },
    {
      title: "Filling password form field.",
      selector:
        "form .mod-login .mod-login-input-password input[type=password]",
      input: data.password,
      action: "sendKeys"
    },
    {
      title: "Filling re-password form field.",
      selector:
        "form .mod-login .mod-login-input-re-password input[type=password]",
      input: data.password,
      action: "sendKeys"
    },
    {
      title: "Click login button.",
      selector: "form .mod-login .mod-login-btn button[type=submit]",
      action: "click"
    }
  ];

  const loadUrl = new TaskBox(getLoadUrlTask(driver, url));
  const selfie = new TaskBox(
    getSelfieTask(driver, `./storage/Lazada/screenshots/${Date.now()}.png`)
  );
  const taskBoxes = info.map(item => {
    return new TaskBox(getDomTask(driver, item));
  });

  const signUpPipeline = new Pipeline("Sign up", [
    loadUrl,
    ...taskBoxes,
    selfie
  ]);

  signUpPipeline.on("end", () => {
    console.log("END!");
    setTimeout(() => driver.quit(), 2000);
  });

  return signUpPipeline;
};

export default pipeline;
