import Page from "../WebSite/Page";
import driver from "~/src/drivers/index";
import Pipeline from "~/src/Task/Pipeline";
import TaskBox from "../Task/TaskBox";
import getDomTask from "~/src/Task/getDomInteractionTask";
import Task from "../Task/Task2";
import fs from "fs";

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
    input: "Nawawish Samerpark",
    action: "sendKeys"
  },
  {
    title: "Filling email form field.",
    selector: "form .mod-login .mod-login-input-email input[type=text]",
    input: "a@a.com",
    action: "sendKeys"
  },
  {
    title: "Filling password form field.",
    selector: "form .mod-login .mod-login-input-password input[type=password]",
    input: "sometingwong555",
    action: "sendKeys"
  },
  {
    title: "Filling re-password form field.",
    selector:
      "form .mod-login .mod-login-input-re-password input[type=password]",
    input: "sometingwong555",
    action: "sendKeys"
  },
  {
    title: "Click login button.",
    selector: "form .mod-login .mod-login-btn button[type=submit]",
    action: "click"
  }
];

const task0 = new Task(
  {
    title: "Request page",
    callback: async (task, driver, url) => {
      await driver.get(url);
    },
    arguments: [driver, "https://member.lazada.co.th/user/register"]
  },
  { retries: 3, retryAfter: 500 }
);
const selfie = new Task({
  title: "Selfie",
  callback: async (task, driver) => {
    await driver.takeScreenshot().then((img, err) => {
      task.logger(
        "info",
        `Image base64 first 100 chars: ${img.substr(0, 100)}`
      );
      fs.writeFile(
        `./storage/Lazada/screenshots/${Date.now()}.png`,
        img,
        "base64",
        err => {
          if (err) {
            task.logger("error", err.message);
          }
        }
      );
    });
  },
  arguments: [driver]
});

const taskBox0 = new TaskBox(task0);
const selfieTask = new TaskBox(selfie);

const taskBoxes = info.map(item => {
  return new TaskBox(getDomTask(driver, item));
});

const signUpPipeline = new Pipeline("Sign up", [
  taskBox0,
  ...taskBoxes,
  selfieTask
]);

signUpPipeline.on("end", () => {
  console.log("END!");
  setTimeout(() => driver.quit(), 2000);
});

// driver.get("https://member.lazada.co.th/user/register").then(() => {
signUpPipeline.perform();
// });
