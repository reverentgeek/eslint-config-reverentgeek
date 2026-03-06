"use strict";

const { test, describe } = require( "node:test" );
const assert = require( "node:assert" );
const { ESLint } = require( "eslint" );
const configModule = require( "../src/index.js" );

function flattenConfigs( configs ) {
	return ( Array.isArray( configs ) ? configs.flat( Infinity ) : [ configs ] ).filter( Boolean );
}

function createESLint( configs, options = {} ) {
	return new ESLint( {
		overrideConfigFile: true,
		overrideConfig: flattenConfigs( configs ),
		...options
	} );
}

async function lintText( configs, code, eslintOptions = {}, lintOptions = {} ) {
	const eslint = createESLint( configs, eslintOptions );
	return eslint.lintText( code, lintOptions );
}

function assertNoErrors( results ) {
	assert.strictEqual(
		results[0].errorCount,
		0,
		`Expected zero errors, got ${ results[0].errorCount }. Messages: ${ JSON.stringify( results[0].messages.map( message => ( { ruleId: message.ruleId, message: message.message } ) ) ) }`
	);
}

function assertHasRuleError( results, ruleId ) {
	const match = results[0].messages.find( message => message.ruleId === ruleId );
	assert.ok( match, `Expected rule "${ ruleId }" to report an error, but it did not. Messages: ${ JSON.stringify( results[0].messages.map( message => message.ruleId ) ) }` );
}

describe( "config combinations", () => {
	test( "browser + react should parse JSX with browser globals", async () => {
		const code = "/* eslint-disable no-unused-vars */\nconst element = <div />;\ndocument.body.append( element );\n";
		const results = await lintText(
			[
				...flattenConfigs( configModule.configs.browser ),
				...flattenConfigs( configModule.configs.react )
			],
			code,
			{},
			{ filePath: "component.jsx" }
		);

		assertNoErrors( results );
	} );

	test( "browser + blog should use blog indentation override", async () => {
		const code = "document.body.textContent = \"hello\";\n";
		const results = await lintText( [
			...flattenConfigs( configModule.configs.browser ),
			...flattenConfigs( configModule.configs.blog )
		], code );

		assertNoErrors( results );
	} );

	test( "node + blog should preserve node rules while using blog indentation", async () => {
		const code = "\"use strict\";\n\nconsole.log( \"hello\" );\n";
		const results = await lintText( [
			...flattenConfigs( configModule.configs.node ),
			...flattenConfigs( configModule.configs.blog )
		], code );

		assertNoErrors( results );
	} );

	test( "node + blog should still enforce strict mode", async () => {
		const code = "function logMessage() {\n  console.log( \"hello\" );\n}\n";
		const results = await lintText( [
			...flattenConfigs( configModule.configs.node ),
			...flattenConfigs( configModule.configs.blog )
		], code );

		assertHasRuleError( results, "strict" );
	} );
} );
