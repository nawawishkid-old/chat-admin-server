import signup from "./Lazada/signup";
import driver from "~/src/drivers/index";

const pipeline = signup(driver, "https://member.lazada.co.th/user/register", {
  fullName: "nawiawsh asdkfasdfa",
  email: "a@a.com",
  password: "2320fweri32o"
});

pipeline.perform();
