"use strict";

const { describe } = require( "node:test" );
const { testBasicConfigStructure, testHasRules, testHasPlugins, getConfig } = require( "./test-helpers.js" );

describe( "common config", () => {
	const commonConfig = getConfig( "common" );

	testBasicConfigStructure( "common", commonConfig );

	testHasRules( commonConfig, [
		"no-var",
		"no-console",
		"@stylistic/array-bracket-spacing",
		"@stylistic/brace-style",
		"@stylistic/comma-dangle",
		"@stylistic/comma-spacing",
		"@stylistic/eol-last",
		"@stylistic/indent",
		"@stylistic/linebreak-style",
		"@stylistic/no-multiple-empty-lines",
		"@stylistic/no-tabs",
		"@stylistic/no-trailing-spaces",
		"@stylistic/object-curly-spacing",
		"@stylistic/quote-props",
		"@stylistic/quotes",
		"@stylistic/semi",
		"@stylistic/space-in-parens",
		"@stylistic/template-curly-spacing"
	] );

	testHasPlugins( commonConfig, [ "@stylistic" ] );
} );
