"use strict";
const common = require( "./common" );
const nodePlugin = require( "eslint-plugin-n" );
const nodeRecommended = nodePlugin.configs["flat/recommended-module"];

module.exports = [
	...common,
	nodeRecommended,
	{
		languageOptions: {
			sourceType: "module"
		},
		rules: {
			"n/exports-style": [ "error" ]
		}
	}
];
