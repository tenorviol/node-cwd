// to the lib loader module
var libLoader = require('./lib/libLoader');

// load the current process directory on top of the libLoader function
var lib = libLoader(process.cwd(), libLoader);

module.exports = lib;
