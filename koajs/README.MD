## Express to Koa
| Express | Koa |
| ----- | ----- |
| var express = require('express'), router = express.Router();| var router = require('koa-router')(); |
| module.exports = router | module.exports = router.routes() |
| function(req, res) | function* () |
| router.get('/:id') //relative path | router.get('/test/:id') // fullpath |
| res.render('') | this.render('') |
| res.redirect('') | this.redirect('') |
| res.end('') | this.body = '' |
| req.headers | this.request.headers |
| req.params.xxx | this.params.xxx |
| req.query.xxx | this.query.xxx |
| res.cookie | this.cookies.set |
| req.cookies | this.cookies.get |
| req.body | this.request.body |


* require('../lib/httpRequest.js') 改为 require('../lib/httpRequest.v2.js');

* http.get 的回调调用改为 yield 调用，并赋值为body

  如 var data = yield http.get.call(this, 'http://xxx/xxx'), data = data.body;
