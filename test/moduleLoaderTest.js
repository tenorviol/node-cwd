var assert = require('assert');
var libLoader = require('../lib/libLoader');

describe('libLoader', function () {
  var lib = libLoader(__dirname + '/libLoaderTestLib');
  it('should create getters for all modules', function () {
    assert.equal(require('./libLoaderTestLib/Foo'), lib.Foo);
    it('should work multiple times', function () {
      assert.equal(require('./libLoaderTestLib/Foo'), lib.Foo);
    })
  });
  it('should traverse subdirectories recursively', function () {
    assert.equal(require('./libLoaderTestLib/subdir/Bar'), lib.subdir.Bar);
    it('should work multiple times', function () {
      assert.equal(require('./libLoaderTestLib/subdir/Bar'), lib.subdir.Bar);
    })
  });
});
