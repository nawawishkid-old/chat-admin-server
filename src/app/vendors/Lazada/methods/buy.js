import Pipeline from "~/src/app/modules/task/Pipeline";
import { By } from "selenium-webdriver";
import logger from "~/src/app/modules/logger/task";
import loadPage from "~/src/app/modules/selenium/pipeline-tasks/load-page";

/*
data: {
  products: [
    {
      url: String,
      quantity: Number,
      checkPrice: Number,
      checkDeliveryRate: {
        postCode: String,
        rate: Number
      }
    }
  ],
  buyNow: Boolean,
}
*/

/**
 * Challenges:
 * - Lazada กำหนดให้สินค้ารายการหนึ่งสั่งได้ไม่เกิน 5 ชิ้นต่อ 1 order ถ้าสั่งมากกว่า 5 ชิ้นต้องทำไง?
 * - ถ้าสั่งหลายรายการต้องทำไง? -- click add-to-cart button then navigates to the next product page
 * - จะเช็กว่าราคาขณะสั่งตรงกับราคาที่คาดหวังยังไง?
 */

// example cURL: curl -d 'productUrl=https://www.lazada.co.th/products/hakone-3-gy-09-4-gy-09-i123119905-s128580403.html&quantity=3&buyNow=true' localhost:11112/v0/vendor/Lazada/method/buy

// Not use lexical environment variable here
const buy = async (driver, data) => {
  console.log("typeof data: ", typeof data);
  console.log("data: ", data);
  const p = new Pipeline({
    data: {
      logger: logger,
      driver: driver,
      // pageUrl: "https://member.lazada.co.th/user/login",
      selectors: {
        quantityInput:
          "#root #module_quantity-input .section-content .next-number-picker-input input[type=text]",
        buyButton:
          "#root #module_add_to_cart .pdp-cart-concern button:first-of-type",
        addToCartButton:
          "#root #module_add_to_cart .pdp-cart-concern button:last-of-type",
        priceText: "#root #module_product_price_1 .pdp-price_type_normal",
        titleText: "#root #module_product_title_1 .pdp-product-title"
      },
      args: data
    }
  });

  if (data.products.length > 1) {
    data.products.forEach(product => {
      loadPage(p, product.url, { name: "Load product page." });
    });
  }

  // Load product page
  loadPage(p, data.productUrl, { name: "Load product page." });
  //  p.add(
  //    async (ctx, next) => {
  //      ctx.pipeline.logger.info(ctx.options.name);
  //
  //      ctx.pipeline.logger.info(`productUrl: ${ctx.pipeline.args.productUrl}`);
  //
  //      await ctx.pipeline.driver.get(ctx.pipeline.args.productUrl);
  //
  //      next();
  //    },
  //    { name: "Load product page." }
  //  );

  p.add(
    async (ctx, next) => {
      ctx.pipeline.logger.info(ctx.options.name);

      const title = await ctx.pipeline.driver
        .findElement(By.css(ctx.pipeline.selectors.titleText))
        .getText();
      let price = await ctx.pipeline.driver
        .findElement(By.css(ctx.pipeline.selectors.priceText))
        .getText();

      price = Number(price.replace(/[^0-9.-]+/g, ""));

      ctx.data = {
        title: title,
        price: price
      };

      if (price > ctx.pipeline.args.checkPrice) {
        throw new Error(
          `Product price is higher than expected: ${price} > ${
            ctx.pipeline.args.checkPrice
          }`
        );
      }

      ctx.pipeline.logger.info(`Product title is "${title.substr(0, 100)}..."`);
      ctx.pipeline.logger.info(`Product price is ${price}`);

      next();
    },
    { name: "Finding product title and price." }
  );

  // Key product quantity
  p.add(
    async (ctx, next) => {
      ctx.pipeline.logger.info(ctx.options.name);
      ctx.pipeline.logger.info(`quantity: ${ctx.pipeline.args.quantity}`);

      if (Number(ctx.pipeline.args.quantity) === 1) {
        next();
        return;
      }

      await ctx.pipeline.driver
        .findElement(By.css(ctx.pipeline.selectors.quantityInput))
        .sendKeys(ctx.pipeline.args.quantity);

      next();
    },
    { name: "#2 Key product quantity." }
  );

  // Click buy or add-to-cart button
  p.add(
    async (ctx, next) => {
      ctx.pipeline.logger.info(ctx.options.name);

      const submitButton = ctx.pipeline.args.buyNow
        ? ctx.pipeline.selectors.buyButton
        : ctx.pipeline.selectors.addToCartButton;

      ctx.pipeline.logger.info(
        `Click ${
          ctx.pipeline.args.buyNow ? "'Buy now'" : "'Add to cart'"
        } button.`
      );

      await ctx.pipeline.driver.findElement(By.css(submitButton)).click();

      next();
    },
    { name: "#3 Click buy or add-to-cart button." }
  );

  return await p.perform();
};

export default buy;
