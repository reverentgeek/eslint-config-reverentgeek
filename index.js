"use strict";

module.exports = {
	env: {
		es6: true
	},
	extends: "eslint:recommended",
	globals: { 
		"globalThis": "readonly" 
	},
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		"array-bracket-spacing": [ "error", "always" ],
		"eol-last": [ "error", "always" ],
		indent: [ "error", "tab" ],
		"linebreak-style": [ "error", "unix" ],
		"no-console": [ "off" ],
		"no-multiple-empty-lines": [ "error", { max: 1 } ],
		"no-trailing-spaces": [ "error", { skipBlankLines: false, ignoreComments: false } ],
		"no-var": [ "error" ],
		"object-curly-spacing": [ "error", "always" ],
		"quote-props": [ "error", "as-needed" ],
		quotes: [ "error", "double" ],
		semi: [ "error", "always" ],
		"space-in-parens": [ "error", "always" ],
		"template-curly-spacing": [ "error", "always" ]
	}
};
