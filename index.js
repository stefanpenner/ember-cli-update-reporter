'use strict';

const babel = require('@babel/core');
const plugin = require('./plugin');

module.exports = function(code, reporterOptions) {
  const transformed = babel.transform(code, {
    plugins: [plugin(reporterOptions)],
    filename: 'testem.js',
    retainLines: true,
  });

  Object.keys(reporterOptions).forEach(key => {
    if (!transformed.code.includes(reporterOptions[key])) {
      throw new Error(`[babel-update-ember-cli-test-reporter] was unable to update testem.js's reporter`);
    }
  });

  return transformed.code;
};
