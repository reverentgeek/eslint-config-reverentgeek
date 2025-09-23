"use strict";
const defineConfig = require( "eslint/config" ).defineConfig; // eslint-disable-line n/no-unpublished-require

module.exports = defineConfig( {
	name: "esm",
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	}
} );

