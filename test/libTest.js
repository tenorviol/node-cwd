var assert = require('assert');
var lib = require('../index')(__dirname + '/libTestLib');

describe('lib', function () {
  it('should create getters for all modules', function () {
    assert.equal(require('./libTestLib/Foo'), lib.Foo);
    it('should work multiple times', function () {
      assert.equal(require('./libTestLib/Foo'), lib.Foo);
    })
  });
  it('should traverse subdirectories recursively', function () {
    assert.equal(require('./libTestLib/subdir/Bar'), lib.subdir.Bar);
    it('should work multiple times', function () {
      assert.equal(require('./libTestLib/subdir/Bar'), lib.subdir.Bar);
    })
  });
});
