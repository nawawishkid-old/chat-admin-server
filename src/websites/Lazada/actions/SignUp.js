import Driver from "~/src/drivers/index";
import { By, Capabilities, until } from "selenium-webdriver";
import Pages from "../pages/index";

// Need exception handler
const ActionSignUp = async () => {
  console.log("Requesting page...");

  await Driver.get(Pages.SignUp.url).then(async () => {
    console.log("Response received.");
    console.log("Authenticating page...");

    const element = Driver.findElement(
      By.css(Pages.SignUp.evidenceElement + "aaa")
    )
      .then(() => console.log("Page authenticated."))
      .catch(err => console.log("Page unauthenticated."));

    // console.log(await element.getTagName());
  });

  Driver.quit();
};

export default ActionSignUp;
