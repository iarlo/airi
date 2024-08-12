import pluginJs from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['src-tauri/'], files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  ...pluginQuery.configs['flat/recommended'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      perfectionist,
      unicorn: eslintPluginUnicorn,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': [
        2,
        {
          ignore: [
            'className',
            'variant',
            'size',
            'asChild',
            'children',
            'position',
            'orientation',
            'inset',
            'checked',
            'sideOffset',
            'type',
          ],
        },
      ],
      'react/no-unknown-property': 0,
      'react/react-in-jsx-scope': 0,
      'prettier/prettier': 'error',
      'perfectionist/sort-imports': 'error',
    },
  },
];
