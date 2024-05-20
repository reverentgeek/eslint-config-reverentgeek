"use strict";
const globals = require( "globals" );
const common = require( "./common" );

module.exports = [
	...common,
	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: globals.browser
		},
		rules: {
		}
	}
];
