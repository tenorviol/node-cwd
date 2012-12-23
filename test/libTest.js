var assert     = require('assert');
var lib        = require('../index');
var libTestLib = lib(__dirname + '/libTestLib');
var test       = lib('test');

describe('lib', function () {

  it('should create getters for all modules in the directory', function () {
    assert.equal(require('./libTestLib/Foo'), libTestLib.Foo);
    it('should work multiple times', function () {
      assert.equal(require('./libTestLib/Foo'), libTestLib.Foo);
    })
  });

  it('should traverse subdirectories recursively', function () {
    assert.equal(require('./libTestLib/subdir/Bar'), libTestLib.subdir.Bar);
    it('should work multiple times', function () {
      assert.equal(require('./libTestLib/subdir/Bar'), libTestLib.subdir.Bar);
    })
  });

  it('should load the current working directory ./lib directory by default', function () {
    assert.equal(require('../lib/libLoader'), lib.libLoader);
  });

  it('should load relative paths from the current working directory', function () {
    assert.equal(exports, test.libTest);
  })

});
