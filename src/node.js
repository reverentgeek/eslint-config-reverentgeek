
"use strict";

const defineConfig = require( "eslint/config" ).defineConfig; // eslint-disable-line n/no-unpublished-require
const common = require( "./common" );
const nodePlugin = require( "eslint-plugin-n" );
const nodeRecommended = nodePlugin.configs["flat/recommended-script"];

module.exports = defineConfig( {
	name: "node-commonjs",
	extends: [ common, nodeRecommended ],
	languageOptions: {
		sourceType: "commonjs"
	},
	rules: {
		strict: [ "error", "global" ],
		"n/exports-style": [ "error" ]
	}
} );
