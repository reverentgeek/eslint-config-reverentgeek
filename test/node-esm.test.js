"use strict";

const { describe } = require( "node:test" );
const { testBasicConfigStructure, testLanguageOptions, getConfig } = require( "./test-helpers.js" );

describe( "node-esm config", () => {
	const nodeEsmConfig = getConfig( "node-esm" );

	testBasicConfigStructure( "node-esm", nodeEsmConfig );

	testLanguageOptions( nodeEsmConfig, "module" );
} );
