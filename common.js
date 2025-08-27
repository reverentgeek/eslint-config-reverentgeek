"use strict";

const eslint = require( "@eslint/js" );
const styles = require( "@stylistic/eslint-plugin" );
const { merge } = require( "./utils" );

const config = {
	name: "reverentgeek-common",
	rules: {
		"no-console": [ "off" ],
		"no-var": [ "error" ],
		"@stylistic/array-bracket-spacing": [ "error", "always", { singleValue: true } ],
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
};

const merged = merge( eslint.configs.recommended, styles.configs.recommended, config );

module.exports = merged;
