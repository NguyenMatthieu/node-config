var SynchronousPromise = require('synchronous-promise').SynchronousPromise;

// Create a deferredConfig prototype so that we can check for it when reviewing the configs later.
function DeferredConfig () {
}
DeferredConfig.prototype.resolve = function (config, original) {};

// Accept a function that we'll use to resolve this value later and return a 'deferred' configuration value to resolve it later.
function deferConfig (func) {
  var obj = Object.create(DeferredConfig.prototype);
  obj.resolve = function(config, original) {
    var resolve, promise = new SynchronousPromise(function(res) { resolve = res; });
    promise.exec = function() {
      resolve(func.call(config, config, original));
      return promise;
    };
    return promise;
  };
  return obj;
}

module.exports.deferConfig = deferConfig;
module.exports.DeferredConfig = DeferredConfig;
