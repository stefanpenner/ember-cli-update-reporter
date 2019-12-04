# babel-update-ember-cli-test-reporter

A utility to patch testem.js to use a specific reporter.

## Install
```sh
yarn add babel-update-ember-cli-test-reporter
```

## Example

```js
const updater = require('babel-update-ember-cli-test-reporter');

const updatedCode = updater('module.exports = { /* ... */ };', 'xunit');

updateCode === `module.eports = { reporter: "xunit" };`
```


## Usage

update(testemJsContent: string, reporterName:string): string;
