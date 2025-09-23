"use strict";

const styles = require( "@stylistic/eslint-plugin" );

module.exports = {
	name: "reverentgeek-blog",
	plugins: {
		"@stylistic": styles
	},
	rules: {
		"no-console": [ "off" ],
		"@stylistic/indent": [ "error", 2 ]
	}
};

