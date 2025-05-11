import eslint from '@eslint/js';
import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    /**
     * Let DTS typings checks work against the JS files without the "no-undef" ruke of plain eslint JS checks
     */
    // overrides: [
    //   {
    //     files: ['*.js', '*.ts', '*.d.ts'],
    //     rules: {
    //       'no-undef': 'off',
    //     },
    //   },
    // ],
  },
  /**
   * ESLint recommended config for all files
   */
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        api: 'readonly',
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      promise: eslintPluginPromise,
      import: eslintPluginImport,
      '@stylistic/js': stylisticJs,
    },
    /**
     * Custom defined rules
     */
    rules: {
      "no-multiple-empty-lines": ["error", {
        "max": 1,
        "maxEOF": 1,
        "maxBOF": 0,
      }],
      ...eslintPluginPromise.configs.recommended.rules,
      "prettier/prettier": 0,
      "indent": ["error", 2, { "SwitchCase": 1 }],
      '@stylistic/js/semi': ['error', 'always'],
      "object-curly-spacing": ["error", "always"],
      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "never",
        },
      ],
      "no-promise-executor-return": "error",
      /** [Disallow using an async function as a Promise executor](https://eslint.org/docs/latest/rules/no-async-promise-executor) */
      "no-async-promise-executor": "error",
      // https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/prefer-await-to-then.md
      "promise/prefer-await-to-then": 0,
      // https://github.com/xjamundx/eslint-plugin-promise/blob/development/docs/rules/prefer-await-to-callbacks.md
      "promise/prefer-await-to-callbacks": 0,
      "max-len": [
        "error",
        {
          code: 140,
          tabWidth: 2,
          ignoreUrls: true,
        },
      ],
      "brace-style": ["error", '1tbs', { "allowSingleLine": true }],
      "keyword-spacing": ["error", {
        // "before": true,
        "after": true,
      }],
      // "array-bracket-spacing": [ "error", "always" ],
      // "func-call-spacing": ["error", "never"],
      // 'space-in-parens': ['error', 'never'],
      "newline-per-chained-call": [
        "error",
        {
          ignoreChainWithDepth: 2,
        },
      ],
    },
  },
];
