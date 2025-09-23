"use strict";

const { describe } = require( "node:test" );
const { testBasicConfigStructure, testHasRules, testHasPlugins, getConfig } = require( "./test-helpers.js" );

describe( "common config", () => {
	const commonConfig = getConfig( "common" );

	testBasicConfigStructure( "common", commonConfig );

	testHasRules( commonConfig, [ "@stylistic/indent", "@stylistic/quotes", "@stylistic/semi", "@stylistic/brace-style" ] );

	testHasPlugins( commonConfig, [ "@stylistic" ] );
} );