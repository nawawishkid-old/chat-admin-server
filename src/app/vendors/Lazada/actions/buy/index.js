import Pipeline from "~/src/app/modules/task/Pipeline";
import ProductPage from "~/src/app/vendors/Lazada/pages/Product";

/*
data: {
  products: [
    {
      url: String,
      quantity: Number,
      checkPrice: {
        rule: String ('=', '>', '<'),
        price: Number,
      checkDeliveryRate: {
        postCode: String,
        rate: Number
      }
    }
  ]
}
*/
export const buy = async (driver, data) => {
  // console.log("buy()");
  // console.log("data.products: ", data.products);
  // console.log("webdriver: ", driver.constructor.name);

  if (!driver || driver.constructor.name !== "thenableWebDriverProxy") {
    throw new Error(
      "Error: Selenium WebDriver instance has not given, or given but not a Selenium WebDriver instance."
    );
  }

  if (!data.products) {
    throw new Error("Error: Product is empty.");
  }

  const p = new Pipeline();
  let productPages = [];

  data.products.forEach(product => {
    const numPages = Math.ceil(product.quantity / 5);

    for (let i = 0; i < numPages; i++) {
      productPages.push({
        page: new ProductPage(driver, product.url),
        product: product
      });
    }
  });

  productPages.forEach((productPage, index) => {
    const { page, product } = productPage;
    // console.log("page: ", page, "product: ", product);
    console.log("============== ONE ================");

    // Load page.
    p.add(async (ctx, next) => {
      console.log("- Loading page");
      await page.load();
      // Temporary!!!
      await driver.sleep(3000);
      next();
    });

    // Extract all product data from the page.
    p.add(async (ctx, next) => {
      console.log("- Extract all product data from the page.");
      console.log("DATA: ", await page.loadAllData());
      next();
    });

    // Check if the product is available.
    p.add(async (ctx, next) => {
      console.log("- Check if the product is available.");
      if (!page.info.isAvailable) {
        throw new Error("The product is unavailable (may be out of stock).");
      }

      next();
    });

    // Check if price is matched.
    if (product.checkPrice) {
      p.add(async (ctx, next) => {
        console.log("- Check if price is matched.");
        await page.checkPrice(
          product.checkPrice.price,
          product.checkPrice.rule
        );

        if (!page.info.isPriceMatched) {
          throw new Error(
            `Price mismatched: Product price is ${page.info.price}, ${
              product.checkPrice.price
            } is expected.`
          );
        }

        next();
      });
    }

    // Check if delivery rate is matched.
    if (product.checkDeliveryRate) {
      const checkRate = product.checkDeliveryRate;

      // if (
      //   typeof checkRate.postCode === "undefined" ||
      //   typeof checkRate.rate === "undefined"
      // ) {
      //   throw new Error(
      //     "`checkDeliveryRate.postCode` or `checkDeliveryRate.rate` is not given."
      //   );
      // }

      p.add(async (ctx, next) => {
        console.log("- Check if delivery rate is matched.");
        await page.setPostCodeForDeliveryRate(checkRate.postCode);
        await page.checkDeliveryRate(checkRate.rate, checkRate.rule);

        if (!page.info.isDeliveryRateMatched) {
          throw new Error(
            `Delivery rate mismatched: Product delivery rate is ${
              page.info.deliveryRate
            }, ${product.checkDeliveryRate.rate} is expected.`
          );
        }

        next();
      });
    }

    // Set quantity.
    p.add(async (ctx, next) => {
      console.log("- Set quantity.");
      await page.setQuantity(product.quantity);
      next();
    });

    // Add product to card.
    p.add(async (ctx, next) => {
      console.log("- Add product to cart.");
      await page.addToCart();
      next();
    });

    if (index === productPages.length - 1) {
      // Click buy button.
      p.add(async (ctx, next) => {
        console.log("- Click buy button.");
        await page.buy();
        next();
      });
    }
  });

  return await p.perform();
};

export default buy;
