"use strict";

module.exports = {
	env: {
		commonjs: false,
		node: true
	},
	extends: "../index.js",
	parserOptions: {
		sourceType: "module"
	},
	rules: {
		strict: [ "error", "never" ]
	}
};
