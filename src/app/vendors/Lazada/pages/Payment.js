import Page from "~/src/app/vendors/pages/Page";
import logger from "~/src/app/modules/logger/page";

class LazadaPaymentPage extends Page {
  constructor(driver) {
    const base = ".root .summary-section";

    super(driver, "https://checkout.lazada.co.th/shipping", {
      cashOnDelivery: {
        element: `#automation-payment-method-item-7`,
        title: `#automation-payment-method-item-7 .title`,
        submitButton: `.pay-method-wrap-content .btn-place-order-wrap button.btn-place-order`
      }
    });
  }

  pay = async method => {
    logger.debug("LazadaPaymentPage.pay()");
    await this[`_${method}`]();
  };

  _cashOnDelivery = async () => {
    logger.debug("LazadaPaymentPage.cashOnDelivery()");

    await this._click("cashOnDelivery.element");
    await this._click("cashOnDelivery.submitButton");
  };
}

export default LazadaPaymentPage;
