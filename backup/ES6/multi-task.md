### multi-task
```js
var Promise = require('bluebird')
  , thunkify = require('thunkify')
  , co        = require('co');

var time = function(str, callback) {
  setTimeout(function(){
    callback(null, str)
  }, 1000)
}

console.time('Generator');
co.wrap(function*(){
  var res1 = yield thunkify(time)('gen-a');
  var res2 = yield thunkify(time)('gen-b')
  console.log('Generator  res1: ' + res1 + '  res2: ' + res2);
  console.timeEnd('Generator')
})();


console.time('Promise');
Promise.all([Promise.promisify(time)('pro-a'), Promise.promisify(time)('pro-b')]).then(function(res){
  console.log('Promise  res1: ' + res[0] + '  res2: ' + res[1]);
  console.timeEnd('Promise')
})

/*
output:
Promise  res1: pro-a  res2: pro-b
Promise: 1004.672ms
Generator  res1: gen-a  res2: gen-b
Generator: 2002.848ms
*/
```
