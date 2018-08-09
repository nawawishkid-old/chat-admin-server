import { Builder, By, Capabilities, until } from "selenium-webdriver";
import Chrome from "selenium-webdriver/chrome";

const url = "https://member.lazada.co.th/user/login";
const productUrl =
  "https://www.lazada.co.th/products/proclean-spin-mop-2-eco-7-180-2-in-1-new-step-asia-i1011392-s1160240.html";

const screen = {
  width: 1366,
  height: 768
};

const Driver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .setChromeOptions(new Chrome.Options().headless().windowSize(screen))
  .build();

Driver.get(url).then(async () => {
  console.log("Page loaded (`" + url + "`)");

  var email = Driver.findElement(By.css(".mod-login input[type=text]"));
  var pass = Driver.findElement(By.css(".mod-login input[type=password]"));
  var submitBtn = Driver.findElement(By.css(".mod-login button[type=submit]"));

  console.log("Email: ", email);
  console.log("Submitting login form...");

  email.sendKeys("nawawish.samerpark@gmail.com");
  pass.sendKeys("nawawishkid@lazada181409943");
  submitBtn.submit();

  console.log("Form submitted");

  await Driver.wait(
    until.elementLocated(By.id("lzd_current_logon_user_name")),
    10000,
    "Wait timeout!"
  )
    .then(() => console.log("SUCCESS: Dashboard page loaded."))
    .catch(() => console.log("FAILED: Cannot load dashboard page."));

  console.log("Close browser");

  Driver.quit();
});
