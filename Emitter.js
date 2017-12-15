var Emitter = function() {
  this.listeners = {};
};

/**
 * custom forEach loop
 * 
 * @param {function} fn 
 */
function forEach(fn) {
  var array = this;
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    fn(array[i], i);
  }
}

Object.defineProperty(Array.prototype, 'each', {
	enumerable: false,
	value: forEach,
});


Object.defineProperty(Array.prototype, 'all', {
	enumerable: false,
	value: forEach,
});

Object.defineProperty(Array.prototype, 'eventEmitterForEach', {
  enumerable: false,
  value: forEach,
});

/**
 * emit triggers an event type
 * 
 * @param {string} type 
 * @param {any} arg1 
 * @param {any} arg2 
 * @param {any} arg3 
 * @returns this
 */
Emitter.prototype.emit = function(type, arg1, arg2, arg3) {
  if (this.listeners[type] === undefined) {
    var error = new Error('No event listeners for event named: ' + type);
    if (type === 'error') {
      console.error(error);
    } else {
      this.emit('error', error);
    }
    return;
  }

  var argsLength = arguments.length;
  var args = new Array(argsLength - 1);

  this.listeners[type].each(function(listener) {
    switch (argsLength - 1) {
      case 1:
        listener.call(this, arg1);
        break;
      case 2:
        listener.call(this, arg1, arg2);
        break;
      case 3:
        listener.call(this, arg1, arg2, arg3);
        break;
      default:
        arguments.each(function(arg, i) {
          if (i > 0) {
            args[i - 1] = arg;
          }
        });
        listener.apply(this, args);
    }
  });
  return this;
};

/**
 * add a listener to a particular event type
 * 
 * @param {string} type 
 * @param {function} listener 
 * @returns this
 */
Emitter.prototype.addListener = function(type, listener) {
  if (!type) return;
  if (!listener) {
    this.emit('error', new Error('listener undefined for event: ' + type));
    return;
  }

  var eventListeners = this.listeners[type];
  if (!eventListeners) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(listener);
  return this;
};

/**
 * remove listeners of type
 * 
 * @param {string} type 
 */
Emitter.prototype.removeListener = function(type) {
  if (!!type === false) {
    this.listeners = {};
  } else {
    delete this.listeners[type];
  }
};

Emitter.prototype.on = Emitter.prototype.addListener;
