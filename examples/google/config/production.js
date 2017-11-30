/**
 * Production env config
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

'use strict';

const path = require('path');

const browsers = {
  chrome: {
    args: ['--window-size=1400,800' /*'--headless', '--disable-gpu'*/],
    binary: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  },
};

const environment = {
  baseURL: 'https://google.com',
  // loginURL: 'https://google.com'
};

module.exports = {
  browsers,
  environment,
  screenshotsDir: path.join(__dirname, '../screenshots'),
};
