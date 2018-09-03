import Page from "~/src/app/vendors/pages/Page";
import { By } from "selenium-webdriver";
import { URL } from "url";
import logger from "~/src/app/modules/logger/page";

class LazadaPlaceOrderPage extends Page {
  constructor(driver) {
    const base = ".root .summary-section";
    const itemBase = ".root .package";

    super(driver, "https://checkout.lazada.co.th/shipping", {
      placeOrderButton: `${base} .checkout-order-total button.checkout-order-total-button`,
      orderSummaryText: {
        subTotal: `${base} .checkout-summary-row:first-child .checkout-summary-value`,
        shippingFee: `${base} .checkout-summary-row:nth-child(2) .checkout-summary-value`,
        shippingFeeDiscount: `${base} .checkout-summary-row:nth-child(3) .checkout-summary-value`,
        total: `${base} .checkout-order-total-fee`
      },
      voucherInput: {
        element: `#automation-voucher-input`,
        submitButton: `#automation-voucher-input-button`,
        errorMessage: `.voucher-input .voucher-input-message-error`
      },
      item: {
        title: `${itemBase} .cart-item .cart-item-left .content a.title`,
        productPrice: `${itemBase} .cart-item .cart-item-middle .current-price`,
        quantity: `${itemBase} .cart-item .cart-item-right .item-quantity-value`,
        shippingFee: `${itemBase} .delivery-option .delivery-item-price`,
        deliveryDay: `${itemBase} .delivery-option .delivery-item-time`
      },
      state: {
        error: ".checkout-error"
      }
    });

    this.info = {
      //   items: [
      //     {
      //       title: String,
      //       quantity: Number,
      //       productPrice: Number,
      //       shippingFee: Number,
      //       totalPrice: Number,
      //       deliveryDay: {
      //         min: Date,
      //         max: Date
      //       }
      //     }
      //   ],
      price: {
        total: undefined,
        products: undefined,
        shipping: undefined,
        shippingDiscount: undefined
      },
      orderId: undefined
    };
  }

  isCartEmpty = async () => {
    logger.debug("LazadaPlaceOrderPage.isCartEmpty()");

    const elems = await this.driver.findElements(
      By.css(this.selector.state.error)
    );

    return elems.length > 0;
  };

  placeOrder = async () => {
    logger.debug("LazadaPlaceOrderPage.placeOrder()");
    await this._click("placeOrderButton");
  };

  getOrderId = async () => {
    logger.debug("LazadaPlaceOrderPage.getOrderId()");
    const currentUrl = await this.driver.getCurrentUrl();
    const url = new URL(currentUrl);
    const orderId = url.searchParams.get("checkoutOrderId");
    this.info.orderId = orderId;

    console.log("- currentUrl: ", currentUrl, "- orderId: ", orderId);

    return orderId;
  };

  applyVoucher = async code => {
    logger.debug("LazadaPlaceOrderPage.applyVoucher()");
    await this._key("voucherInput.element", code);
    await this._click("voucherInput.submitButton");

    // Require voucher validation checking
  };

  getOrderSummary = async () => {
    logger.debug("LazadaPlaceOrderPage.getOrderSummary()");
    const results = await Promise.all([
      this.getProductsPrice(),
      this.getShippingFee(),
      this.getShippingFeeDiscount(),
      this.getTotalPrice()
    ]);

    this.info.price = {
      products: results[0],
      shipping: results[1],
      shippingDiscount: results[2],
      total: results[3]
    };

    return {
      productPrice: results[0],
      shippingFee: results[1],
      shippingFeeDiscount: results[2],
      totalPrice: results[3]
    };
  };

  // getAllItemsInfo = async () => {
  //   // const items
  // };

  // getItemTitle = async () => {};

  getProductsPrice = async () => {
    logger.debug("- LazadaPlaceOrderPage.getProductsPrice()");
    return await this._getPrice("orderSummaryText.subTotal");
  };

  getShippingFee = async () => {
    logger.debug("- LazadaPlaceOrderPage.getShippingFee()");
    return await this._getPrice("orderSummaryText.shippingFee");
  };

  getShippingFeeDiscount = async () => {
    logger.debug("- LazadaPlaceOrderPage.getShippingFeeDiscount()");
    const discount = await this._getPrice(
      "orderSummaryText.shippingFeeDiscount"
    ).catch(err => logger.debug(err.message));

    return typeof discount !== "number" ? 0 : discount;
  };

  getTotalPrice = async () => {
    logger.debug("- LazadaPlaceOrderPage.getTotalPrice()");
    return await this._getPrice("orderSummaryText.total");
  };

  _getPrice = async selectorKey => {
    return await this._getText(selectorKey, text =>
      Number(text.replace(/[^0-9.-]+/g, ""))
    );
  };
}

export default LazadaPlaceOrderPage;
