# eslint-config-reverentgeek

This package is [ReverentGeek's](https://twitter.com/reverentgeek) preferred configuration settings for [eslint](https://eslint.org/).

## Usage (eslint >= v9.0)

1. Install dependencies.

```sh
npm install --save-dev eslint eslint-config-reverentgeek
```

2. Create an `eslint.config.js` file.
3. Add the following to the config file.

```js
"use strict";

const rgConfig = require( "eslint-config-reverentgeek" );
module.exports = [
	...rgConfig.configs.common,
	{
		rules: {
		}
	}
];
```

## Alternative Configs

The _blog_ config changes the code style to two-spaced indentions, which is better for copying code samples to blog posts.

```js
"use strict";

const rgConfig = require( "eslint-config-reverentgeek" );
module.exports = [
	...rgConfig.configs.browser,
	...rgConfig.configs.blog,
	{
		rules: {
		}
	}
];
```

The _node_ config adds specific support for Node.js and CommonJS modules.

```js
"use strict";

const rgConfig = require( "eslint-config-reverentgeek" );
module.exports = [
	...rgConfig.configs.node,
	{
		rules: {
			"n/no-unpublished-require": [ "error", {
				allowModules: [ "eslint-config-reverentgeek" ]
			} ]
		}
	}
];
```

The _node-exm_ config adds specific support for Node.js and ES modules (`import`/`export`).

```js
"use strict";

const rgConfig = require( "eslint-config-reverentgeek" );
module.exports = [
	...rgConfig.configs[ "node-esm" ],
	{
		rules: {
			"n/no-extraneous-require": [ "error", {
				allowModules: [ "eslint-config-reverentgeek" ]
			} ]
		}
	}
];
```

The _browser_ config sets the `browser` environment and adds ES module support.

```js
"use strict";

const rgConfig = require( "eslint-config-reverentgeek" );
module.exports = [
	...rgConfig.configs.browser,
	{
		rules: {
		}
	}
];
```

## Legacy .eslintrc.js support (eslint < v9.0)

1. Install dependencies.

```sh
npm install --save-dev eslint@8 eslint-config-reverentgeek@4
```

2. Create an `.eslintrc.js` file.
3. Add the following to the config file.

```js
module.exports = {
	extends: [ "reverentgeek" ]
};
```

## Alternative Rule Sets

The _blog_ rule set changes to code style to two-spaced indentions, which is better for copying code samples to blog posts.

```js
module.exports = {
	extends: [ "reverentgeek/blog" ]
};
```

The _node_ rule set adds specific support for Node.js and CommonJS modules.

```js
"use strict";

module.exports = {
	extends: [ "reverentgeek/node" ]
};
```

The _node/module_ rule set adds specific support for Node.js and ES modules (`import`/`export`).

```js
"use strict";

module.exports = {
	extends: [ "reverentgeek/node/module" ]
};
```

The _browser_ rule set the `browser` environment and adds ES module support.

```js
module.exports = {
	extends: [ "reverentgeek/browser" ]
};
```
