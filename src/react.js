"use strict";
const defineConfig = require( "eslint/config" ).defineConfig; // eslint-disable-line n/no-unpublished-require

module.exports = defineConfig( {
	name: "react",
	languageOptions: {
		parserOptions: {
			ecmaFeatures: {
				jsx: true
			}
		}
	}
} );
