# babel-update-ember-cli-test-reporter

A utility to patch testem.js to use a specific reporter.

```sh
yarn add babel-update-ember-cli-test-reporter
```

```js
const updater = require('babel-update-ember-cli-test-reporter');

const updatedCode = updater('module.exports = { /* ... */ };', 'xunit');

updateCode === `module.eports = { reporter: "xunit" };`
```
