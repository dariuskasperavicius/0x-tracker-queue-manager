module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    node: true,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'warn',
  },
};
