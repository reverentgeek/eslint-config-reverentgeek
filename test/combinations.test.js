"use strict";

const { test, describe } = require( "node:test" );
const assert = require( "node:assert" );
const { getConfig } = require( "./test-helpers.js" );
const { merge } = require( "../src/utils.js" );

describe( "config combinations", () => {
	describe( "browser + react", () => {
		const browserConfig = getConfig( "browser" );
		const reactConfig = getConfig( "react" );
		const merged = merge( browserConfig, reactConfig );

		test( "should have browser globals", () => {
			assert.ok( merged.languageOptions.globals, "Should have globals" );
			assert.ok( Object.prototype.hasOwnProperty.call( merged.languageOptions.globals, "window" ), "Should have window global" );
			assert.ok( Object.prototype.hasOwnProperty.call( merged.languageOptions.globals, "document" ), "Should have document global" );
		} );

		test( "should have common stylistic rules", () => {
			assert.ok( merged.rules["@stylistic/indent"], "Should have @stylistic/indent rule" );
			assert.ok( merged.rules["@stylistic/quotes"], "Should have @stylistic/quotes rule" );
			assert.ok( merged.rules["@stylistic/semi"], "Should have @stylistic/semi rule" );
		} );

		test( "should have module sourceType", () => {
			assert.strictEqual( merged.languageOptions.sourceType, "module", "Should use module sourceType" );
		} );
	} );

	describe( "browser + blog", () => {
		const browserConfig = getConfig( "browser" );
		const blogConfig = getConfig( "blog" );
		const merged = merge( browserConfig, blogConfig );

		test( "should have browser globals", () => {
			assert.ok( merged.languageOptions.globals, "Should have globals" );
			assert.ok( Object.prototype.hasOwnProperty.call( merged.languageOptions.globals, "window" ), "Should have window global" );
		} );

		test( "should override indentation to 2 spaces", () => {
			const indentRule = merged.rules["@stylistic/indent"];
			assert.ok( indentRule, "Should have indent rule" );
			assert.strictEqual( indentRule[1], 2, "Should use 2-space indentation from blog" );
		} );
	} );

	describe( "node + blog", () => {
		const nodeConfig = getConfig( "node" );
		const blogConfig = getConfig( "blog" );
		const merged = merge( nodeConfig, blogConfig );

		test( "should have node rules", () => {
			assert.ok( merged.rules["strict"], "Should have strict rule from node" );
			assert.ok( merged.rules["n/exports-style"], "Should have n/exports-style rule from node" );
		} );

		test( "should override indentation to 2 spaces", () => {
			const indentRule = merged.rules["@stylistic/indent"];
			assert.ok( indentRule, "Should have indent rule" );
			assert.strictEqual( indentRule[1], 2, "Should use 2-space indentation from blog" );
		} );
	} );
} );
