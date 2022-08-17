const preset = require("eslint-config/eslint-preset")
module.exports = {
  ...preset,
  rules: {
    ...preset.rules,
    camelcase: "off",
  },
}
