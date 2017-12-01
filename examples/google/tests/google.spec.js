/**
 * This is an example of google tests
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

'use strict';

const { driver, config: { environment }, takeScreenshot } = global;

describe('Testing Google', () => {
  it('Should open google.com', function*() {
    const { baseURL } = environment;
    yield driver.navigate().to(baseURL);
    // will save the screenshot to examples/google/screenshots directory
    yield* takeScreenshot('google_home_page');
    yield function(callback) {
      setTimeout(callback, 3000);
    };
  });
});
