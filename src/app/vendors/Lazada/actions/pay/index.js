import PaymentPage from "~/src/app/vendors/Lazada/pages/Payment";
import ThankYouPage from "~/src/app/vendors/Lazada/pages/ThankYou";
import Pipeline from "~/src/app/modules/task/Pipeline";

const pay = async (driver, data) => {
  const page = new PaymentPage(driver, data.orderId);
  const p = new Pipeline();

  // Load page.
  p.add(async (ctx, next) => {
    console.log("- Loading page.");
    await page.load();
    console.log("-- loaded");
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- pay.");
    await page.pay(data.paymentMethod);
    next();
  });

  p.add(async (ctx, next) => {
    console.log("Load ThankYouPage");
    await page.waitUntil(
      "urlContains",
      ["https://checkout.lazada.co.th/order-received-new"],
      10000,
      "Could not reach ThankYou page."
    );
    p.temp("thxPage", new ThankYouPage(driver, await driver.getCurrentUrl()));
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Get checkout summary.");
    console.log(await p.temp("thxPage").getCheckoutSummary());
    next();
  });

  p.add(async (ctx, next) => {
    console.log("- Get order number.");
    const checkoutNumber = await p.temp("thxPage").getCheckoutNumber();
    console.log("Order number: ", checkoutNumber);
    p.setInfo("order", { number: checkoutNumber }, true);
    next();
  });

  return await p.perform();
};

export default pay;
