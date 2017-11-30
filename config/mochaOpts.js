/**
 * Default Mocha options
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

'use strict';

module.exports = {
  grep: null,
  ui: 'bdd',
  reporter: 'spec',
  timeout: 30000,
  bail: false,
  useColors: false,
  retries: 0,
  slow: 2000,
  ignoreLeaks: false,
  fullTrace: true,
};
