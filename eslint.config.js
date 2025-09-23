"use strict";
const defineConfig = require( "eslint/config" ).defineConfig; // eslint-disable-line n/no-unpublished-require

const node = require( "./src/node" );

const config = {
	rules: {
		"n/no-unpublished-require": [ "error", {
			allowModules: [ "globals", "eslint-plugin-n", "@stylistic/eslint-plugin" ]
		} ],
		"n/no-extraneous-require": [ "error", {
			allowModules: [ "@eslint/js" ]
		} ]
	}
};

const testConfig = {
	files: [ "test/**/*.js" ],
	rules: {
		"n/no-unsupported-features/node-builtins": "off"
	}
};

module.exports = defineConfig( [ node, config, testConfig ] );

