var fs = require('fs');
var path = require('path');

module.exports = libLoader;

/**
 * Returns an object with properties for each module in a directory.
 * Subdirectories are expressed as recursive module loaders.
 * All modules and subdirectories are loaded lazily and synchrnoously.
 * Module name collisions will cause the loader to throw.
 */
function libLoader(dir, lib) {
  dir = path.resolve(process.cwd(), dir);
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
        return this[file] = libLoader(full);
      });
      return;
    }

    // known module extensions are loaded (unknowns discarded)
    var ext = path.extname(file);
    if (require.extensions[ext]) {
      var base = path.basename(file, ext);

      if (lib[base]) {
        // collision! throw for the ambiguous case
        throw new Error('Ambiguous module, "' + base + '", found in ' + dir);
      }

      // one-time getter
      lib.__defineGetter__(base, function () {
        delete this[base];
        return this[base] = require(full);
      });
    }
  });

  return lib;
}
