"use strict";
const defineConfig = require( "eslint/config" ).defineConfig; // eslint-disable-line n/no-unpublished-require
const common = require( "./common" );
const nodePlugin = require( "eslint-plugin-n" );
const nodeRecommended = nodePlugin.configs["flat/recommended-module"];

module.exports = defineConfig( {
	name: "node-esm",
	extends: [ common, nodeRecommended ],
	languageOptions: {
		sourceType: "module"
	},
	rules: {
		"n/exports-style": [ "error" ]
	}
} );

