# ember-cli-update-reporter

A utility to patch testem.js to use a specific reporter and reporting options.

## Install
```sh
yarn add ember-cli-update-reporter
```

## Example

```js
const updater = require('ember-cli-update-reporter');

const updatedCode = updater('module.exports = { /* ... */ };', { reporter: 'xunit', report_file: 'test_results.xml' });

updateCode === `module.exports = { reporter: "xunit", report_file: "build/test_results.xml" };`
```

## Usage

```ts
update(testemJsContent: string, reporterOptions: Object<string, {string | boolean}>): string;
```
