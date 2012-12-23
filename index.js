var fs = require('fs');

// to the lib loader module
var libLoader = require('./lib/libLoader');

// load the current process's ./lib directory onto the libLoader function
var libDir = process.cwd() + '/lib';
var stat = fs.statSync(libDir);
if (stat.isDirectory()) {
  var lib = libLoader(process.cwd() + '/lib', libLoader);
} else {
  var lib = libLoader;
}

module.exports = lib;
