---
layout: post
title:  "templates"
date:   2017-04-19
tags: [template, note]
commentIssueId: 10
---

# Templates
Here is an image comes form [art-template](https://github.com/aui/art-template).

![templates](https://cloud.githubusercontent.com/assets/1791748/24965783/aa044388-1fd7-11e7-9d45-43b0e7ff5d86.png)

* [Mustache](https://github.com/janl/mustache.js)
* [Handlebars]()
* [doT](https://github.com/aui/art-template)
* [art-template](https://github.com/aui/art-template)
* [superviews.js](https://github.com/davidjamesstone/superviews.js)

# Mustache
Download it from [CDN](http://www.bootcdn.cn/mustache.js/).
[![GitHub stars](https://img.shields.io/github/stars/janl/mustache.js.svg?style=social&label=Star&style=plastic)](https://github.com/janl/mustache.js)

* +1, Tiny size (9.3KB, 3.5KB for gzip), you can use [micromustache](http://www.bootcdn.cn/micromustache/) for more tiny size.
* -1, Don't Support index in loop, you have to do [like this](http://stackoverflow.com/questions/5021495/in-mustache-how-to-get-the-index-of-the-current-section) to get index in an array.

# Handlebars
Download it from [CDN](http://www.bootcdn.cn/handlebars.js/).
[![GitHub stars](https://img.shields.io/github/stars/wycats/handlebars.js.svg?style=social&label=Star&style=plastic)](https://github.com/wycats/handlebars.js)

* +1, Extensibility
* +1, Flexible
* -1, Size with compiler is 73KB, 25KB for gzip size.
* -1, Runtime only size is 16.5KB, 6.1KB for gzip size.

# doT
Download it from [CDN](http://www.bootcdn.cn/dot/).
[![GitHub stars](https://img.shields.io/github/stars/olado/doT.svg?style=social&label=Star&style=plastic)](https://github.com/olado/doT)
* +1, Tiny size (3.3KB & 2.0KB for gzip size)

# hogan
Product by twitter, [hogan.js](https://github.com/twitter/hogan.js), 8.4KB, 4.2KB for gzip size.
[![GitHub stars](https://img.shields.io/github/stars/twitter/hogan.js.svg?style=social&label=Star&style=plastic)](https://github.com/twitter/hogan.js)

# Best Practices

One page include multiple templates, fetch templates and fetch page data should be processing together.
First view on page should be compiled & included by server.

One component should do as less as possible logical process with another component. Most important thing is that component's custom logic should be configured.

<link rel='import' href='https://zhoukekestar.github.io/webcomponents/components/code-mirror/index.html'>
<textarea is='code-mirror'>
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
      <script src='handlebars.js'></script>
    </head>
    <body>
      <form action="/data"></form>
      <div component='./first.html' server='true'></div>
      <div component='./second.html'></div>

      <script>
        form.load = function(data) {
          components.forEach(component => component.render(data))
        }
      </script>
    </body>
  </html>

  first.html
  <template>
    <h1>{{name}}</h1>
  </template>

  second.html
  <template>
    <h1>{{name}}</h1>
  </template>
</textarea>
