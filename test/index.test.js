"use strict";

const { test, describe } = require( "node:test" );
const assert = require( "node:assert" );
const pkg = require( "../package.json" );
const configModule = require( "../src/index.js" );
const { expectedNames } = require( "./test-helpers.js" );

describe( "eslint-config-reverentgeek", () => {
	test( "should export meta information", () => {
		assert.ok( configModule.meta, "Meta object should exist" );
		assert.strictEqual( configModule.meta.name, pkg.name, "Meta name should match package name" );
		assert.strictEqual( configModule.meta.version, pkg.version, "Meta version should match package version" );
	} );

	test( "should export configs object", () => {
		assert.ok( configModule.configs, "Configs object should exist" );
		assert.strictEqual( typeof configModule.configs, "object", "Configs should be an object" );
	} );

	describe( "configs", () => {
		const expectedConfigs = [ "common", "blog", "browser", "node", "node-esm", "esm", "react" ];

		test( "should have all expected configs", () => {
			expectedConfigs.forEach( ( configName ) => {
				assert.ok( configModule.configs[configName], `Config ${ configName } should exist` );
			} );
		} );
	} );

	describe( "config structure validation", () => {
		test( "all configs should be valid objects", () => {
			const configNames = Object.keys( configModule.configs );

			for ( const configName of configNames ) {
				const config = configModule.configs[configName];

				assert.ok( config, `${ configName } config should exist` );
				assert.strictEqual( typeof config, "object", `${ configName } config should be an object` );

				if ( config.rules ) {
					assert.strictEqual( typeof config.rules, "object", `${ configName } config rules should be an object` );
				}

				if ( config.plugins ) {
					assert.strictEqual( typeof config.plugins, "object", `${ configName } config plugins should be an object` );
				}

				if ( config.languageOptions ) {
					assert.strictEqual( typeof config.languageOptions, "object", `${ configName } config languageOptions should be an object` );
				}
			}
		} );

		test( "all configs should have correct names", () => {
			for ( const [ configName, expectedName ] of Object.entries( expectedNames ) ) {
				const config = configModule.configs[configName];
				assert.ok( config.name, `${ configName } config should have a name property` );
				assert.strictEqual( typeof config.name, "string", `${ configName } config name should be a string` );
				assert.strictEqual( config.name, expectedName, `${ configName } config should have correct name` );
			}
		} );

		test( "configs should not be empty objects", () => {
			const configNames = Object.keys( configModule.configs );

			for ( const configName of configNames ) {
				const config = configModule.configs[configName];
				const keys = Object.keys( config );
				assert.ok( keys.length > 0, `${ configName } config should not be empty` );
			}
		} );
	} );
} );