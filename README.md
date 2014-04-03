[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Build Status](https://drone.io/github.com/sergeyt/exequte/status.png)](https://drone.io/github.com/sergeyt/exequte/latest)

[![NPM version](https://badge.fury.io/js/exequte.png)](http://badge.fury.io/js/exequte)
[![Deps Status](https://david-dm.org/sergeyt/exequte.png)](https://david-dm.org/sergeyt/exequte)
[![devDependency Status](https://david-dm.org/sergeyt/exequte/dev-status.png)](https://david-dm.org/sergeyt/exequte#info=devDependencies)

[![NPM](https://nodei.co/npm/exequte.png?downloads=true&stars=true)](https://nodei.co/npm/exequte/)

# exequte

Nodejs function to execute child process in promise style

## Usage

Use as in examples below:

### JavaScript Example

```javascript
var exec = require('exequte');

exec('git', ['help']).then(function(out){
	console.log(out);
}.fail(function(err){
	console.log err;
});
```

### CoffeeScript Example

```coffeescript
exec = require 'exequte'

exec('git', ['help'])
	.then (out) ->
		console.log out
	.fail (err) ->
		console.log err
```
