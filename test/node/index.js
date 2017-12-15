var dogEmitter = require('./dog.emitter');
var catEmitter = require('./cat.emitter');

dogEmitter
  .on('woof', function(data) {
    console.info('woof', data);
  })
  .on('walk', function(data) {
    console.info('walk', data);
  });

catEmitter
  .on('meow', function(nameData, addressData) {
    console.info('meow', nameData, addressData);
  })
  .on('lazy', function(data) {
    console.info('lazy cat', data);
  });

dogEmitter.on('error', function(error) {
  console.error('WoofError:', error);
});

catEmitter.on('error', function(error) {
  console.error('MeowError:', error);
});
catEmitter.on('ad');

catEmitter
  .emit('meow', { catName: 'Pully' }, { address: 'Pussy Ville' })
  .emit('walk', {}); // this should throw an error and catch on `error` handler of catEmitter

dogEmitter
  .emit('woof', { dogName: 'Pugky' })
  .emit('walk', { walkDuration: '3.4 hr' })
  .emit('poof', '');

setTimeout(function() {
  catEmitter.emit('lazy', { lazy: true });
}, 1000);
