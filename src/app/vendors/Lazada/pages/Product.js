import ProductPage from "~/src/app/vendors/pages/Product";
import { Key, By, until } from "selenium-webdriver";

class LazadaProductPage extends ProductPage {
  constructor(driver, url) {
    super(driver, url, {
      quantityInput:
        "#root #module_quantity-input .section-content .next-number-picker-input input[type=text]",
      buyButton:
        "#root #module_add_to_cart .pdp-cart-concern button:first-of-type",
      addToCartButton:
        "#root #module_add_to_cart .pdp-cart-concern button:last-of-type",
      cartModalElement: ".cart-modal",
      cartModalCloseButton: ".cart-dialog a.next-dialog-close",
      priceText: "#root #module_product_price_1 .pdp-price_type_normal",
      titleText: "#root #module_product_title_1 .pdp-product-title",
      availableClass:
        "#root #module_quantity-input .section-content .next-number-picker-disabled .quantity-content-warning",
      changeDeliveryRatePostCodeButton:
        "#root #module_seller_delivery .location__link-change a.location-link",
      deliveryRatePostCodeInput:
        "#root #module_seller_delivery form.location-postcode__form .location-postcode__input input[type=text]",
      deliveryRatePostCodeError:
        "#root #module_seller_delivery form.location-postcode__form .location-postcode__input.error",
      deliveryRateText:
        "#root #module_seller_delivery .delivery__content .delivery-option-item_type_standard .delivery-option-item__shipping-fee"
    });
  }

  addToCart = async () => {
    console.log("-- Click button");
    await this._click("addToCartButton");

    const waitTime = 10000;
    let modal;

    // console.log("-- Get cart modal WebElementPromise");
    // modal = this.driver.findElement(by);

    console.log("-- Wait for cart modal to appear");
    await this.driver.wait(
      until.elementLocated(By.css(this.selectors.cartModalElement)),
      waitTime
    );

    // Close cart modal.
    console.log("-- Close cart modal");
    await this._click("cartModalCloseButton");
    // await this.driver
    //   .actions()
    //   .sendKeys(Key.ESCAPE)
    //   .perform();

    console.log("-- Get cart modal WebElementPromise");
    modal = this.driver.findElement(By.css(this.selectors.cartModalElement));

    // await modal.sendKeys(Key.ESCAPE);

    // modal = this.driver.findElement(by);
    // Wait until cart modal disappear.
    await this.driver.wait(until.elementIsNotVisible(modal), waitTime);

    return true;
  };

  setPostCodeForDeliveryRate = async postCode => {
    await this._click("changeDeliveryRatePostCodeButton");
    // await this._key(this.selectors.deliveryRatePostCodeInput, postCode, false);

    const elem = await this._getElem(this.selectors.deliveryRatePostCodeInput);

    await elem.sendKeys(postCode, Key.ENTER);
    // await this.driver.wait(
    //   until.elementIsVisible(
    //     By.css(this.selectors.changeDeliveryRatePostCodeButton)
    //   ),
    //   5000
    // );
    await this.driver.sleep(3000);
    // const actions = this.driver.actions();

    // actions.sendKeys(Key.ENTER);
    // await actions.perform();
  };
}

export default LazadaProductPage;
