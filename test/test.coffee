exec = require '../index'
iswin = require 'iswin'
cmd = if iswin() then 'hg.exe' else 'git'

exec(cmd, ['help'], {verbose: true})
.then (out) ->
	console.log out
.fail (err) ->
	console.log err

