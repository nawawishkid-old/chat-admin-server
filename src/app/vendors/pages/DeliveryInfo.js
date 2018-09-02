import Page from "~/src/app/vendors/pages/Page";

class DeliveryInfoPage extends Page {
  constructor(driver, url, selectors) {
    super(driver, url, {
      fullNameInput: undefined,
      phoneNumberInput: undefined,
      addressInput: undefined,
      provinceSelect: undefined,
      districtSelect: undefined,
      postCodeSelect: undefined,
      saveButton: undefined,
      ...selectors
    });
  }

  fill = async (inputName, data) => {
    const selectorKey = this.selectors[`${inputName}Input`]
      ? `${inputName}Input`
      : `${inputName}Select`;

    await this._key(selectorKey, data);
  };

  fillAll = async data => {
    for (let key in data) {
      await this.fill(key, data[key]);
    }
  };

  save = async () => {
    await this._click("saveButton");
  };
}

export default DeliveryInfoPage;
