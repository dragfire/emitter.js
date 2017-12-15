var counter = 0;
var eventEmitter = new Emitter();

function increment() {
  ++counter;
  eventEmitter.emit('click', counter);
}
function decrement() {
  --counter;
  eventEmitter.emit('click', counter);
}
eventEmitter.on('click', function(counter) {
  document.getElementById('counter').textContent = counter;
});
