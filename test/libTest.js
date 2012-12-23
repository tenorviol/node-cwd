var assert  = require('assert');
var lib     = require('../index');
var testLib = lib(__dirname + '/libTestLib');

describe('lib', function () {

  it('should create getters for all modules in the directory', function () {
    assert.equal(require('./libTestLib/Foo'), testLib.Foo);
    it('should work multiple times', function () {
      assert.equal(require('./libTestLib/Foo'), testLib.Foo);
    })
  });

  it('should traverse subdirectories recursively', function () {
    assert.equal(require('./libTestLib/subdir/Bar'), testLib.subdir.Bar);
    it('should work multiple times', function () {
      assert.equal(require('./libTestLib/subdir/Bar'), testLib.subdir.Bar);
    })
  });

  it('should load the current working directory ./lib directory by default', function () {
    assert.equal(require('../lib/libLoader'), lib.libLoader);
  });

});
