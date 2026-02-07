"use strict";
const defineConfig = require( "eslint/config" ).defineConfig;

module.exports = defineConfig( {
	name: "esm",
	languageOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	}
} );

