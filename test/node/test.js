var assert = require('assert');
var Emitter = require('../../dist/Emitter');

describe('Starting Test', function() {
  var emitter = new Emitter();
  describe('Initialize Emitter', function() {
    it('should have a constructor name called `Emitter`', function() {
      assert.equal(emitter.constructor.name, 'Emitter');
    });
  });
});
