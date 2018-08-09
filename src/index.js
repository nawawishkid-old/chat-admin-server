import "babel-polyfill";
// import './selenium/index';
import Driver from "~/src/drivers/index";
import { Lazada as LazadaClass } from "./websites/Lazada/index";

// console.log(Lazada);
const Lazada = new LazadaClass(Driver);
// Lazada.addDriver(Driver);
Lazada.signUp()
  .then(() => {
     console.log('Driver.quit()');
     Driver.quit();
  });

// Driver.quit();
