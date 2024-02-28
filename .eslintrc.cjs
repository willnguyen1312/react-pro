// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "no-restricted-syntax": [
      "warn",
      {
        selector:
          ":matches(CallExpression[callee.object.name='React'][callee.property.name='useEffect'], CallExpression[callee.name='useEffect']) > :matches(ArrowFunctionExpression, FunctionExpression:not([id]))",
        message:
          "Functions passed to `useEffect` must be named to document intent.",
      },
    ],
  },
};
