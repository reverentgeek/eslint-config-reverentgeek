<!-- markdownlint-disable MD010 -->
# eslint-config-reverentgeek

This package is [ReverentGeek's](https://reverentgeek.com/about/) preferred configuration settings for [eslint](https://eslint.org/).

## Available Configs

| Config | Description |
| ------ | ----------- |
| `common` | Base configuration with core stylistic and JavaScript rules |
| `node` | Node.js with CommonJS modules (extends common) |
| `node-esm` | Node.js with ES modules (extends common) |
| `browser` | Browser environment with ES modules (extends common) |
| `react` | Adds JSX support |
| `esm` | ES modules support |
| `blog` | 2-space indentation for blog code samples |

## Usage

1. Install dependencies.

	```sh
	npm install --save-dev eslint eslint-config-reverentgeek
	```

2. Create an `eslint.config.js` file.
3. Add the following to the config file.

```js
"use strict";

const defineConfig = require( "eslint/config" ).defineConfig; // eslint-disable-line n/no-unpublished-require
const rg = require( "eslint-config-reverentgeek" ); // eslint-disable-line n/no-unpublished-require

module.exports = defineConfig( [
	{
		extends: [ rg.configs.node ],
		rules: {
		}
	}
] );
```

The _node_ config adds specific support for Node.js and CommonJS modules.

## Alternative Configs

The _node-esm_ config adds specific support for Node.js and ES modules (`import`/`export`).

```js
import { defineConfig } from "eslint/config"; // eslint-disable-line n/no-unpublished-import
import rg from "eslint-config-reverentgeek"; // eslint-disable-line n/no-unpublished-import

export default defineConfig( {
	extends: [ rg.configs["node-esm"] ],
	rules: {
	}
} );
```

The _blog_ config changes the code style to two-spaced indentations, which is better for copying code samples to blog posts.

```js
import { defineConfig } from "eslint/config";
import rg from "eslint-config-reverentgeek";

export default defineConfig( {
  extends: [ rg.configs.browser, rg.configs.blog ]
} );
```

The _react_ config adds specific support for React, browser, and ES modules (`import`/`export`).

```sh
npm install --save-dev eslint-plugin-react
```

```js
import { defineConfig } from "eslint/config";
import rg from "eslint-config-reverentgeek";
import react from "eslint-plugin-react";

export default defineConfig( {
	extends: [ rg.configs.browser, rg.configs.react ],
	plugins: {
		react
	},
	rules: {
	}
} );
```

The _browser_ config sets the `browser` environment and adds ES module support.

```js
import { defineConfig } from "eslint/config";
import rg from "eslint-config-reverentgeek";

export default defineConfig( {
	extends: [ rg.configs.browser ]
} );
```
