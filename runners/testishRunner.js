/**
 * Testish runner
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

const { ROOT } = global;
const path = require('path');

class TestishRunner {
  constructor(driver, config) {
    this.driver = driver;
    this.config = config;

    this.loggedIn = false;
    this.loadAuthorizationSchemes();
  }

  loadAuthorizationSchemes() {
    const pathToSchemes = path.join(ROOT, 'authorizationSchemes');
    try {
      const authorizationSchemes = require(pathToSchemes);
      this.authorize = authorizationSchemes(this.driver, this.config)[
        global.TEST_ENV
      ];
    } catch (e) {
      // eslint-disable-next-line
      console.log(`No authorization schemes were found at ${pathToSchemes}`);
      this.authorize = Promise.resolve();
    }
  }

  *navigate(url = '') {
    const { baseURL } = this.config.environment;

    if (!this.loggedIn) {
      yield* this.authorize();
      this.loggedIn = true;
    }
    this.driver.navigate().to(path.join(baseURL, url));
  }
}

module.exports = TestishRunner;
