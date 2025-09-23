"use strict";

const { test, describe } = require( "node:test" );
const assert = require( "node:assert" );
const { merge } = require( "../src/utils.js" );

describe( "merge function", () => {
	describe( "basic functionality", () => {
		test( "should merge two configs", () => {
			const config1 = {
				name: "config1",
				plugins: { plugin1: "plugin1-content" },
				languageOptions: {
					sourceType: "script",
					globals: { global1: true }
				},
				rules: { rule1: "error" }
			};

			const config2 = {
				name: "config2",
				plugins: { plugin2: "plugin2-content" },
				languageOptions: {
					sourceType: "module",
					globals: { global2: false }
				},
				rules: { rule2: "warn" }
			};

			const result = merge( config1, config2 );

			assert.strictEqual( result.name, "config2", "Should use the last config's name" );
			assert.deepStrictEqual( result.plugins, {
				plugin1: "plugin1-content",
				plugin2: "plugin2-content"
			}, "Should merge plugins from both configs" );
			assert.strictEqual( result.languageOptions.sourceType, "module", "Should use the last config's sourceType" );
			assert.deepStrictEqual( result.languageOptions.globals, {
				global1: true,
				global2: false
			}, "Should merge globals from both configs" );
			assert.deepStrictEqual( result.rules, {
				rule1: "error",
				rule2: "warn"
			}, "Should merge rules from both configs" );
		} );

		test( "should merge three configs", () => {
			const config1 = {
				name: "config1",
				plugins: { plugin1: "plugin1-content" },
				languageOptions: {
					sourceType: "script",
					globals: { global1: true }
				},
				rules: { rule1: "error" }
			};

			const config2 = {
				name: "config2",
				plugins: { plugin2: "plugin2-content" },
				languageOptions: {
					sourceType: "module",
					globals: { global2: false }
				},
				rules: { rule2: "warn" }
			};

			const config3 = {
				name: "config3",
				plugins: { plugin3: "plugin3-content" },
				languageOptions: {
					sourceType: "commonjs",
					globals: { global3: "readonly" }
				},
				rules: { rule3: "off" }
			};

			const result = merge( config1, config2, config3 );

			assert.strictEqual( result.name, "config3", "Should use the third config's name" );
			assert.deepStrictEqual( result.plugins, {
				plugin1: "plugin1-content",
				plugin2: "plugin2-content",
				plugin3: "plugin3-content"
			}, "Should merge plugins from all three configs" );
			assert.strictEqual( result.languageOptions.sourceType, "commonjs", "Should use the third config's sourceType" );
			assert.deepStrictEqual( result.languageOptions.globals, {
				global1: true,
				global2: false,
				global3: "readonly"
			}, "Should merge globals from all three configs" );
			assert.deepStrictEqual( result.rules, {
				rule1: "error",
				rule2: "warn",
				rule3: "off"
			}, "Should merge rules from all three configs" );
		} );
	} );

	describe( "property override behavior", () => {
		test( "should override properties in order - name", () => {
			const config1 = { name: "first-name" };
			const config2 = { name: "second-name" };
			const config3 = { name: "third-name" };

			const result = merge( config1, config2, config3 );
			assert.strictEqual( result.name, "third-name", "Should use the last config's name" );
		} );

		test( "should override properties in order - plugins", () => {
			const config1 = { plugins: { shared: "first-value", unique1: "value1" } };
			const config2 = { plugins: { shared: "second-value", unique2: "value2" } };
			const config3 = { plugins: { shared: "third-value", unique3: "value3" } };

			const result = merge( config1, config2, config3 );
			assert.deepStrictEqual( result.plugins, {
				shared: "third-value",
				unique1: "value1",
				unique2: "value2",
				unique3: "value3"
			}, "Should override shared plugin with last value and include all unique plugins" );
		} );

		test( "should override properties in order - rules", () => {
			const config1 = { rules: { "shared-rule": "error", rule1: "error" } };
			const config2 = { rules: { "shared-rule": "warn", rule2: "warn" } };
			const config3 = { rules: { "shared-rule": "off", rule3: "off" } };

			const result = merge( config1, config2, config3 );
			assert.deepStrictEqual( result.rules, {
				"shared-rule": "off",
				rule1: "error",
				rule2: "warn",
				rule3: "off"
			}, "Should override shared rule with last value and include all unique rules" );
		} );

		test( "should override properties in order - globals", () => {
			const config1 = {
				languageOptions: {
					globals: { shared: true, global1: true }
				}
			};
			const config2 = {
				languageOptions: {
					globals: { shared: false, global2: false }
				}
			};
			const config3 = {
				languageOptions: {
					globals: { shared: "readonly", global3: "readonly" }
				}
			};

			const result = merge( config1, config2, config3 );
			assert.deepStrictEqual( result.languageOptions.globals, {
				shared: "readonly",
				global1: true,
				global2: false,
				global3: "readonly"
			}, "Should override shared global with last value and include all unique globals" );
		} );

		test( "should override sourceType with last non-null value", () => {
			const config1 = { languageOptions: { sourceType: "script" } };
			const config2 = { languageOptions: { sourceType: "module" } };
			const config3 = { languageOptions: { sourceType: "commonjs" } };

			const result = merge( config1, config2, config3 );
			assert.strictEqual( result.languageOptions.sourceType, "commonjs", "Should use the last sourceType" );
		} );
	} );

	describe( "edge cases and null handling", () => {
		test( "should handle empty configs", () => {
			const config1 = {};
			const config2 = {};

			const result = merge( config1, config2 );

			assert.strictEqual( result.name, undefined, "Should handle missing names" );
			assert.deepStrictEqual( result.plugins, {}, "Should return empty plugins object" );
			assert.strictEqual( result.languageOptions.sourceType, undefined, "Should handle missing sourceType" );
			assert.deepStrictEqual( result.languageOptions.globals, {}, "Should return empty globals object" );
			assert.deepStrictEqual( result.rules, {}, "Should return empty rules object" );
		} );

		test( "should handle null/undefined configs", () => {
			const config1 = { name: "valid-config", rules: { rule1: "error" } };
			const config2 = null;
			const config3 = undefined;
			const config4 = { name: "another-valid", rules: { rule2: "warn" } };

			const result = merge( config1, config2, config3, config4 );

			assert.strictEqual( result.name, "another-valid", "Should skip null/undefined configs for name" );
			assert.deepStrictEqual( result.rules, {
				rule1: "error",
				rule2: "warn"
			}, "Should skip null/undefined configs for rules" );
		} );

		test( "should handle configs with missing properties", () => {
			const config1 = { name: "config1" }; // No plugins, languageOptions, or rules
			const config2 = { rules: { rule1: "error" } }; // No name, plugins, or languageOptions
			const config3 = { plugins: { plugin1: "content" } }; // No name, languageOptions, or rules

			const result = merge( config1, config2, config3 );

			assert.strictEqual( result.name, "config1", "Should use available name" );
			assert.deepStrictEqual( result.plugins, { plugin1: "content" }, "Should use available plugins" );
			assert.deepStrictEqual( result.rules, { rule1: "error" }, "Should use available rules" );
			assert.deepStrictEqual( result.languageOptions.globals, {}, "Should create empty globals" );
		} );

		test( "should handle configs with null languageOptions properties", () => {
			const config1 = {
				languageOptions: {
					sourceType: null,
					globals: null
				}
			};
			const config2 = {
				languageOptions: {
					sourceType: "module",
					globals: { window: true }
				}
			};

			const result = merge( config1, config2 );

			assert.strictEqual( result.languageOptions.sourceType, "module", "Should skip null sourceType" );
			assert.deepStrictEqual( result.languageOptions.globals, { window: true }, "Should handle null globals" );
		} );

		test( "should handle single config", () => {
			const config = {
				name: "single-config",
				plugins: { plugin1: "content" },
				languageOptions: {
					sourceType: "module",
					globals: { window: true }
				},
				rules: { rule1: "error" }
			};

			const result = merge( config );

			assert.deepStrictEqual( result, {
				name: "single-config",
				plugins: { plugin1: "content" },
				languageOptions: {
					sourceType: "module",
					globals: { window: true }
				},
				rules: { rule1: "error" }
			}, "Should return the single config as-is" );
		} );

		test( "should handle no configs", () => {
			const result = merge();

			assert.strictEqual( result.name, undefined, "Should handle no name" );
			assert.deepStrictEqual( result.plugins, {}, "Should return empty plugins" );
			assert.strictEqual( result.languageOptions.sourceType, undefined, "Should handle no sourceType" );
			assert.deepStrictEqual( result.languageOptions.globals, {}, "Should return empty globals" );
			assert.deepStrictEqual( result.rules, {}, "Should return empty rules" );
		} );
	} );

	describe( "complex merging scenarios", () => {
		test( "should handle nested rule configurations", () => {
			const config1 = {
				rules: {
					indent: [ "error", 2 ],
					quotes: [ "error", "single" ]
				}
			};
			const config2 = {
				rules: {
					indent: [ "error", 4 ],
					semi: [ "error", "always" ]
				}
			};

			const result = merge( config1, config2 );

			assert.deepStrictEqual( result.rules, {
				indent: [ "error", 4 ], // Should override with config2's value
				quotes: [ "error", "single" ],
				semi: [ "error", "always" ]
			}, "Should properly override nested rule arrays" );
		} );

		test( "should handle complex plugin objects", () => {
			const plugin1 = { rules: { "custom-rule-1": {} }, configs: { recommended: {} } };
			const plugin2 = { rules: { "custom-rule-2": {} }, configs: { strict: {} } };

			const config1 = { plugins: { "@custom/plugin1": plugin1 } };
			const config2 = { plugins: { "@custom/plugin2": plugin2 } };

			const result = merge( config1, config2 );

			assert.deepStrictEqual( result.plugins, {
				"@custom/plugin1": plugin1,
				"@custom/plugin2": plugin2
			}, "Should merge complex plugin objects" );
		} );

		test( "should handle mixed global types", () => {
			const config1 = {
				languageOptions: {
					globals: {
						window: true,
						document: false,
						console: "readonly"
					}
				}
			};
			const config2 = {
				languageOptions: {
					globals: {
						document: true, // Override from false to true
						process: "writable",
						Buffer: false
					}
				}
			};

			const result = merge( config1, config2 );

			assert.deepStrictEqual( result.languageOptions.globals, {
				window: true,
				document: true, // Should be overridden
				console: "readonly",
				process: "writable",
				Buffer: false
			}, "Should properly merge and override different global types" );
		} );
	} );

	describe( "order of operations", () => {
		test( "should demonstrate merge order with four configs", () => {
			const base = { name: "base", rules: { "base-rule": "error" } };
			const common = { name: "common", rules: { "common-rule": "warn", "base-rule": "warn" } };
			const specific = { name: "specific", rules: { "specific-rule": "off", "common-rule": "off" } };
			const override = { name: "override", rules: { "override-rule": "error", "base-rule": "off" } };

			const result = merge( base, common, specific, override );

			assert.strictEqual( result.name, "override", "Should use the last config's name" );
			assert.deepStrictEqual( result.rules, {
				"base-rule": "off", // Overridden by 'override' config
				"common-rule": "off", // Overridden by 'specific' config
				"specific-rule": "off", // From 'specific' config
				"override-rule": "error" // From 'override' config
			}, "Should apply overrides in the correct order" );
		} );

		test( "should handle partial overrides correctly", () => {
			const config1 = {
				name: "config1",
				plugins: { plugin1: "v1", shared: "v1" },
				rules: { rule1: "error", shared: "error" }
			};
			const config2 = {
				// No name - should keep config1's name
				plugins: { plugin2: "v2", shared: "v2" }, // Override shared plugin
				rules: { rule2: "warn" } // Don't override shared rule
			};
			const config3 = {
				name: "config3", // Override name
				// No plugins - keep merged plugins from config1 + config2
				rules: { shared: "off" } // Override shared rule
			};

			const result = merge( config1, config2, config3 );

			assert.strictEqual( result.name, "config3", "Should use config3's name" );
			assert.deepStrictEqual( result.plugins, {
				plugin1: "v1",
				plugin2: "v2",
				shared: "v2" // From config2
			}, "Should keep merged plugins when config3 has none" );
			assert.deepStrictEqual( result.rules, {
				rule1: "error",
				rule2: "warn",
				shared: "off" // From config3
			}, "Should override shared rule with config3's value" );
		} );
	} );
} );
