---
layout: post
title:  "generator demo"
date:   2016-02-15 19:05:00 +0800
categories: es6 generator
tags: [javascript, es6]
---

# app.js

{% highlight js linenos %}
var koa       = require('koa');
var app       = koa();
var unirest   = require('unirest');
var thunkify  = require('thunkify');


// Use thunkify to wrap custom async function.
var get1 = thunkify(function(callback) {
  unirest.get('http://www.baidu.com')
  .end(function(response) {
    callback(null, response);
  })
});

// "thunkify" simple version.
var get2 = function() {

  return function(done){

    try {
      unirest.get('http://www.baidu.com')
        .end(function(response) {

          done(null, response)
      })
    } catch (err) {
      done(err);
    }
  }
}

// Exception demo.
var geterror = thunkify(function(callback) {

  unirest.get('http://www.baidu.com')
    .end(function(response) {

      // throw new Error('uncaughtErrorTest') // This exception can't be caught by generator.
      callback(new Error('uncaughtErrorTest'))
  })
})

// Simple router.
app.use(function *(){
  var response;
  try {
    if (this.path === '/get1') {
      console.log('get1')
      response = yield get1();
      this.body = response.body;

    } else if (this.path === '/get2') {
      console.log('get2')
      response = yield get2();
      this.body = response.body;

    } else if (this.path === '/geterror') {
      console.log('geterror')
      this.status = 500;
      response = yield geterror()
      this.body = response.body;

    } else {
      console.log(this.path)
      this.body = '<a href="/get1">get1</a><br><a href="/get2">get2</a><br><a href="/geterror">geterror</a>'
    }
  } catch (e) {
    console.log(e)
    this.body = e.stack;
  }
});


app.listen(3000);
console.log('\r\nVisit localhost:3000 to debug it.')

{% endhighlight %}


# package.json

{% highlight json %}
{
  "name": "test-koa",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^1.1.2",
    "thunkify": "^2.1.2",
    "unirest": "^0.4.2"
  }
}

{% endhighlight %}
