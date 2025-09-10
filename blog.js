"use strict";

async function createConfig() {
	const styles = await import( "@stylistic/eslint-plugin" );

	return {
		plugins: {
			"@stylistic": styles.default
		},
		rules: {
			"no-console": [ "off" ],
			"@stylistic/indent": [ "error", 2 ]
		}
	};
}

module.exports = createConfig();

