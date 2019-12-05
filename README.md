# babel-update-ember-cli-test-reporter

A utility to patch testem.js to use a specific reporter and reporting options.

## Install
```sh
yarn add babel-update-ember-cli-test-reporter
```

## Example

```js
const updater = require('babel-update-ember-cli-test-reporter');

const updatedCode = updater('module.exports = { /* ... */ };', { reporter: 'xunit', report_file: 'test_results.xml' });

updateCode === `module.exports = { reporter: "xunit", report_file: "build/test_results.xml" };`
```

## Usage

```ts
update(testemJsContent: string, reporterOptions: Object<string, {string | boolean}>): string;
```