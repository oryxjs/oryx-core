const preset = require("@oryxjs/oryx-eslint-config/eslint-preset")
module.exports = {
  ...preset,
  rules: {
    ...preset.rules,
    camelcase: "off",
  },
}
