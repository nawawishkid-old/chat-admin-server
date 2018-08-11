import "babel-polyfill";
// import './selenium/index';
import Driver from "~/src/drivers/index";
import { Lazada as LazadaClass } from "./websites/Lazada/index";
// import "./Task/index";

// console.log(Lazada);
const Lazada = new LazadaClass(Driver);
// Lazada.addDriver(Driver);
Lazada.signUp(
  "Nawawish Samerpark",
  "nawawish@bitalamail.com",
  "sometingwong555"
).then(() => {
  console.log("Driver.quit()");
  Driver.quit();
});

// Driver.quit();
