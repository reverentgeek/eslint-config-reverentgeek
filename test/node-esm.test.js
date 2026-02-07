"use strict";

const { describe } = require( "node:test" );
const { testBasicConfigStructure, testHasRules, testHasPlugins, testLanguageOptions, testInheritsCommonRules, getConfig } = require( "./test-helpers.js" );

describe( "node-esm config", () => {
	const nodeEsmConfig = getConfig( "node-esm" );

	testBasicConfigStructure( "node-esm", nodeEsmConfig );

	testLanguageOptions( nodeEsmConfig, "module" );

	testHasRules( nodeEsmConfig, [ "n/exports-style" ] );

	testHasPlugins( nodeEsmConfig, [ "n" ] );

	testInheritsCommonRules( nodeEsmConfig );
} );
