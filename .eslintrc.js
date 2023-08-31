module.exports = {
  'plugins': [
    'eslint-plugin-jest-dom',
    'eslint-plugin-jsx-a11y',
  ],
  'extends': [
    'eslint:recommended',
    'plugin:jest-dom/recommended',
    'plugin:jsx-a11y/recommended',
    'next/core-web-vitals',
    'next',
  ],
  'env': {
    'jest': true,
  },
  'globals': {
    'React': true,
  },
  'rules': {
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'array-bracket-spacing': ['error', 'never'],
  },
};

