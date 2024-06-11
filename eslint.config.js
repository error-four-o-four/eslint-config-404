// @ts-check
import pluginImports from 'eslint-plugin-import-x';
import { FlatCompat } from '@eslint/eslintrc';

// node -v v20.9.0

// "@eslint/eslintrc": "^3.1.0",
// "eslint": "^9.4.0",
// "eslint-plugin-import-x": "^0.5.1"

const compat = new FlatCompat({
	baseDirectory: process.cwd(),
});

const config = compat.config(pluginImports.configs.recommended)[0];

// console.log(config);

// {
//   rules: {
//     'import-x/no-unresolved': 'error',
//     'import-x/named': 'error',
//     'import-x/namespace': 'error',
//     'import-x/default': 'error',
//     'import-x/export': 'error',
//     'import-x/no-named-as-default': 'warn',
//     'import-x/no-named-as-default-member': 'warn',
//     'import-x/no-duplicates': 'warn',
//     'no-console': 0,
//     'import-x/no-unused-modules': 0
//   },
//   languageOptions: { ecmaVersion: 2018, sourceType: 'module' },
//   plugins: { 'import-x': { configs: [Object], rules: [Object] } }
// }

/** @type {import('eslint').Linter.RuleEntry} */
const OFF = 0;

config.rules = {
	'no-console': OFF,
	...config.rules,
	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unused-modules.md
	// Type '(number | { unusedExports: boolean; })[]' is not assignable to type 'RuleEntry<any[]> | undefined'.
	//   Type '(number | { unusedExports: boolean; })[]' is not assignable to type '[_: RuleLevel, ..._1: any[]]'.
	//     Source provides no match for required element at position 0 in target.ts(2322)

	// @ts-expect-error
	'import-x/no-unused-modules': [1, { unusedExports: true }],

	// RESULTING ERROR:
	// No ESLint configuration (e.g .eslintrc) found for file: .\eslint-config-404\eslint.config.js
	// File will not be validated. Consider running 'eslint --init' in the workspace folder eslint-config-404
	// Alternatively you can disable ESLint by executing the 'Disable ESLint' command.
};

// ##### Alternatively

// _@ts-expect-error
// config.rules['import-x/no-unused-modules'] = [1, { unusedExports: true }];

// No ESLint configuration (e.g .eslintrc) found for file: .\eslint-config-404\eslint.config.js
// File will not be validated. Consider running 'eslint --init' in the workspace folder eslint-config-404
// Alternatively you can disable ESLint by executing the 'Disable ESLint' command.
// [Warn  - 6:43:46 AM]

// INITIAL RESULTING ERROR - can't reproduce
// No ESLint configuration (e.g .eslintrc) found for file: .\eslint-config-404\eslint.config.js
// File will not be validated. Consider running 'eslint --init' in the workspace folder eslint-config-404
// Alternatively you can disable ESLint by executing the 'Disable ESLint' command.
// [Error - 6:44:01 AM] Request textDocument/codeAction failed.
//   Message: Request textDocument/codeAction failed with message: No ESLint configuration found in .\eslint-config-404.
// Occurred while linting .\eslint-config-404\eslint.config.js:30
// Rule: "import-x/no-unused-modules"
//   Code: -32603

export default [config];
