var assert     = require('assert');
var cwd        = require('../index');
var cwdTestDir = cwd(__dirname + '/cwdTestDir');
var test       = cwd('test');

describe('cwd', function () {

  it('should create getters for all modules in the directory', function () {
    assert.equal(require('./cwdTestDir/Foo'), cwdTestDir.Foo);
    it('should work multiple times', function () {
      assert.equal(require('./cwdTestDir/Foo'), cwdTestDir.Foo);
    })
  });

  it('should traverse subdirectories recursively', function () {
    assert.equal(require('./cwdTestDir/subdir/Bar'), cwdTestDir.subdir.Bar);
    it('should work multiple times', function () {
      assert.equal(require('./cwdTestDir/subdir/Bar'), cwdTestDir.subdir.Bar);
    })
  });

  it('should load the current working directory ./cwd directory by default', function () {
    assert.equal(require('../lib/libLoader'), cwd.lib.libLoader);
  });

  it('should load relative paths from the current working directory', function () {
    assert.equal(exports, test.cwdTest);
  })

});
