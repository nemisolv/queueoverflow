module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    // for standardize code style with eslint-config-standard
    'standard',
    // for standardize code style with eslint-plugin-tailwindcss
    // 'plugin:tailwindcss/recommended',

    // allow use any type
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    
    'prettier',

  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
   "no-unused-vars": "off",
   "@typescript-eslint/no-unused-vars": ["error"]

  },
}
