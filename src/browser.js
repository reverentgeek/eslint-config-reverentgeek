"use strict";
const defineConfig = require( "eslint/config" ).defineConfig; // eslint-disable-line n/no-unpublished-require
const globals = require( "globals" );
const common = require( "./common" );

module.exports = defineConfig( {
	name: "browser",
	extends: [ common ],
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		globals: globals.browser
	}
} );
