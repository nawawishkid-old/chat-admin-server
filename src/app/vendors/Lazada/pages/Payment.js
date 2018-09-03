import Page from "~/src/app/vendors/pages/Page";
import { By } from "selenium-webdriver";
import logger from "~/src/app/modules/logger/page";

class LazadaPaymentPage extends Page {
  constructor(driver, orderId) {
    super(
      driver,
      `https://checkout.lazada.co.th/payment-cashier?checkoutOrderId=${orderId}`,
      {
        cashOnDelivery: {
          element: `.payment-method-list .automation-payment-method-item:first-of-type`,
          title: `.payment-method-list .automation-payment-method-item:first-of-type .title`,
          submitButton: `.pay-method-wrap-content .btn-place-order-wrap button.btn-place-order`
        }
      }
    );
  }

  pay = async method => {
    logger.debug("LazadaPaymentPage.pay()");
    await this[`_${method}`]();
  };

  _cashOnDelivery = async () => {
    logger.debug("LazadaPaymentPage.cashOnDelivery()");

    await this._click("cashOnDelivery.element");
    await this.waitUntil(
      "elementLocated",
      [By.css(this.selectors.cashOnDelivery.submitButton)],
      10000
    );
    await this._click("cashOnDelivery.submitButton");
  };
}

export default LazadaPaymentPage;
