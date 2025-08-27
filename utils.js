"use strict";
// merge-configs.js
// Utility to merge ESLint config objects for name, plugins, languageOptions, and rules

function merge( ...configs ) {
	const languageOptions = {
		sourceType: configs.map( cfg => cfg?.languageOptions?.sourceType ).filter( Boolean ).pop(),
		globals: Object.assign( {}, ...configs.map( cfg => cfg?.languageOptions?.globals || {} ) )
	};
	return {
		name: configs.map( cfg => cfg?.name ).filter( Boolean ).pop(),
		plugins: Object.assign( {}, ...configs.map( cfg => cfg?.plugins || {} ) ),
		languageOptions,
		rules: Object.assign( {}, ...configs.map( cfg => cfg?.rules || {} ) )
	};
}

module.exports = { merge };
