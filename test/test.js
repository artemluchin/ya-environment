var assert = require('assert');
// var app = require('../public/js/app');

describe('Array', function() {
  it('should return -1 when the value is not present', function() {
    assert.equal(-1, [1,2,3].indexOf(4));
  });
});

// describe('Function', function() {
//   it('should return sum ', function() {
//     assert.equal(8, app.addSome(5, 3));
//   });
// });