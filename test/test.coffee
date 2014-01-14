exec = require '../index'

exec('git', ['help'])
.then (out) ->
	console.log out
.fail (err) ->
	console.log err

