# babel-update-ember-cli-test-reporter

A utility to patch testem.js to use a specific reporter.

```
yarn add babel-update-ember-cli-test-reporter
```

```
const updater = require('babel-update-ember-cli-test-reporter');

updater('module.exports = { /* ... */ };', 'xunit');

// => module.eports = { reporter: "xunit" };
```
