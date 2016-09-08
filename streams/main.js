var Alphabet = require('./alphabet');
var Cache = require('./cache');
var alpha = new Alphabet();
var cache = new Cache('alpha1');

/*alpha.on('data', function(chunk) {
    console.log(chunk.toString());
});*/

alpha.pipe(cache);

cache.on('finish', function() {
    console.log('Cache store:');
    for (var key in Cache.store) {
        console.log(key, ':', Cache.store[key]);
    }
});



var Numbers = require('./numbers');
// var Cache = require('./cache');
var num = new Numbers();
//  var cache1 = new Cache('number1');

num.on('data', function(chunk) {
    console.log(chunk.toString());
});

// num.pipe(cache1);

/*cache1.on('finish', function() {
    console.log(num.read());
    
    console.log('Cache store:');
    for (var key in Cache.store) {
        console.log(key, ':', Cache.store[key]);
    }
});*/

