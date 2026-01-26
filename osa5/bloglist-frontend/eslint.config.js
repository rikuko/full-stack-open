/* https://eslint.org/ */
/* https://eslint.style/rules */

import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: [ 'dist' ] },
  {
    files: [ '**/*.{js,jsx}' ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [ 'warn', { allowConstantExport: true } ],
      'react/jsx-closing-bracket-location': [ 'error', 'line-aligned' ],

      'indent': [ 'error', 2 ],
      'quotes': [ 'error', 'single' ],
      'jsx-quotes': [ 'error', 'prefer-single' ],

      'semi': [ 'error', 'never' ],
      'linebreak-style': [ 'error', 'unix' ],
      'array-bracket-newline': [ 'warn', 'consistent' ],
      'array-bracket-spacing': [ 'warn', 'always' ],
      'array-element-newline': [ 'warn', 'consistent' ],

      'max-len': [ 'error', { 'code': 120 } ],
      'object-curly-spacing': [ 'error', 'always' ],
      'arrow-spacing': [ 'error', { before: true, after: true } ],

      'comma-dangle': [ 'warn', 'never' ],
      'comma-spacing': [ 'warn', { 'before': false, 'after': true } ],
      'comma-style': [ 'error', 'last' ],
      'lines-around-comment': [ 'error', { 'beforeBlockComment': true, 'beforeLineComment': true } ],
      'multiline-comment-style': [ 'error', 'starred-block' ],

      'no-unused-vars': [ 'error', { varsIgnorePattern: '^[A-Z_]' } ],
      'no-trailing-spaces': 'error',
      'no-console': 'off',

      'react/prop-types': [ 'off', { ignore: [] } ],
      eqeqeq: 'error'
    }
  }
]
