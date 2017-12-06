/**
 * Testish base page object implementation
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

const webdriver = require('selenium-webdriver');
const { until } = webdriver;

const { driver, config } = global;

module.exports = class TestishBasePageObject {
  constructor(locators) {
    this.driver = driver;
    this.config = config;
    this.locators = locators;
  }

  /**
   * Finds element by locator
   * @param {css|xpath} locator :: element selector
   **/
  *findElement(locator) {
    const el = yield this.driver.findElement(locator);
    return el;
  }

  /**
   * Finds elements by locator
   * @param {css|xpath} locator :: element selector
   **/
  *findElements(locator) {
    const el = yield this.driver.findElements(locator);
    return el;
  }

  /**
   * Wait until element will be visible
   * @param {css|xpath} locator :: element selector
   * @param {Number} [ms] :: milliseconds to wait
   **/
  *waitUntilVisible(locator, ms = null) {
    const args = [until.elementLocated(locator)];
    if (parseInt(ms, 10)) {
      args.push(ms);
    }
    yield this.driver.wait.apply(this.driver, args);
  }

  /**
   * Wait until element will be visible and click
   * @param {css|xpath} locator :: element selector
   **/
  *waitUntilVisibleAndClick(locator) {
    yield this.waitUntilVisible(locator);
    const el = yield this.findElement(locator);
    yield el.click();
  }

  /**
   * Wait until element is not present
   * @param {css|xpath} locator :: element selector
   **/
  *elementIsNotPresent(locator, timeout = 1000) {
    const condition = new webdriver.Condition(
      `For no element to be located ${locator}`,
      driver => {
        return driver
          .findElements(locator)
          .then((elements = []) => elements.length == 0);
      },
    );
    yield this.driver.wait(condition, timeout);
  }
};
