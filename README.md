# eslint-config-reverentgeek

This package is [ReverentGeek's](https://twitter.com/reverentgeek) preferred configuration settings for [eslint](https://eslint.org/).

## Usage

1. Install dependencies.

```sh
npm install --save-dev eslint eslint-config-reverentgeek
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
