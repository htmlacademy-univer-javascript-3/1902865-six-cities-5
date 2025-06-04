/* eslint-env node */

module.exports = {
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "htmlacademy/react-typescript",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: 'tsconfig.json' },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/no-implicit-any': 'off',
    '@typescript-eslint/no-explicit-any': 'off',  
   '@typescript-eslint/no-implicit-any': 'off' 
  },
  overrides: [
    {
      files: [ '*test*' ],
      rules: { 
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-implicit-any': 'off'
       }
    },
  ],
}