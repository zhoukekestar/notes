---
layout: post
title:  "Web Security in Github"
date:   2017-07-14
tags: [security]
commentIssueId: 33
---

Web Security in Github
* Content-Security-Policy
* Public-Key-Pins
* Strict-Transport-Security
* X-Headers

## Content-Security-Policy
Github CSP（做了显示优化处理，以分号换行）
```
Content-Security-Policy:
  default-src 'none';
  base-uri 'self';
  block-all-mixed-content;
  child-src render.githubusercontent.com;
  connect-src 'self' uploads.github.com status.github.com collector.githubapp.com api.github.com www.google-analytics.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com wss://live.github.com;
  font-src assets-cdn.github.com;
  form-action 'self' github.com gist.github.com;
  frame-ancestors 'none';
  img-src 'self' data: assets-cdn.github.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com *.githubusercontent.com;
  media-src 'none';
  script-src assets-cdn.github.com;
  style-src 'unsafe-inline' assets-cdn.github.com
```

* `default-src 'none'` 表示默认设置为空，相当于没有限制。[default-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/default-src): 默认的资源配置方案。
* `base-uri 'self'`: 限制了`base`元素只能是当前站点。
* `block-all-mixed-content`: 如果当前页面使用了`HTTPS`，则限制了页面所有`HTTP`请求。比如，没有设置该属性，`HTTPS`页面默认是能够加载`HTTP`的图片资源的，当设置该属性，则无法加载`HTTP`图片。
* `child-src`: 已被弃用。
* `connect-src`: 限制了页面连接的接口。这些接口限制包括：
  * `a`标签的`ping`属性
  * `Fetch`
  * `XMLHttpRequest`
  * `WebSocket`
  * [`EventSource`](https://developer.mozilla.org/en-US/docs/Web/API/EventSource): 接收服务器事件，通过HTTP连接，在不需要断开的情况，接收类型为`text/event-stream`的消息。
* `form-action`: 指定了`form`表单提交的时候，能够提交到得资源路径。
* `frame-ancestors 'none'`: 指定当前页面无法被任何页面嵌套，嵌套的方式包括：`frame`, `iframe`, `object`, `embed`, `applet`等。和之前的`X-Frame-Options` 头的作用是类似的。
* `font-src`, `img-src`, `media-src`, `script-src`, `style-src` 分别是字体，图片，媒体（包括`audio` 和 `video` 标签），脚本，样式的资源加载策略。

#### < srouce >
* `self`: 当前页面
* `nonce`: 指定资源编号
* `sha256`, `sha384`, `sha512`: 指定资源内容的`sha`值
* `<host-source>`: 指定资源路径，如：
  * `http://*.example.com`
  * `mail.example.com:443`
  * `https://store.example.com`

* `<scheme-source>`: 指定资源的`schema`, 如：
  * `data`
  * `mediastream`
  * `blob`
  * `filesystem`
* `unsafe-inline`: 表示允许内联资源
* `unsafe-eval`: 表示允许使用`eval`, 对脚本而言

关于`nonce`, `sha256`的[在线 Demo](https://zhoukekestar.github.io/drafts/Simple-CSP/demo.html)。注意，`Demo` 中的样例不是最佳实践，需要注意的是:
* `Demo` 中，设置`CSP`使用`meta`标签的，而不是`HTTP Header`，实际使用中，会更倾向使用 `HTTP Header`
* [nonce](https://developers.google.com/web/fundamentals/security/csp/#if_you_absolutely_must_use_it) 需要在每次请求设置不同的值，以免`nonce`值被猜测到。


## Public-Key-Pins
Github Example:

```
Public-Key-Pins:
max-age=5184000;
pin-sha256="WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18=";
pin-sha256="RRM1dGqnDFsCJXBTHky16vi1obOlCgFFn/yOhI/y+ho=";
pin-sha256="k2v657xBsOVe1PQRwOsHsw3bsGT2VzIqz5K+59sNQws=";
pin-sha256="K87oWBWM9UZfyddvDfoxL+8lpNyoUB2ptGtn0fv6G2Q=";
pin-sha256="IQBnNBEiFuhj+8x6X8XLgh01V9Ic5/V3IRQLNFFc7v4=";
pin-sha256="iie1VXtL7HzAMF+/PVPR9xzT80kQxdZeJ+zduCB3uj0=";
pin-sha256="LvRiGEjRqfzurezaWuj8Wie2gyHMrW5Q06LspMnox7A=";
includeSubDomains
```

> HTTP Public Key Pinning（HPKP）是为了防止其他可信CA未经你的授权（也许是因为身份审核疏忽）为你的网站颁发证书，并用于中间人攻击（数据截获分析） 。对于浏览器来说，只要是一家已预埋根证书的可信CA颁发的证书，信任状态都是一样的，用户一般也很难识别出来是否存在伪造。

## Strict-Transport-Security
`Strict-Transport-Security:max-age=31536000; includeSubdomains; preload` 旨在告诉客户端与网站的通讯只能使用 `HTTPS` 而不是 `HTTP`。


## X-headers
* `X-Content-Type-Options:nosniff`
* `X-Frame-Options:deny`
* `X-GitHub-Request-Id:C158:E974:FFA0:187AE:5968CEDB`
* `X-Request-Id:f27c3ac3830fd696dc75221b3f4ab330`
* `X-Runtime:1.121467`
* `X-Runtime-rack:1.126547`
* `X-UA-Compatible:IE=Edge,chrome=1`
* `X-XSS-Protection:1; mode=block`

## References
* [Node interview of ElemeFE](https://github.com/ElemeFE/node-interview/blob/master/sections/zh-cn/security.md#crypto)
* [使用HPKP防止中间人攻击](https://www.yryz.net/post/http-public-key-pins.html)
