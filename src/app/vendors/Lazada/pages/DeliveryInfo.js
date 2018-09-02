import { until, By } from "selenium-webdriver";
import DeliveryInfoPage from "~/src/app/vendors/pages/DeliveryInfo";

class LazadaDeliveryInfoPage extends DeliveryInfoPage {
  constructor(driver) {
    const base = ".root form .mod-address-form";

    super(driver, "https://checkout.lazada.co.th/shipping", {
      fullNameInput: `${base} .mod-input-name input[type=text]`,
      phoneNumberInput: `${base} .mod-input-phone input[type=number]`,
      addressInput: `${base} .mod-input-detailAddress input[type=text]`,
      provinceSelect: `${base} .mod-select-location-tree-1 span.next-select-inner`,
      districtSelect: `${base} .mod-select-location-tree-2 span.next-select-inner`,
      postCodeSelect: `${base} .mod-select-location-tree-3 span.next-select-inner`,
      locationOptionElement: "ul.next-menu-content",
      saveButton: `${base} .mod-address-form-action button[type=submit]`,
      placeOrderButton: `.root .summary-section .checkout-order-total button.checkout-order-total-button`,
      xPath: {
        location: "//ul[@class='next-menu-content']/li[contains(@name, '%s')]"
      }
    });
  }

  // selectProvince = async province => {
  //   await this._find("css", "provinceSelect").click();
  //   await this._find("xpath", this._generateXPath("location", province));
  // };

  // selectDistrict = async district => {
  //   await this.driver.wait(async driver => {
  //     await this._find('css', 'districtSelect.e')
  //   })
  //   await this.selectLocation('district', district);
  //   // await this._find("css", "districtSelect").click();
  //   // await this._find("xpath", this._generateXPath("location", district));
  // };

  selectLocation = async (type, value) => {
    if (type !== "province") {
      // Wait for the elment to be enabled.
      await this.driver.sleep(3000);
    }

    const select = await this._click(`${type}Select`);

    // select.click();

    await this.driver.wait(
      until.elementLocated(By.css(this.selectors.locationOptionElement)),
      10000
    );

    await this._click("xPath.location", "xpath", (key, selector) =>
      selector.replace("%s", value)
    );
  };

  placeOrder = async () => {
    const placeOrderButtonPromise = this._find("css", "placeOrderButton");

    await this.driver.wait(
      until.elementIsEnabled(placeOrderButtonPromise),
      5000,
      "Element is not enabled."
    );

    (await placeOrderButtonPromise).click();
  };
}

export default LazadaDeliveryInfoPage;
