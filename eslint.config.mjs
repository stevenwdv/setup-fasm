import eslint from '@eslint/js';
import {defineConfig, globalIgnores} from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    globalIgnores(['dist/']),
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
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
    }
);
