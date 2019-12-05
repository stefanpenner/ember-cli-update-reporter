# babel-update-ember-cli-test-reporter

A utility to patch testem.js to use a specific reporter and reporting options.

## Install
```sh
yarn add babel-update-ember-cli-test-reporter
```

## Examples

```js
const updater = require('babel-update-ember-cli-test-reporter');

const updatedCode = updater('module.exports = { /* ... */ };', 'xunit');

updateCode === `module.eports = { reporter: "xunit" };`
```

```js
const updater = require('babel-update-ember-cli-test-reporter');

const updatedCode = updater('module.exports = { /* ... */ };', 'xunit', { report_file: 'test_results.xml' });

updateCode === `module.eports = { reporter: "xunit", report_file: "build/test_results.xml" };`
```


## Usage

```ts
update(testemJsContent: string, reporterName: string, [reporterOptions]: Object<string, {string | boolean}>): string;
```