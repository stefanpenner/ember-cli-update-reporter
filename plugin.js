'use strict';

module.exports = function(reporterOptions) {
  return function(babel) {
    const { types: t } = babel;

    function addOrReplaceProperty(properties, name, value) {
      const property = properties.find(property => property.key.name === name);
      if (property) {
        property.value = value;
      } else {
        properties.push(t.objectProperty(t.identifier(name), value));
      }
    }

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
            const properties = exported.properties;

            Object.keys(reporterOptions).forEach(key => {
              const value = reporterOptions[key];
              const optionValue = (typeof value === 'boolean') ? t.booleanLiteral(value) : t.stringLiteral(value);
              addOrReplaceProperty(properties, key, optionValue);
            });
          }
        }
      }
    };
  };
}

