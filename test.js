'use strict';

const babel =require('@babel/core');
const expect = require('chai').expect;

describe('index', function() {
  const index = require('./');

  it('works', function() {
    expect(index(`module.exports = {}`, 'testx')).to.eql(`module.exports = { reporter: "testx" };`);
  });

  it('fails if it was unable to make a change', function() {
    expect(() => index(`module.exported = {}`, 'testx')).to.throw(/unable to update testem.js's reporter to/);
  });
});

describe('plugin', function() {
  const plugin = require('./plugin');
  it('empty module.exports works', function() {
    const transformed = babel.transform(`module.exports = {}`, {
      plugins: [plugin('xunit')],
      filename: 'testem.js',
      retainLines: true,
    });
    expect(transformed.code).to.eql(`module.exports = { reporter: "xunit" };`);
  });

  it('empty module.exports works with options', function() {
    const transformed = babel.transform(`module.exports = {}`, {
      plugins: [plugin('xunit', { report_file: 'build/test_results.xml', xunit_intermediate_output: true })],
      filename: 'testem.js',
      retainLines: true,
    });
    expect(transformed.code).to.eql(`module.exports = { reporter: "xunit", report_file: "build/test_results.xml", xunit_intermediate_output: true };`);
  });

  it('with existing reporter', function() {
    const transformed = babel.transform(`module.exports = { reporter: 'apple' }`, {
      plugins: [plugin('xunit')],
      filename: 'testem.js',
      retainLines: true,
    });
    expect(transformed.code).to.eql(`module.exports = { reporter: "xunit" };`);
  });

  it('with existing reporter and options', function() {
    const transformed = babel.transform(`module.exports = { reporter: 'apple', report_file: 'siri.apl', xunit_intermediate_output: false }`, {
      plugins: [plugin('xunit', { report_file: 'build/test_results.xml', xunit_intermediate_output: true })],
      filename: 'testem.js',
      retainLines: true,
    });
    expect(transformed.code).to.eql(`module.exports = { reporter: "xunit", report_file: "build/test_results.xml", xunit_intermediate_output: true };`);
  });
});
