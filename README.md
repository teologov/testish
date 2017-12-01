# Testish
`Testish` is a minimalistic E2E testing framework powered by `Node.js` among with `selenium-webdriver` `chromedriver`, `Mocha` and `Chai`.

It provides you basic abstractions, utils, and a tests runner. The only thing left, is to write your tests and run them with `Testish`!

## The Idea
The main idea behind this framework is to provide the ability to setup your `E2E` tests as fast as possible with `Node.js` stack. Using `Node.js` as your main stack for E2E tests has some great advantages. First of all, it's easy to support. Frontend developers can easily cover their own features with UI tests, and there is no need to learn Java or Python for writing tests. Secondly, you can run your tests both in usual and headless mode (if your browser supports it).

## How It Works
As mentioned above, `Testish` is a tests runner, which handles routine of tests setup, and running of them in Node. The only thing you should care is to provide your tests and per environment configurations.

Let's review the basic example, which you can find in `./examples` folder of this repo.

```
|____screenshots
| |____google_home_page1512115392165.png
|____config
| |____index.js
| |____production.js
|____tests
| |____google.spec.js
|____index.js
|____authorizationSchemes.js
|____README.md
```

### Tests Folder
To make `Testish` run your tests, you need to create `tests` folder and keep your tests inside it.
#### How Tests Are Executed?
Every time you start framework, `Testish` will add to `Mocha` global hooks first, which handle gracefully starting & failing of your tests. E.g. for every failed test will be created a screenshot. 

Then framework will go to `tests` folder and will find all `.js` files recursively in it. Now it will run all found tests.

### Config Folder
Everything is based on environments.
Currently supported environments are: `'local', 'development', 'staging', 'production'`. Every time you start `Testish`, you should provide the environment.

Obviously, you should export configuration for every environment you run against.

Let's look at the configuration of the example project.

```javascript
// index.js
'use strict';

const production = require('./production');

module.exports = {
  production,
};
```
```javascript
// production.js
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
```
That's basically all configuration parameters which are supported for now.

### Authorization Schemes
`authorizationSchemes.js` file keeps scenarios of how to log in into your application (if you have closed app).

So every time you start your tests, `Testish` will check if there is an authorization scheme for this environment. If yes, it will run it first to log in, and then it will start tests execution.

Here is a very basic example:
```javascript
/**
 * An example of authorization schemes per environment
 */

module.exports = (driver, config) => ({
  *production() {
    // implement your log in scenario here
  }
});
```

## CLI
The framework provides to you `testish` executable.

Execution example: `TEST_ENV=production testish --reporter=spec`.

`Mocha` is executed programmatically, so you can pass any of the supported parameters, as `reporter` above. See all available options [here](https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically#set-options).
