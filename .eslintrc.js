'use strict';

module.exports = {
  plugins: [
    'node',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended'
  ],
  rules: {
    'node/exports-style': [
      'error', 
      'module.exports'
    ],
    'prettier/prettier': ['error', {
      singleQuote: true,
      trailingComma: 'all',
      bracketSpacing: true,
    }]
  },
  globals: {
    before: true,
    beforeEach: true,
    after: true,
    afterEach: true,
    it: true,
    describe: true
  }
}