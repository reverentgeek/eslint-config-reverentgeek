"use strict";

const { describe, test } = require( "node:test" );
const assert = require( "node:assert" );
const { ESLint } = require( "eslint" );
const configModule = require( "../src/index.js" );

function flattenConfigs( configs ) {
	return ( Array.isArray( configs ) ? configs.flat( Infinity ) : [ configs ] ).filter( Boolean );
}

function createESLint( configName, options = {} ) {
	return new ESLint( {
		overrideConfigFile: true,
		overrideConfig: flattenConfigs( configModule.configs[configName] ),
		...options
	} );
}

async function lintText( configName, code, eslintOptions = {}, lintOptions = {} ) {
	const eslint = createESLint( configName, eslintOptions );
	return eslint.lintText( code, lintOptions );
}

function assertHasRuleError( results, ruleId ) {
	const messages = results[0].messages;
	const match = messages.find( m => m.ruleId === ruleId );
	assert.ok( match, `Expected rule "${ ruleId }" to report an error, but it did not. Messages: ${ JSON.stringify( messages.map( m => m.ruleId ) ) }` );
}

function assertNoErrors( results ) {
	assert.strictEqual( results[0].errorCount, 0, `Expected zero errors, got ${ results[0].errorCount }. Messages: ${ JSON.stringify( results[0].messages.map( m => ( { ruleId: m.ruleId, message: m.message } ) ) ) }` );
}

describe( "lint integration: common config", () => {
	test( "should report no-var error for var usage", async () => {
		const results = await lintText( "common", "var x = \"hello\";\n" );
		assertHasRuleError( results, "no-var" );
	} );

	test( "should report @stylistic/quotes error for single quotes", async () => {
		const results = await lintText( "common", "const x = 'hello';\n" );
		assertHasRuleError( results, "@stylistic/quotes" );
	} );

	test( "should report @stylistic/semi error for missing semicolon", async () => {
		const results = await lintText( "common", "const x = \"hello\"\n" );
		assertHasRuleError( results, "@stylistic/semi" );
	} );

	test( "should report @stylistic/indent error for space indentation", async () => {
		const results = await lintText( "common", "function foo() {\n    const x = \"hello\";\n}\n" );
		assertHasRuleError( results, "@stylistic/indent" );
	} );

	test( "should pass clean code with zero errors", async () => {
		const code = "/* eslint-disable no-unused-vars */\nconst x = \"hello\";\nconst y = `world ${ x }`;\n";
		const results = await lintText( "common", code );
		assertNoErrors( results );
	} );

	test( "should auto-fix single quotes to double quotes", async () => {
		const results = await lintText( "common", "const x = 'hello';\n", { fix: true } );
		assert.strictEqual( results[0].output, "const x = \"hello\";\n" );
	} );

	test( "should auto-fix missing semicolon", async () => {
		const results = await lintText( "common", "const x = \"hello\"\n", { fix: true } );
		assert.strictEqual( results[0].output, "const x = \"hello\";\n" );
	} );
} );

describe( "lint integration: blog config", () => {
	test( "should pass code with 2-space indentation", async () => {
		const code = "function foo() {\n  const x = \"hello\";\n}\n";
		const results = await lintText( "blog", code );
		const indentErrors = results[0].messages.filter( m => m.ruleId === "@stylistic/indent" );
		assert.strictEqual( indentErrors.length, 0, "Should have no indent errors with 2-space indentation" );
	} );

	test( "should report @stylistic/indent error for tab indentation", async () => {
		const code = "function foo() {\n\tconst x = \"hello\";\n}\n";
		const results = await lintText( "blog", code );
		assertHasRuleError( results, "@stylistic/indent" );
	} );

	test( "should not report no-console error", async () => {
		const code = "console.log( \"hello\" );\n";
		const results = await lintText( "blog", code );
		const consoleErrors = results[0].messages.filter( m => m.ruleId === "no-console" );
		assert.strictEqual( consoleErrors.length, 0, "Should have no console errors" );
	} );
} );

describe( "lint integration: node config", () => {
	test( "should report strict error when use strict is missing", async () => {
		const code = "const x = \"hello\";\n";
		const results = await lintText( "node", code );
		assertHasRuleError( results, "strict" );
	} );

	test( "should not report strict error when use strict is present", async () => {
		const code = "\"use strict\";\n\nconst x = \"hello\";\n";
		const results = await lintText( "node", code );
		const strictErrors = results[0].messages.filter( m => m.ruleId === "strict" );
		assert.strictEqual( strictErrors.length, 0, "Should have no strict errors" );
	} );
} );

describe( "lint integration: browser config", () => {
	test( "should allow browser globals and module syntax", async () => {
		const code = "export function render() {\n\twindow.document.body.textContent = \"hello\";\n}\n";
		const results = await lintText( "browser", code, {}, { filePath: "browser.js" } );
		assertNoErrors( results );
	} );
} );

describe( "lint integration: esm config", () => {
	test( "should allow ES module syntax", async () => {
		const code = "export const greeting = \"hello\";\n";
		const results = await lintText( "esm", code, {}, { filePath: "module.js" } );
		assertNoErrors( results );
	} );
} );

describe( "lint integration: node-esm config", () => {
	test( "should allow import/export syntax in Node.js modules", async () => {
		const code = "import path from \"node:path\";\n\nexport default path.sep;\n";
		const results = await lintText( "node-esm", code, {}, { filePath: "module.mjs" } );
		assertNoErrors( results );
	} );
} );

describe( "lint integration: react config", () => {
	test( "should parse JSX when composed with browser config", async () => {
		const eslint = new ESLint( {
			overrideConfigFile: true,
			overrideConfig: [
				...flattenConfigs( configModule.configs.browser ),
				...flattenConfigs( configModule.configs.react )
			]
		} );
		const code = "/* eslint-disable no-unused-vars */\nconst element = <div />;\ndocument.body.append( element );\n";
		const results = await eslint.lintText( code, { filePath: "component.jsx" } );
		assertNoErrors( results );
	} );
} );

describe( "lint integration: cross-config comparison", () => {
	test( "tab indentation passes common but fails blog", async () => {
		const code = "function foo() {\n\tconst x = \"hello\";\n}\n";

		const commonResults = await lintText( "common", code );
		const commonIndentErrors = commonResults[0].messages.filter( m => m.ruleId === "@stylistic/indent" );
		assert.strictEqual( commonIndentErrors.length, 0, "Common config should accept tabs" );

		const blogResults = await lintText( "blog", code );
		assertHasRuleError( blogResults, "@stylistic/indent" );
	} );

	test( "2-space indentation fails common but passes blog", async () => {
		const code = "function foo() {\n  const x = \"hello\";\n}\n";

		const commonResults = await lintText( "common", code );
		assertHasRuleError( commonResults, "@stylistic/indent" );

		const blogResults = await lintText( "blog", code );
		const blogIndentErrors = blogResults[0].messages.filter( m => m.ruleId === "@stylistic/indent" );
		assert.strictEqual( blogIndentErrors.length, 0, "Blog config should accept 2-space indentation" );
	} );
} );
