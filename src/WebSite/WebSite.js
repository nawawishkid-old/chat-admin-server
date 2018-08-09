class WebSite {
  /**
   *
   * @param {*} driver Selenium webdriver Builder instance
   * @param {String} domain Web domain name e.g. google.com, socket.io, www.lazada.co.th
   */
  constructor(driver) {
    this.driver = driver;
    // this.domain = domain;
    this.pages = {};
  }

  quit = () => {
    this.driver.quit();
  }
}

export default WebSite;
