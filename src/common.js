"use strict";

const defineConfig = require( "eslint/config" ).defineConfig;

const eslint = require( "@eslint/js" );
const styles = require( "@stylistic/eslint-plugin" );

module.exports = defineConfig( {
	name: "common",
	extends: [ eslint.configs.recommended, styles.configs.recommended ],
	rules: {
		"no-console": [ "off" ],
		"no-var": [ "error" ],
		"@stylistic/array-bracket-spacing": [ "error", "always", { singleValue: true } ],
		"@stylistic/brace-style": [ "error", "1tbs" ],
		"@stylistic/comma-dangle": [ "error", "never" ],
		"@stylistic/comma-spacing": [ "error", { before: false, after: true } ],
		"@stylistic/eol-last": [ "error", "always" ],
		"@stylistic/indent": [ "error", "tab" ],
		"@stylistic/linebreak-style": [ "error", "unix" ],
		"@stylistic/no-multiple-empty-lines": [ "error", { max: 1 } ],
		"@stylistic/no-tabs": [ "error", { allowIndentationTabs: true } ],
		"@stylistic/no-trailing-spaces": [ "error", { skipBlankLines: false, ignoreComments: false } ],
		"@stylistic/object-curly-spacing": [ "error", "always" ],
		"@stylistic/quote-props": [ "error", "as-needed" ],
		"@stylistic/quotes": [ "error", "double" ],
		"@stylistic/semi": [ "error", "always" ],
		"@stylistic/space-in-parens": [ "error", "always" ],
		"@stylistic/template-curly-spacing": [ "error", "always" ]
	}
} );

