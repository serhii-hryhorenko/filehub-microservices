module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'overrides': [],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'jsdoc',
  ],
  'rules': {
    'valid-jsdoc': ['error', {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: {return: 'returns'},
    }],
    'max-len': ['error', {code: 120}],
    'no-console': 'error',
    'no-debugger': 'error',

    'jsdoc/check-access': 'error',
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-property-names': 'error',
    'jsdoc/check-tag-names': 'error',
    'jsdoc/check-types': 'error',
    'jsdoc/check-values': 'error',
    'jsdoc/empty-tags': 'error',
    'jsdoc/implements-on-classes': 'error',
    'jsdoc/multiline-blocks': 'error',
    'jsdoc/no-multi-asterisks': 'error',
    'jsdoc/no-undefined-types': 'error',
    'jsdoc/require-asterisk-prefix': 'error',
    'jsdoc/require-description': [
      'error',
      {
        exemptedBy: ['inheritDoc', 'private'],
        checkConstructors: false,
        checkGetters: false,
        checkSetters: false
      }
    ],
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-hyphen-before-param-description': 'error',
    'jsdoc/require-jsdoc': ['error', {
      exemptEmptyConstructors: true,
      checkGetters: false,
    }],
    'jsdoc/require-param': 'error',
    'jsdoc/require-param-name': 'error',
    'jsdoc/require-param-type': 'error',
    'jsdoc/require-property': 'error',
    'jsdoc/require-property-name': 'error',
    'jsdoc/require-property-type': 'error',
    'jsdoc/require-returns': 'error',
    'jsdoc/require-returns-check': 'error',
    'jsdoc/require-returns-type': 'error',
    'jsdoc/require-throws': 'error',
    'jsdoc/require-yields': 'error',
    'jsdoc/require-yields-check': 'error',
    'jsdoc/sort-tags': 'error',
    'jsdoc/tag-lines': 'error',
    'jsdoc/valid-types': 'error',
  },
};