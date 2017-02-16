---
layout: post
title:  "service worker for cache (PWA, HTTP2.0)"
date:   2017-01-10 14:45:00 +0800
categories: service worker cache pwa
tags: [javascript, cache]
---

# cache
* [https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage)
* [https://developer.mozilla.org/en-US/docs/Web/API/Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache)

# service worker
* [https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

# http2.0


# PWA
* [PWA offline](https://www.zhihu.com/question/46690207/answer/104851767)

> Offline （离线能力）
离线和弱网环境也能秒开的能力，但是这个就牛逼了。Hybrid 架构搞了那么久，不就为的这个吗？之前有个东西叫 Application Cache，但是那货就是个 shit。
>
所以这次 Chrome 搞了个 Service Worker 出来，给了 Web 一个可以跑在后台的线程，它可以搭配非常靠谱的 CacheStorage API 做缓存、可以拦截所有 HTTP 请求并使用 Fetch API 进行 response，一个非常完备的 Proxy 就这么诞生了。
>
作者：黄玄
链接：https://www.zhihu.com/question/46690207/answer/104851767
来源：知乎
著作权归作者所有，转载请联系作者获得授权。
