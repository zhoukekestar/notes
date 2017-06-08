---
layout: post
title:  "Nodejs Debug"
date:   2016-07-07 13:07:00 +0800
categories: node debug
tags: [nodejs, javascript]
---

## DEBUG
* [nodejs v6.x](https://github.com/nodejs/node/pull/6792)

```bash
$ ./node --inspect benchmark/http_simple.js
Debugger listening on port 5858. To start debugging, open following URL in Chrome:

chrome-devtools://devtools/remote/serve_file/@4604d24a75168768584760ba56d175507941852f/inspector.html?experiments=true&v8only=true&ws=localhost:5858/node
```
