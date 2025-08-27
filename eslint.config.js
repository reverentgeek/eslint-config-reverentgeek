"use strict";
const node = require( "./node" );

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

module.exports = [ node, config ];

