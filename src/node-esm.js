"use strict";
const common = require( "./common" );
const nodePlugin = require( "eslint-plugin-n" );
const nodeRecommended = nodePlugin.configs["flat/recommended-module"];
const { merge } = require( "./utils" );

const config = {
	name: "reverentgeek-node-esm",
	languageOptions: {
		sourceType: "module"
	},
	rules: {
		"n/exports-style": [ "error" ]
	}
};
const merged = merge( common, nodeRecommended, config );

module.exports = merged;

