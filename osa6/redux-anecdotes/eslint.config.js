import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    }, plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'no-unused-vars': [ 'error', { varsIgnorePattern: '^[A-Z_]' } ],
      'react-refresh/only-export-components': [ 'warn', { allowConstantExport: true } ],
      '@stylistic/indent': [ 'error', 2 ],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/semi': [ 'error', 'never' ],
      '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
      '@stylistic/jsx-indent-props': [ 'error', 2 ],
      '@stylistic/jsx-quotes': [ 'error', 'prefer-single' ],
      '@stylistic/quotes': [ 'error', 'single' ],
      '@stylistic/comma-spacing': [ 'error', { 'before': false, 'after': true } ],
      '@stylistic/arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
      '@stylistic/jsx-curly-spacing': [ 'error', { 'when': 'always', 'children': true } ],
      '@stylistic/jsx-equals-spacing': [ 'error', 'always' ],
    }
  },
])
