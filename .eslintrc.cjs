module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { project: false, sourceType: 'module' },
  plugins: ['@typescript-eslint', 'import'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  env: { node: true, es2022: true },
  ignorePatterns: ['dist/', 'node_modules/'],
  rules: {
    'import/order': [
      'error',
      { 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } },
    ],
  },
};
