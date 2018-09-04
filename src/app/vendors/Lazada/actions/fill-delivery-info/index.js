import DeliveryInfoPage from "~/src/app/vendors/Lazada/pages/DeliveryInfo";
import Pipeline from "~/src/app/modules/task/Pipeline";

/*
{
  fullName: String,
  address: String,
  province: String,
  phoneNumber: String,
  district: String,
  postCode: Number
}
*/
const fillDeliveryInfo = async (driver, data) => {
  const page = new DeliveryInfoPage(driver);
  const p = new Pipeline();

  // Load page.
  p.add(async (ctx, next) => {
    console.log("- Loading page.");
    await page.load();
    console.log("-- loaded");
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Fill name.");
    await page.fill("fullName", data.fullName);
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Fill address.");
    await page.fill("address", data.address);
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Fill phone number.");
    await page.fill("phoneNumber", data.phoneNumber);
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Select province.");
    await page.selectLocation("province", data.province);
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Select district.");
    await page.selectLocation("district", data.district);
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Select postCode.");
    await page.selectLocation("postCode", data.postCode);
    next();
  });

  // Save billing info
  p.add(async (ctx, next) => {
    console.log("- Save billing info.");
    await page.save();

    next();
  });

  return await p.perform();
};

export default fillDeliveryInfo;
