import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    plugins: {
        '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
        parser: tsParser,
    },
}, ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
).map(config => ({
    ...config,
    files: ['**/*.ts'],
    ignores: ['**/*.d.ts'],
})), {
    files: ['**/*.ts'],
    ignores: ['**/*.d.ts'],

    languageOptions: {
        ecmaVersion: 5,
        sourceType: 'script',

        parserOptions: {
            project: './tsconfig.json',
        },
    },

    rules: {
        'no-constant-condition': ['error', {
            checkLoops: false,
        }],

        'no-debugger': 'warn',  // no error
        'no-inner-declarations': 'off',  // allow functions inside blocks
        'no-loss-of-precision': 'warn',
        'no-promise-executor-return': 'warn',
        'no-mixed-spaces-and-tabs': 'off',  // allow smart tabs

        quotes: ['warn', 'single', {
            avoidEscape: true,
        }],

        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'off',  // allow e.g. 'never' | 'secure' | string | 'insecure'
    },
}];