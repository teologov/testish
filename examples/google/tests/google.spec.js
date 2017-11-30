/**
 * This is an example of google tests
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

'use strict';

const { driver } = global;
const { environment } = global.config;

describe('Testing Google', () => {
  before(function*() {
    const { baseURL } = environment;
    yield driver.navigate().to(baseURL);
  });

  it('Should do something', function*() {
    yield function(callback) {
      setTimeout(callback, 3000);
    };
  });
});
