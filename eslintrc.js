module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    require: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    indent: [2, 'tab'],
    'linebreak-style': [2, 'unix'],
    quotes: [2, 'single'],
    semi: [2, 'always'],
    'no-multiple-empty-lines': [2, { max: 2, maxBOF: 1 }],
    'operator-linebreak': [2, 'before']
  }
}
