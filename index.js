"use strict";

module.exports = {
	env: {
		es6: true
	},
	extends: "eslint:recommended",
	globals: {},
	parserOptions: {
		ecmaVersion: 2019
	},
	rules: {
		"array-bracket-spacing": [ "error", "always" ],
		"eol-last": [ "error", "always" ],
		indent: [ "error", "tab" ],
		"linebreak-style": [ "error", "unix" ],
		"no-console": [ "off" ],
		"no-multiple-empty-lines": [ "error", { max: 1 } ],
		"object-curly-spacing": [ "error", "always" ],
		quotes: [ "error", "double" ],
		semi: [ "error", "always" ],
		"space-in-parens": [ "error", "always" ],
		"template-curly-spacing": [ "error", "always" ]
	}
};
