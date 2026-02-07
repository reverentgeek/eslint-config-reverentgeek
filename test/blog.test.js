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

	test( "should be standalone and not inherit common rules", () => {
		assert.strictEqual( blogConfig.rules["no-var"], undefined, "Should not have no-var rule (standalone config)" );
		assert.strictEqual( blogConfig.rules["@stylistic/quotes"], undefined, "Should not have @stylistic/quotes rule (standalone config)" );
	} );

	test( "should have no-console set to off", () => {
		const noConsoleRule = blogConfig.rules["no-console"];
		assert.ok( noConsoleRule, "Should have no-console rule" );
		assert.strictEqual( noConsoleRule[0], "off", "no-console should be set to off" );
	} );
} );
