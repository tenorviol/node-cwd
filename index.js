var fs = require('fs');

// to the lib loader module
var libLoader = require('./lib/libLoader');

// load the current process's ./lib directory onto the libLoader function
var libDir = process.cwd() + '/lib';
var stat = fs.statSync(libDir);
var lib = stat.isDirectory() ? libLoader(libDir, libLoader) : libLoader;

module.exports = lib;
