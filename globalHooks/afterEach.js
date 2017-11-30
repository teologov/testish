/**
 * Mocha afterEach global hook
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

'use strict';

afterEach(function*() {
  // take screenshot if test failed
  if (this.currentTest.state === 'failed') {
    yield global.takeScreenshot(this.currentTest.title);
  }
});
