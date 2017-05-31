---
layout: post
title:  "Proxy List"
date:   2017-05-31
categories: proxy
tags: [javascript, proxy, network]
---
## demo
@see [https://stackoverflow.com/questions/3862813/how-can-i-use-an-http-proxy-with-node-js-http-client](https://stackoverflow.com/questions/3862813/how-can-i-use-an-http-proxy-with-node-js-http-client)
```js
const http = require('http');
let proxies = '70.35.197.74:80,52.14.161.178:3128,52.42.43.181:80,35.161.2.200:80,104.254.244.148:8888,13.88.183.184:3128,170.55.15.175:3128,104.237.227.202:80,52.40.92.38:80,52.43.253.235:80,52.52.214.182:8080,96.126.113.158:3128,73.193.193.119:21320,54.174.128.8:10200,45.55.202.39:80,24.52.60.234:8080,97.77.215.225:8181';

proxies = proxies.split(',');
proxies = proxies.map(p => {
  const t = p.split(':');
  return {
    host: t[0],
    port: t[1],
  };
});

const request = function (path, host, port) {
  return new Promise((resolve, reject) => {
    http.get({
      host,
      port,
      path,
      headers: {
        Host: "pv.sohu.com"
      }
    }, (res) => {
      const { statusCode } = res;
      let rawData = '';

      if (statusCode !== 200) {
        return reject(new Error(`Request Failed.\nStatus Code: ${statusCode}`));
      }

      res.setEncoding('utf8');
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        resolve(rawData)
      });
    }).on('error', (e) => {
      reject(e);
    })
  });
}

;(async function () {

  for (var i = 0; i < proxies.length; i++) {
    console.log(proxies[i])
    try {
      let r = await request('https://pv.sohu.com/cityjson', proxies[i].host, proxies[i].port);
      console.log(r);
    } catch (e) {
      console.log(e.message)
    }
  }

})();
```


## http://www.xicidaili.com/nt

```js
var result = [];
var eles = document.querySelectorAll('#ip_list tr + tr')
for (var i = 0; i < eles.length; i++) {
  result.push(eles[i].children[2].innerHTML + ':' + eles[i].children[3].innerHTML);
}
result.join(',')
```


## http://www.haodailiip.com/guonei

```js
var result = [];
var eles = document.querySelectorAll('.proxy_table tr + tr')
for (var i = 0; i < eles.length; i++) {
  result.push((eles[i].children[0].innerHTML + ':' + eles[i].children[1].innerHTML).replace(/[\r\n\s]*/g, ''));
}
result.join(',')
```

## https://www.us-proxy.org/

```js
var result = [];
var eles = document.querySelectorAll('#proxylisttable tbody tr')
for (var i = 0; i < eles.length; i++) {
  result.push((eles[i].children[0].innerHTML + ':' + eles[i].children[1].innerHTML).replace(/[\r\n\s]*/g, ''));
}
result.join(',')
```


## http://proxylist.hidemyass.com/

```js
var result = [];
var eles = document.querySelectorAll('#listable tbody tr')
i = 0;
for (var i = 0; i < eles.length; i++) {
  var ip = '';

  var ele = eles[i].children[1].children[0];
  for (var j = 0; j < ele.childNodes.length; j++) {

    var node = ele.childNodes[j];
    var style = {};
    try {
      style = getComputedStyle(node);
    } catch (e) {}

    if (node.nodeName === '#text') {
      ip += node.textContent;
    } else if (node.nodeName !== 'STYLE' && style.display !== 'none') {
      ip += node.innerHTML;
    } else {
      console.log(style.display);
    }
  }

  result.push((ip + ':' + eles[i].children[2].innerHTML).replace(/\s/g, ''));
}
result.join(',')
```
