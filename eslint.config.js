import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    pluginJs.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions: { globals: globals.node },
        extends: ["airbnb"],
        root: true,
        rules: {
            "indent": ["warn", 4],
        },
        ignorePatterns: ["build", "dist", "public"]
    }
];