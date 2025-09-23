"use strict";
const globals = require( "globals" );
const common = require( "./common" );
const { merge } = require( "./utils" );

const config = {
	name: "reverentgeek-browser",
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		globals: globals.browser
	},
	rules: {
	}
};

module.exports = merge( common, config );

