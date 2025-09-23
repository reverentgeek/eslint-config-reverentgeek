"use strict";

const { describe } = require( "node:test" );
const { testBasicConfigStructure, testHasRules, testHasPlugins, testLanguageOptions, getConfig } = require( "./test-helpers.js" );

describe( "node config", () => {
	const nodeConfig = getConfig( "node" );

	testBasicConfigStructure( "node", nodeConfig );

	testLanguageOptions( nodeConfig, "commonjs" );

	testHasRules( nodeConfig, [ "strict", "n/exports-style" ] );

	testHasPlugins( nodeConfig, [ "n" ] );
} );
