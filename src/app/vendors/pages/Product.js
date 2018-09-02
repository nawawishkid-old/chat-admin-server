import Page from "~/src/app/vendors/pages/Page";
import { By, Key, until } from "selenium-webdriver";

class ProductPage extends Page {
  constructor(driver, url, selectors) {
    super(driver, url, {
      quantityInput: undefined,
      buyButton: undefined,
      addToCartButton: undefined,
      priceText: undefined,
      titleText: undefined,
      availableClass: undefined,
      deliveryRateText: undefined,
      ...selectors
    });

    this.info = {
      price: undefined,
      deliveryRate: undefined,
      title: undefined,
      quantity: undefined,
      isAvailable: undefined,
      isPriceMatched: undefined,
      isDeliveryRateMatched: undefined
    };
  }

  /**
   * Extract product data from the page.
   */
  loadAllData = async () => {
    const values = await Promise.all([
      this.isAvailable(),
      this.getPrice(),
      this.getDeliveryRate(),
      this.getTitle(),
      this.getQuantity()
    ]);

    return this.info;
  };

  /**
   * ===== Actions =====
   */
  setQuantity = async quantity => {
    if (Number(quantity) === 1) {
      return;
    }

    return this._key("quantityInput", Number(quantity));
  };

  buy = async () => {
    return await this._click("buyButton");
  };

  addToCart = async () => {
    await this._click("addToCartButton");

    return true;
  };

  /**
   * ===== Get product data =====
   */
  checkPrice = async (price, rule) => {
    const productPrice =
      typeof this.info.price === "undefined"
        ? await this.getPrice()
        : this.info.price;
    const result = this._getComparedResult(price, productPrice, rule);

    this.info.isPriceMatched = result;

    return result;
  };

  checkDeliveryRate = async (rate, rule) => {
    const productDeliveryRate =
      typeof this.info.deliveryRate === "undefined"
        ? await this.getDeliveryRate()
        : this.info.deliveryRate;
    const result = this._getComparedResult(rate, productDeliveryRate, rule);

    console.log("result: ", result);

    this.info.isDeliveryRateMatched = result;

    return result;
  };

  isAvailable = async () => {
    let available;

    try {
      await this._find("css", "availableClass");

      // If 'out of stock' element found, it's not available
      available = false;
    } catch (err) {
      available = true;
    }

    this.info.isAvailable = available;

    return available;
  };

  getPrice = async () => {
    const price = await this._getTextAndSetInfo("priceText", "price", price =>
      Number(price.replace(/[^0-9.-]+/g, ""))
    );

    return price;
  };

  getDeliveryRate = async () => {
    const rate = await this._getTextAndSetInfo(
      "deliveryRateText",
      "deliveryRate",
      rate => Number(rate.replace(/[^0-9.-]+/g, ""))
    );

    console.log("RATE: ", rate);

    return rate;
  };

  getTitle = async () => {
    const title = await this._getTextAndSetInfo("titleText", "title");

    return title;
  };

  getQuantity = async () => {
    const quantity = await this._getTextAndSetInfo("quantityInput", "quantity");

    return quantity;
  };

  /**
   * ===== Private helper methods =====
   */
  _getComparedResult = (first, second, rule) => {
    let result;

    switch (rule) {
      case "=":
        result = first === second;
        break;

      case ">":
        result = first >= second;
        break;

      case "<":
        result = first <= second;
        break;

      default:
        result = first === second;
        break;
    }

    return result;
  };
}

export default ProductPage;
