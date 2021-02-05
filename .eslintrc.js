module.exports = {
  env: {
    browser: true,
    jquery: true,
  },
  extends: ['airbnb-base'],
  rules: {
    semi: ['error', 'never'],
  },
  globals: {
    CryptoJS: true,
  },
}
