var fs = require('fs');
var path = require('path');

module.exports = libLoader;

/**
 * Returns an object with properties for each module in a directory.
 * Subdirectories are expressed as recursive module loaders.
 * All modules and subdirectories are loaded lazily.
 * Module name collisions will cause the loader to throw.
 */
function libLoader(dir, lib) {
  lib = lib || {};

  var files = fs.readdirSync(dir);
  files.forEach(function (file) {
    var full = dir + '/' + file;
    var stat = fs.statSync(full);

    // directories recursively load modules
    if (stat.isDirectory()) {
      // one-time module loader getter
      lib.__defineGetter__(file, function () {
        delete this[file];
        this[file] = libLoader(full);
        return this[file];
      });
      return;
    }

    // known module extensions are required
    var ext = path.extname(file);
    if (require.extensions[ext]) {
      var base = path.basename(file, ext);

      // collisions throw to avoid the ambiguous case
      if (lib[base]) {
        throw new Error('Ambiguous module, "' + base + '", found in ' + dir);
      }

      // one-time require getter
      lib.__defineGetter__(base, function () {
        delete this[base];
        this[base] = require(full);
        return this[base];
      });
      return;
    }
  });

  return lib;
}
