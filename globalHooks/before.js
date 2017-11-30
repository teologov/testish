/**
 * Mocha before global hook
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

'use strict';

const path = require('path');
const del = require('del');

const { screenshotsDir } = global.config;

before(function*() {
  // remove the screenshots dir before the tests will be executed
  yield function(callback) {
    del(path.join(screenshotsDir, '**')).then(() => callback());
  };
});
