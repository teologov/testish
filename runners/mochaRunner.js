/**
 * Mocha runner
 * @author Andrey Teologov <teologov.and@gmail.com>
 */

'use strict';

const { ROOT } = global;

const path = require('path');
const Mocha = require('mocha');
require('co-mocha');

const argv = require('minimist')(process.argv.slice(2));

const defaultMochaOptions = require('../config/mochaOpts');
const { readFiles } = require('../utils');

const mochaOpts = Object.assign(defaultMochaOptions, argv);
const mocha = new Mocha(mochaOpts);
const testDir = path.join(ROOT, 'tests');
const hooksDir = path.resolve(__dirname, '../globalHooks');

// find all files in the directory recursively and add them to mocha
const testFiles = readFiles(testDir);
const globalHooks = readFiles(hooksDir);
// console.log(globalHooks.concat(testFiles))
// global hooks will be executed first, then all test files will be added
globalHooks.concat(testFiles).forEach(file => mocha.addFile(file));

module.exports = mocha;
