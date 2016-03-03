## Express to KOA
* 去除express变量, "var express     = require('express');"
* 更改router变量赋值, "var router      = express.Router();" 改为 “var router      = require('koa-router')();”
* 更正module.exports = router.routes();
* 修改function(req, res) 为 function* ()
 
  修改路径为全路径 router.get('/:id') 改为 router.get('/test/:id')

* res.render 改为 this.render
 
  res.redirect 改为 this.redirect

  res.end 改为 this.body
  
  res.json 改为 this.body

* req.headers 改为 this.request.headers

* req.params.xxx 改为 this.params.xxx

  req.query.xxx 改为 this.query.xxx

* res.cookie 改为 this.cookies.set

  req.cookies 改为 this.cookies.get

* req.body 改为 this.request.body

* require('../lib/httpRequest.js') 改为 require('../lib/httpRequest.v2.js');

* http.get 的回调调用改为 yield 调用，并赋值为body

  如 var data = yield http.get.call(this, 'http://xxx/xxx'), data = data.body;
