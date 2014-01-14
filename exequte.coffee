{spawn} = require 'child_process'
Q = require 'q'
_ = require 'lodash'

# executes given command with specified arguments and options
module.exports = (cmd, args, options) ->
	args = [] if not args
	options = {} if not options

	opts =
		encoding: 'utf8'
		timeout: 1000 * 60
		killSignal: 'SIGKILL'
		maxBuffer: 1024 * 1024
		cwd: options.cwd || process.cwd()
		env: process.env
	opts = _.extend opts, options

	# inherit process identity
	opts.uid = process.getuid() if process.getuid
	opts.gid = process.getgid() if process.getgid

	def = Q.defer()

	if opts.verbose
		console.log "#{cmd} #{args.join(' ')}"

	child = spawn cmd, args, opts

	stdout = ''
	stderr = ''

	child.stdout.on 'data', (data) ->
		stdout += data?.toString().trim()

	child.stderr.on 'data', (data) ->
		stderr += data?.toString().trim()

	child.on 'error', (err) ->
		msg = err?.toString().trim()
		if opts.verbose
			console.error msg
		def.reject msg

	child.on 'close', ->
		return if not def.promise.isPending()
		return def.reject stderr if stderr
		def.resolve stdout

	def.promise
