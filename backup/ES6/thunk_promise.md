## Thunk VS Promise
```js
var Promise = require('bluebird')
  , thunkify = require('thunkify')
  , co = require('co')

co.wrap(function*(){
  var res = yield thunkify(function(callback) {
    setTimeout(function(){
      callback(null, 'Hello thunkify')
    }, 1000)
  })();
  console.log('res:' + res);

})();

Promise.coroutine(function* () {
  var res = yield new Promise(function(resolve, reject) {
    setTimeout(function(){
      resolve('Hello promise')
    }, 2000)
  })
  console.log('res:' + res);
})();

co.wrap(function* () {
  var res = yield new Promise(function(resolve, reject) {
    setTimeout(function(){
      resolve('Hello promise by co.')
    }, 3000)
  })
  console.log('res:' + res);
})();

```
