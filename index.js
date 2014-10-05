var spawn = require('child_process').spawn;
var Q = require('q');
var _ = require('lodash');

// executes given command with specified arguments and options
module.exports = function(cmd, args, options) {
	args = args || [];
	options = options || {};

	var opts = {
		encoding: 'utf8',
		timeout: 1000 * 60,
		killSignal: 'SIGKILL',
		maxBuffer: 1024 * 1024,
		cwd: options.cwd || process.cwd(),
		env: process.env
	};
	opts = _.extend(opts, options);

	// inherit process identity
	if (process.getuid) {
		opts.uid = process.getuid();
	}
	if (process.getgid) {
		opts.gid = process.getgid();
	}

	var def = Q.defer();

	if (opts.verbose) {
		console.log("%s %s", cmd, args.join(' '));
	}

	var child = spawn(cmd, args, opts);

	var stdout = '';
	var stderr = '';

	child.stdout.on('data', function(data) {
		if (stdout) {
			stdout += '\n';
		}
		stdout += (data || '').toString().trim();
	});

	child.stderr.on('data', function(data) {
		if (stderr) {
			stderr += '\n';
		}
		stderr += (data || '').toString().trim();
	});

	child.on('error', function(err) {
		var msg = (err || '').toString().trim();
		if (opts.verbose) {
			console.error(msg);
		}
		def.reject(msg);
	});

	child.on('close', function() {
		if (!def.promise.isPending()){
			return;
		}
		if (stderr) {
			if (opts.verbose) {
				console.error(stderr);
			}
			return def.reject(stderr);
		}
		if (opts.verbose) {
			console.error(stdout);
		}
		return def.resolve(stdout);
	});

	return def.promise;
};
