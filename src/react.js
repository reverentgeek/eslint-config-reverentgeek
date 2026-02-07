"use strict";
const defineConfig = require( "eslint/config" ).defineConfig;

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
