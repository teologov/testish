/**
 * Testish lib implementation
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

'use strict';

require('chromedriver');

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const chalk = require('chalk');
const co = require('co');

const ROOT = argv.root ? path.resolve(process.cwd(), argv.root) : process.cwd();

const environments = require('./config/envs');
const env = (global.TEST_ENV = process.env['TEST_ENV']);

if (!environments.includes(env)) {
  throw new Error(
    chalk.bold.red(
      `Please, set TEST_ENV with one of the supported environments: ${environments.join(
        ',',
      )}`,
    ),
  );
}

const webdriver = require('selenium-webdriver');
const chai = require('chai');
const config = require(path.join(ROOT, 'config'))[env];
const { takeScreenshot } = require('./utils');

// set chrome options
const chromeCapabilities = webdriver.Capabilities.chrome();
const { chrome } = config.browsers;
chromeCapabilities.set('chromeOptions', chrome);
// create driver
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .withCapabilities(chromeCapabilities)
  .build();

// global variables
global.ROOT = ROOT;
global.expect = chai.expect;
global.driver = driver;
global.config = config;
global.takeScreenshot = function*(specName = '') {
  const timestamp = new Date().getTime();
  yield takeScreenshot(
    driver,
    `${specName}${timestamp}`,
    config.screenshotsDir,
  );
};

const TestishRunner = require('./runners/testishRunner');
global.testishRunner = new TestishRunner(driver, config);

// run tests
const mocha = require('./runners/mochaRunner');
mocha.run(failures => {
  co(function*() {
    yield driver.quit();
  })
    .catch(e => {
      // eslint-disable-next-line
    console.error(e);
    })
    .then(() => {
      // eslint-disable-next-line
    process.exit(failures); // exit with non-zero status if there were failures
    });
});
