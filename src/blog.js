"use strict";

const defineConfig = require( "eslint/config" ).defineConfig;
const styles = require( "@stylistic/eslint-plugin" );

module.exports = defineConfig( {
	name: "blog",
	plugins: {
		"@stylistic": styles
	},
	rules: {
		"no-console": [ "off" ],
		"@stylistic/indent": [ "error", 2 ]
	}
} );

