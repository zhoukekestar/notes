---
layout: post
title:  "koa 源码浅析"
date:   2017-07-22
tags: [js]
commentIssueId: 37
---

kao 源码浅析:
* use middleware
* listen -> callback -> compose
* handleRequest
* createContext -> middleware -> response

## 部分子模块及简要说明
* [koa-compose](https://github.com/koajs/compose/blob/master/index.js): 组合和遍历`middleware`

  ```js
  // 简化版的 compose，（不含类型检测和异常处理）
  module.exports = (middleware) => (context, next) => {
    const dispatch = (i) => {
      let fn = middleware[i]
      if (i === middleware.length) return Promise.resolve()

      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0);
  }
  ```
* [on-finished](https://github.com/jshttp/on-finished/blob/master/index.js): Execute a callback when a HTTP request closes, finishes, or errors.

  ```js
  var destroy = require('destroy')
  var http = require('http')
  var onFinished = require('on-finished')

  http.createServer(function onRequest(req, res) {
    var stream = fs.createReadStream('package.json')
    stream.pipe(res)
    onFinished(res, function (err) {
      destroy(stream)
    })
  })
  ```
* [statuses](https://www.npmjs.com/package/statuses): HTTP status utility for node.

  ```js
  status(403) // => 403
  status('403') // => 403
  status('forbidden') // => 403
  status('Forbidden') // => 403

  status.empty[200] // => undefined
  status.empty[204] // => true
  status.empty[304] // => true
  ```

* [cookies](https://www.npmjs.com/package/cookies): Cookies 工具集。

  ```js
  var http    = require( "http" )
  var Cookies = require( "cookies" )

  server = http.createServer( function( req, res ) {
    var cookies = new Cookies( req, res, { "keys": keys } )
      , unsigned, signed, tampered

    if ( req.url == "/set" ) {
      cookies
        // set a regular cookie
        .set( "unsigned", "foo", { httpOnly: false } )

        // set a signed cookie
        .set( "signed", "bar", { signed: true } )

        // mimic a signed cookie, but with a bogus signature
        .set( "tampered", "baz" )
        .set( "tampered.sig", "bogus" )

      res.writeHead( 302, { "Location": "/" } )
      return res.end( "Now let's check." )
    }

    unsigned = cookies.get( "unsigned" )
    signed = cookies.get( "signed", { signed: true } )
    tampered = cookies.get( "tampered", { signed: true } )

    assert.equal( unsigned, "foo" )
    assert.equal( signed, "bar" )
    assert.notEqual( tampered, "baz" )
    assert.equal( tampered, undefined )

    res.writeHead( 200, { "Content-Type": "text/plain" } )
    res.end(
      "unsigned expected: foo\n\n" +
      "unsigned actual: " + unsigned + "\n\n" +
      "signed expected: bar\n\n" +
      "signed actual: " + signed + "\n\n" +
      "tampered expected: undefined\n\n"+
      "tampered: " + tampered + "\n\n"
    )
  })
  ```
* [accepts](https://www.npmjs.com/package/accepts): Accepts 工具集。

  ```js
  var accepts = require('accepts')
  var http = require('http')

  function app(req, res) {
    var accept = accepts(req)

    // the order of this list is significant; should be server preferred order
    switch(accept.type(['json', 'html'])) {
      case 'json':
        res.setHeader('Content-Type', 'application/json')
        res.write('{"hello":"world!"}')
        break
      case 'html':
        res.setHeader('Content-Type', 'text/html')
        res.write('<b>hello, world!</b>')
        break
      default:
        // the fallback is text/plain, so no need to specify it above
        res.setHeader('Content-Type', 'text/plain')
        res.write('hello, world!')
        break
    }

    res.end()
  }

  http.createServer(app).listen(3000)
  ```

## 主要流程

点击查看大图

[![koa](https://user-images.githubusercontent.com/7157346/28489690-d58f9fbc-6efa-11e7-9614-b408858eff8a.jpg)](https://user-images.githubusercontent.com/7157346/28489690-d58f9fbc-6efa-11e7-9614-b408858eff8a.jpg)
