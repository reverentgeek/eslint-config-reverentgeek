"use strict";
const pkg = require( "./package.json" );

module.exports = {
	meta: {
		name: pkg.name,
		version: pkg.version
	},
	configs: {
		common: require( "./common" ),
		blog: require( "./blog" ),
		browser: require( "./browser" ),
		node: require( "./node" ),
		"node-esm": require( "./node-esm" ),
		esm: require( "./esm" )
	}
};
