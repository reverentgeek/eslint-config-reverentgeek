"use strict";
const common = require( "./common" );
const nodePlugin = require( "eslint-plugin-n" );
const nodeRecommended = nodePlugin.configs["flat/recommended"];

module.exports = [
	...common,
	nodeRecommended,
	{
		languageOptions: {
			sourceType: "commonjs"
		},
		rules: {
			strict: [ "error", "global" ],
			"n/exports-style": [ "error" ]
		}
	}
];
