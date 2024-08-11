import pluginJs from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: { globals: globals.node },
    plugins: {
      perfectionist,
      unicorn: eslintPluginUnicorn,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/no-unknown-property': 0,
      'react/react-in-jsx-scope': 0,
      'prettier/prettier': 'error',
      'perfectionist/sort-imports': 'error',
    },
  },
];
