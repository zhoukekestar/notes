---
layout: post
title:  "Proxy List"
date:   2017-05-31
categories: proxy
tags: [javascript, proxy, network]
---

## Check Proxies' Availability.
@see [how-can-i-use-an-http-proxy-with-node-js-http-client](https://stackoverflow.com/questions/3862813/how-can-i-use-an-http-proxy-with-node-js-http-client)
```js
const request = require('request');

let proxies = '180.122.157.224:22059,182.42.45.235:808,60.205.95.162:808,115.215.70.27:808,171.104.133.87:9999';
proxies = proxies.split(',');
proxies = proxies.map(p => {
  const t = p.split(':');
  return {
    host: t[0],
    port: t[1],
  };
});

const send = (proxy) => {
  return new Promise((resolve, reject) => {
    const t = Date.now();
    request({
      url: 'https://pv.sohu.com/cityjson',
      proxy: `http://${proxy.host}:${proxy.port}`,
      encoding: 'utf8',
      timeout: 5000
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        if (response.body.indexOf(proxy.host) !== -1) {
          console.log(`${proxy.host}:${proxy.port} works.`);
        }
        resolve({
          proxy,
          time: Date.now() - t,
          body: response.body
        });
      } else {
        reject(error || new Error(response.statusCode));
      }
    });

    setTimeout(function () {
      reject(new Error('Timeout'));
    }, 10000);
  }).catch((e) => {
  });
};


Promise.all(proxies.map(p => send(p))).then(r => {
  r = r.filter(t => t);
  r.sort((a1, a2) => a1.time > a2.time);
  console.log(r);
  console.log('Available Proxies: ' + r.map(t => `${t.proxy.host}:${t.proxy.port}`));
})
/*
182.42.45.235:808 works.
60.205.95.162:808 works.
115.215.70.27:808 works.
[ { proxy: { host: '182.42.45.235', port: '808' },
    time: 724,
    body: 'var returnCitySN = {"cip": "182.42.45.235", "cid": "370000", "cname": ""};' },
  { proxy: { host: '60.205.95.162', port: '808' },
    time: 4537,
    body: 'var returnCitySN = {"cip": "60.205.95.162", "cid": "530000", "cname": ""};' },
  { proxy: { host: '115.215.70.27', port: '808' },
    time: 8092,
    body: 'var returnCitySN = {"cip": "115.215.70.27", "cid": "330200", "cname": ""};' },
  { proxy: { host: '171.104.133.87', port: '9999' },
    time: 9579,
    body: 'var returnCitySN = {"cip": "171.38.15.178", "cid": "450900", "cname": ""};' } ]
Available Proxies: 182.42.45.235:808,60.205.95.162:808,115.215.70.27:808,171.104.133.87:9999
 */
```

## [free-proxy-list.net](https://free-proxy-list.net/)

```js
Array.from(document.querySelectorAll('#proxylisttable tbody tr'))
  .map(t => `${t.children[0].innerHTML}:${t.children[1].innerHTML}`)
  .join(',')
```

## [www.xicidaili.com](http://www.xicidaili.com/nt)

```js
Array.from(document.querySelectorAll('#ip_list tbody tr'))
  .filter(t => /\d/.test(t.children[1].innerHTML))
  .map(t => `${t.children[1].innerHTML}:${t.children[2].innerHTML}`)
  .join(',')
```


## [www.us-proxy.org](https://www.us-proxy.org/)

```js
Array.from(document.querySelectorAll('#proxylisttable tbody tr'))
  .map(t => `${t.children[0].innerHTML}:${t.children[1].innerHTML}`)
  .join(',');
```
