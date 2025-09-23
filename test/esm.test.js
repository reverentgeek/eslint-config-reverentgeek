"use strict";

const { test, describe } = require( "node:test" );
const assert = require( "node:assert" );
const { testBasicConfigStructure, testLanguageOptions, getConfig } = require( "./test-helpers.js" );

describe( "esm config", () => {
	const esmConfig = getConfig( "esm" );

	testBasicConfigStructure( "esm", esmConfig );

	testLanguageOptions( esmConfig, "module" );

	test( "should have latest ecmaVersion", () => {
		assert.ok( esmConfig.languageOptions, "Should have languageOptions" );
		assert.strictEqual( esmConfig.languageOptions.ecmaVersion, "latest", "Should use latest ecmaVersion" );
	} );
} );
