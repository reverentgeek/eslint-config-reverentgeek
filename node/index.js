"use strict";

module.exports = {
	env: {
		commonjs: true,
		node: true
	},
	extends: "../index.js",
	rules: {
		strict: [ "error", "global" ]
	}
};
