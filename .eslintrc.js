module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      version: "16.13.1",
    },
  },
  rules: {
    "object-curly-newline": [
      "error",
      {
        "ObjectExpression": { "multiline": true, "minProperties": 1 },
        "ObjectPattern": { "multiline": true },
        "ImportDeclaration": { "multiline": true, "minProperties": 2 },
        "ExportDeclaration": "never"
      }
    ],
    "eol-last": 2,
    "no-trailing-spaces": 2,
    "comma-dangle": ["error", "only-multiline"],
    "semi": 2,
    "import/order": 2,
    "camelcase": 2,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "react/prop-types": 0,
    "no-unused-expression": 0,
  }
};
