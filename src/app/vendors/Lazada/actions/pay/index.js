import PaymentPage from "~/src/app/vendors/Lazada/pages/Payment";
import ThankYouPage from "~/src/app/vendors/Lazada/pages/ThankYou";
import Pipeline from "~/src/app/modules/task/Pipeline";

const pay = async (driver, data) => {
  const paymentPage = new PaymentPage(driver);
  const p = new Pipeline({
    data: {
      thxPage: undefined
    }
  });

  // Load page.
  p.add(async (ctx, next) => {
    console.log("- Loading page.");
    await paymentPage.load();
    console.log("-- loaded");
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- pay.");
    await paymentPage.pay(data.paymentMethod);
    next();
  });

  p.add(async (ctx, next) => {
    console.log("Load ThankYouPage");
    ctx.pipeline.thxPage = new ThankYouPage(
      driver,
      await driver.getCurrentUrl()
    );
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Get order summary.");
    await ctx.pipeline.thxPage.getOrderSummary();
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Get order number.");
    const orderNumber = await ctx.pipeline.thxPage.getOrderNumber();
    console.log("Order number: ", orderNumber);
    p.setInfo("order", { number: orderNumber });
    next();
  });

  return await p.perform();
};

export default pay;
