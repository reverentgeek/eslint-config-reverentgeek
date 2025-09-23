"use strict";

const { test, describe } = require( "node:test" );
const assert = require( "node:assert" );
const { testBasicConfigStructure, testHasPlugins, getConfig } = require( "./test-helpers.js" );

describe( "blog config", () => {
	const blogConfig = getConfig( "blog" );

	testBasicConfigStructure( "blog", blogConfig );

	test( "should use 2-space indentation", () => {
		const indentRule = blogConfig.rules["@stylistic/indent"];
		assert.ok( indentRule, "Should have indent rule" );
		assert.strictEqual( indentRule[1], 2, "Should use 2-space indentation" );
	} );

	testHasPlugins( blogConfig, [ "@stylistic" ] );
} );
