const jsExtensions = [".js", ".jsx"]
const tsExtensions = [".ts", ".tsx"]
const allExtensions = jsExtensions.concat(tsExtensions)

module.exports = {
  extends: ["universe/web", "universe/node"],
  settings: {
    "import/extensions": allExtensions,
    "import/resolver": {
      "babel-module": {},
      node: {
        extensions: allExtensions,
      },
      typescript: {
        project: "apps/*/tsconfig.json",
      },
    },
  },
  parser: "@typescript-eslint/parser",
  plugins: ["import", "eslint-plugin-import-helpers"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: false,
      },
    ],
    "import/namespace": [
      "error",
      {
        allowComputed: true,
      },
    ],
    camelcase: "error",
    "import/no-unresolved": "error",
    "import-helpers/order-imports": [
      "error",
      {
        newlinesBetween: "always",
        groups: [
          "module",
          ["parent", "sibling", "index"],
        ],
        alphabetize: {
          order: "asc",
          ignoreCase: true,
        },
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
}
