"use strict";
const node = require( "./node" );

module.exports = [
	...node,
	{
		rules: {
			"n/no-unpublished-require": [ "error", {
				allowModules: [ "globals", "eslint-plugin-n", "@stylistic/eslint-plugin" ]
			} ],
			"n/no-extraneous-require": [ "error", {
				allowModules: [ "@eslint/js" ]
			} ]
		}
	}
];
