# regexp-like
Get a RegExp object from a SQL LIKE string.

## Usage

```javascript
var rexExpLIKE = require('regexp-like')

var jonnyLike = rexExpLIKE('John %')
jonnyLike.test('John Adams') // true
jonnyLike.test('John Wayne') // true
jonnyLike.test('Charles Adams') // false
jonnyLike.test('Johnathan Adams') // false

```

_See [LIKE](https://msdn.microsoft.com/en-us/library/ms179859.aspx) for more information._

The conversion algorithm is not trivial so I've provided a simple mechanism for caching converted patterns. In this example, subsequent calls to `regExpLIKE()` retrives the previously converted pattern from the cache. (Note the `.cached` in the following!)

```javascript
var rexExpLIKE = require('regexp-like').cached

rexExpLIKE('John %').test('John Adams') // true
rexExpLIKE('John %').test('John Wayne') // true

```

### API documentation

Detailed API docs can be found [here](http://openfin.github.io/regexp-like/rexExpLIKE.html).

### How the cache works

The cache is simply a hash and will grow indefinitely unless you manage it. This may or may not be necessary depending on how your app is using the cache.

#### Automatic cache management

The maximum cache size (`regExpLIKE.cacheMax`) is initially undefined. You can set it at any time and it this new limit will be respected on the next call to `regExpLIKE.cached()`:
 
```javascript
regExpLIKE.cacheMax = 100;
```

Depending on your app, reasonable values might be 100, 400, 800, etc.

When the cache becomes full, the next new pattern to be cached causes the least-recently-used 10% of the patterns to be culled from the cache.

#### Manual cache management

To clear the cache entirely:

```javascript
regExpLIKE.clearCache();
```

To delete a single previously inserted LIKE `pattern`:

```javascript
regExpLIKE.clearCache(pattern);
```

To get the current size of the cache:

```javascript
var currentCacheSize = regExpLIKE.getCacheSize();
```

### Demo

A trivial demo can be found [here](http://openfin.github.io/regexp-like/demo.html).

### CDN versions

To use in a browser, you have two options:

1. Incorporate the node module into your own browserified project.
2. Use the browser-ready versions [`regexp-like.js`](http://openfin.github.io/regexp-like/regexp-like.js) or [`regexp-like.min.js`](http://openfin.github.io/regexp-like/regexp-like.min.js) available on the Github pages CDN.

### Submodules

See the note [Regarding submodules](https://github.com/openfin/rectangular#regarding-submodules)
for important information on cloning this repo or re-purposing its build template.
