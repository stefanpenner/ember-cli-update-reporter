'use strict';

module.exports = function(reporterName) {
  return function(babel) {
    const { types: t } = babel;

    return {
      name: 'babel-update-ember-cli-test-reporter',
      visitor: {
        AssignmentExpression(path) {
          const exports = path.node.left;
          const exported = path.node.right;

          if (
            // an assignment in the module body
            t.isProgram(path.parentPath.parent) &&
            // to module
            exports.object.name === 'module' &&
            // on the property exports (module.exports =)
            exports.property.name === 'exports' &&
            // as an object expression
            t.isObjectExpression(exported)
          ) {
            const reporterValue = t.stringLiteral(reporterName);
            const properties = exported.properties;
            // check to see if an existing reporter is specified
            const reporter = properties.find(property => property.key.name === 'reporter');

            if (reporter) {
              // has a reporter, let's change it to xunit:
              reporter.value = reporterValue;
            } else {
              // has no reporter, let's add one:
              properties.push(t.objectProperty(t.identifier('reporter'), reporterValue));
            }
          }
        }
      }
    };
  };
}
