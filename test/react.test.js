"use strict";

const { test, describe } = require( "node:test" );
const assert = require( "node:assert" );
const { testBasicConfigStructure, getConfig } = require( "./test-helpers.js" );

describe( "react config", () => {
	const reactConfig = getConfig( "react" );

	testBasicConfigStructure( "react", reactConfig );

	test( "should have JSX support", () => {
		assert.ok( reactConfig.languageOptions, "Should have languageOptions" );
		assert.ok( reactConfig.languageOptions.parserOptions, "Should have parserOptions" );
		assert.ok( reactConfig.languageOptions.parserOptions.ecmaFeatures, "Should have ecmaFeatures" );
		assert.ok( reactConfig.languageOptions.parserOptions.ecmaFeatures.jsx, "Should support JSX" );
	} );
} );