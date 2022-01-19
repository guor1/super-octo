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
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: false, // Disallow `const { props, state } = this`; true by default
        allowedNames: ['self', '_this'], // Allow `const self = this`; `[]` by default
      },
    ],
  },
  overrides: [],
}
