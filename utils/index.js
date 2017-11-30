/**
 * Testish utils
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Creates a thunk
 * @param  {Function} fn
 * @return {Function}
 */
const thunkify = fn => (...args) => cb => {
  args.push(cb);
  return fn.apply(this, args);
};

/**
 * Finds all .js files recursively
 */
const readFiles = (dir, res = [], extension = 'js') => {
  const files = fs.readdirSync(dir);
  for (let i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      readFiles(name, res);
    } else if (fs.statSync(name).isFile()) {
      if (!name.endsWith(`.${extension}`)) {
        continue;
      }
      res.push(name);
    }
  }
  return res;
};

module.exports = {
  *wait(ms = 0) {
    yield function(callback) {
      setTimeout(callback, ms);
    };
  },
  *takeScreenshot(driver, fileName, destinationPath) {
    const mkdir = thunkify(fs.mkdir);
    const writeFile = thunkify(fs.writeFile);

    const image = yield driver.takeScreenshot();
    const finalFile = `${path.join(destinationPath, `${fileName}.png`)}`;

    try {
      yield mkdir(destinationPath);
      yield writeFile(finalFile, image, 'base64');
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  },
  readFiles,
};
