"use strict";

const { test } = require( "node:test" );
const assert = require( "node:assert" );
const configModule = require( "../src/index.js" );

// Expected names for all configs
const expectedNames = {
	common: "common",
	blog: "blog",
	browser: "browser",
	node: "node-commonjs",
	"node-esm": "node-esm",
	esm: "esm",
	react: "react"
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
 * Since configs are now arrays due to defineConfig, we need to handle them properly
 */
function getConfig( configName ) {
	const configArray = configModule.configs[configName];

	// If it's an array (which it should be with defineConfig), we need to get the effective config
	if ( Array.isArray( configArray ) ) {
		// For testing purposes, we'll merge all configs in the array to get the effective configuration
		// This simulates what ESLint would do when processing the config
		const merged = {
			name: null,
			plugins: {},
			rules: {},
			languageOptions: {}
		};

		configArray.forEach( ( config ) => {
			if ( config.name ) {
				merged.name = config.name;
			}
			if ( config.plugins ) {
				Object.assign( merged.plugins, config.plugins );
			}
			if ( config.rules ) {
				Object.assign( merged.rules, config.rules );
			}
			if ( config.languageOptions ) {
				Object.assign( merged.languageOptions, config.languageOptions );
			}
		} );

		// Clean up empty objects
		if ( Object.keys( merged.plugins ).length === 0 ) {
			delete merged.plugins;
		}
		if ( Object.keys( merged.languageOptions ).length === 0 ) {
			delete merged.languageOptions;
		}

		return merged;
	}

	// Fallback for non-array configs (shouldn't happen with defineConfig)
	return configArray;
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
