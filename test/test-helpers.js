"use strict";

const { test } = require( "node:test" );
const assert = require( "node:assert" );
const configModule = require( "../src/index.js" );

// Expected names for all configs
const expectedNames = {
	common: "reverentgeek-common",
	blog: "reverentgeek-blog",
	browser: "reverentgeek-browser",
	node: "reverentgeek-node-commonjs",
	"node-esm": "reverentgeek-node-esm",
	esm: "reverentgeek-esm",
	react: "reverentgeek-react"
};

/**
 * Common test helper to validate basic ESLint config structure
 */
function testBasicConfigStructure( configName, config ) {
	test( "should be a valid ESLint config object", () => {
		assert.ok( config, `${ configName } config should exist` );
		assert.strictEqual( typeof config, "object", `${ configName } config should be an object` );
	} );

	test( "should have correct name", () => {
		const expectedName = expectedNames[configName];
		if ( expectedName ) {
			assert.strictEqual( config.name, expectedName, "Should have correct config name" );
		}
	} );
}

/**
 * Test helper for validating rules exist
 */
function testHasRules( config, expectedRules = [] ) {
	test( "should have rules", () => {
		assert.ok( config.rules, "Should have rules object" );
		assert.strictEqual( typeof config.rules, "object", "Rules should be an object" );
	} );

	if ( expectedRules.length > 0 ) {
		test( "should have expected rules", () => {
			const rules = config.rules;
			expectedRules.forEach( ( ruleName ) => {
				assert.ok( rules[ruleName], `Should have ${ ruleName } rule` );
			} );
		} );
	}
}

/**
 * Test helper for validating plugins exist
 */
function testHasPlugins( config, expectedPlugins = [] ) {
	test( "should have plugins", () => {
		assert.ok( config.plugins, "Should have plugins object" );
		assert.strictEqual( typeof config.plugins, "object", "Plugins should be an object" );
	} );

	if ( expectedPlugins.length > 0 ) {
		test( "should have expected plugins", () => {
			const plugins = config.plugins;
			expectedPlugins.forEach( ( pluginName ) => {
				assert.ok( plugins[pluginName], `Should have ${ pluginName } plugin` );
			} );
		} );
	}
}

/**
 * Test helper for validating language options
 */
function testLanguageOptions( config, expectedSourceType, hasGlobals = false ) {
	test( "should have correct language options", () => {
		if ( expectedSourceType ) {
			assert.ok( config.languageOptions, "Should have languageOptions" );
			assert.strictEqual( config.languageOptions.sourceType, expectedSourceType, `Should use ${ expectedSourceType } sourceType` );
		}

		if ( hasGlobals ) {
			assert.ok( config.languageOptions.globals, "Should have globals" );
			assert.strictEqual( typeof config.languageOptions.globals, "object", "Globals should be an object" );
		}
	} );
}

/**
 * Get a config from the main module
 */
function getConfig( configName ) {
	return configModule.configs[configName];
}

module.exports = {
	configModule,
	expectedNames,
	testBasicConfigStructure,
	testHasRules,
	testHasPlugins,
	testLanguageOptions,
	getConfig
};