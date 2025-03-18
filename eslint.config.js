import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended, // JavaScript 기본 규칙
  ...tseslint.configs.recommended, // TypeScript 기본 규칙
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier: prettierPlugin,
    },
    rules: {
      // React 관련 규칙 적용
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Prettier 관련 규칙 적용
      'prettier/prettier': 'warn',

      // 추가적인 ESLint 규칙
      'react/react-in-jsx-scope': 'off', // Next.js 사용 시 불필요
      'react-hooks/exhaustive-deps': 'warn', // 의존성 배열 검사
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettier,
];
