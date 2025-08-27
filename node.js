
"use strict";
const common = require( "./common" );
const nodePlugin = require( "eslint-plugin-n" );
const nodeRecommended = nodePlugin.configs["flat/recommended-script"];
const { merge } = require( "./utils" );

const config = {
	name: "reverentgeek-node-commonjs",
	languageOptions: {
		sourceType: "commonjs"
	},
	rules: {
		strict: [ "error", "global" ],
		"n/exports-style": [ "error" ]
	}
};

const merged = merge( common, nodeRecommended, config );

module.exports = merged;

