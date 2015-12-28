# regexp-like
Get a RegExp object from a SQL LIKE string.

## Usage

```javascript
var RexExpLIKE = require('regexp-like')

var jonny = new RexExpLIKE('John %')
jonny.test('John Adams') // true
jonny.test('Charles Adams') // false'

```

See [LIKE](https://msdn.microsoft.com/en-us/library/ms179859.aspx) for more information.

### API documentation

Detailed API docs can be found [here](http://openfin.github.io/regexp-like/RexExpLIKE.html).

### Demo

A demo can be found [here](http://openfin.github.io/regexp-like/demo.html).

### CDN versions

To use in a browser, you have two options:

1. Incorporate the node module into your own browserified project.
2. Use the browser-ready versions [`regexp-like.js`](http://openfin.github.io/regexp-like/regexp-like.js) or [`regexp-like.min.js`](http://openfin.github.io/regexp-like/regexp-like.min.js) available on the Github pages CDN.

### Submodules

See the note [Regarding submodules](https://github.com/openfin/rectangular#regarding-submodules)
for important information on cloning this repo or re-purposing its build template.
