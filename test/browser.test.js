"use strict";

const { test, describe } = require( "node:test" );
const assert = require( "node:assert" );
const { testBasicConfigStructure, testHasPlugins, testLanguageOptions, testInheritsCommonRules, getConfig } = require( "./test-helpers.js" );

describe( "browser config", () => {
	const browserConfig = getConfig( "browser" );

	testBasicConfigStructure( "browser", browserConfig );

	testLanguageOptions( browserConfig, "module", true );

	test( "should have browser globals", () => {
		assert.ok( browserConfig.languageOptions.globals, "Should have globals" );
		assert.ok( Object.prototype.hasOwnProperty.call( browserConfig.languageOptions.globals, "window" ), "Should have window global" );
		assert.ok( Object.prototype.hasOwnProperty.call( browserConfig.languageOptions.globals, "document" ), "Should have document global" );
		assert.ok( Object.prototype.hasOwnProperty.call( browserConfig.languageOptions.globals, "console" ), "Should have console global" );
	} );

	testHasPlugins( browserConfig, [ "@stylistic" ] );

	testInheritsCommonRules( browserConfig );
} );
