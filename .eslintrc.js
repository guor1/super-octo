module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['@antfu'],
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always',
    }],
  },
  overrides: [],
}
