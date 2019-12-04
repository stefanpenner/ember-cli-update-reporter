'use strict';
const babel = require('@babel/core');
const plugin = require('./plugin');

module.exports = function(code, reporterName) {
  const transformed = babel.transform(code, {
    plugins: [plugin(reporterName)],
    filename: 'testem.js',
    retainLines: true,
  });

  if (transformed.code.includes(reporterName)) {
    return transformed.code;
  } else {
    throw new Error(`[babel-update-ember-cli-test-reporter] was unable to update testem.js's reporter to '${reporterName}'`)
  }
};
