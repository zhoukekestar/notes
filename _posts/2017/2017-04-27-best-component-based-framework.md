---
layout: post
title:  "Best component-based framework"
date:   2017-04-27
tags: [component, webcomponents, framework]
commentIssueId: 11
---

# Best component based framework
What we can choose ?
* webcomponents.js [![GitHub stars](https://img.shields.io/github/stars/webcomponents/webcomponentsjs.svg?label=Star&style=plastic)](https://github.com/webcomponents/webcomponentsjs)
* Polymer [![GitHub stars](https://img.shields.io/github/stars/Polymer/polymer.svg?label=Star&style=plastic)](https://github.com/Polymer/polymer)
* sketejs [![GitHub stars](https://img.shields.io/github/stars/skatejs/skatejs.svg?label=Star&style=plastic)](https://github.com/skatejs/skatejs)

* Riot.js [![GitHub stars](https://img.shields.io/github/stars/riot/riot.svg?label=Star&style=plastic)](https://github.com/riot/riot)
* mithril.js [![GitHub stars](https://img.shields.io/github/stars/lhorie/mithril.js.svg?label=Star&style=plastic)](https://github.com/lhorie/mithril.js)
* Vue [![GitHub stars](https://img.shields.io/github/stars/vuejs/vue.svg?label=Star&style=plastic)](https://github.com/vuejs/vue)

* React [![GitHub stars](https://img.shields.io/github/stars/facebook/react.svg?label=Star&style=plastic)](https://github.com/facebook/react)
* inferno [![GitHub stars](https://img.shields.io/github/stars/infernojs/inferno.svg?label=Star&style=plastic)](https://github.com/infernojs/inferno)
* Preact [![GitHub stars](https://img.shields.io/github/stars/developit/preact.svg?label=Star&style=plastic)](https://github.com/developit/preact)

# webcomponents.js
* `+1`, Close to standards.
* `+1`, Good for future.
* `-1`, Complex polyfill (css, shadow dom, custom element).
* `-1`, Mess code style (compiled to es5 for lower browser & need es5-loader for modern browser).
* `-1`, Bad browser compatibility, IE 10+, Android 4.4+.

```html
// in component
var currnetScript = document.currentScript || document._currentScript

// Listen to WebComponentReady to start your bussiness.
```

# Polymer
* `-1`, We should use bower to install dependencies.
* `-1`, Too bundle with `polymer build --bundle` or too separate with `polymer build --js-compile` which should depends on `HTTP/2`.
* `-1`, Not so easy to start, not so easy to build with other framework.
* `-1`, Bad browser compatibility. Android 4.4+, IE 10+.
* `+1`, Close to standards.

# riot
Simple and elegant component-based UI library

* `-1`, Not standard.
* `+1`, Easy to use.
* `+1`, Wild browser supported, IE 9+.

How to use it ?

```html
// online demo: http://riotjs.com/examples/plunker/?app=timer
// Component
<timer>
  <p>Seconds Elapsed: { time }</p>
  <script>
    this.time = opts.start || 0
    tick() {
      this.update({ time: ++this.time })
    }
    var timer = setInterval(this.tick, 1000)
    this.on('unmount', function() {
      clearInterval(timer)
    })
  </script>
</timer>

// Use it
<timer></timer>
<script src="timer.tag" type="riot/tag"></script>
<script src="https://rawgit.com/riot/riot/master/riot%2Bcompiler.min.js"></script>
<script> riot.mount('timer', { start: 0 }) </script>
```

# Vue
* `+1`, Browser support, IE 9+.

# React
* `+1`, Stable.
* `+1`, Popular.
* `-1`, Need compiler like webpack.
* `-1`, Not html-based but JSX.

# React-like: inferno, Preact
## Preact
Fast 3kb React alternative with the same ES6 API. Components & Virtual DOM.

## inferno
An extremely fast, React-like JavaScript library for building modern user interfaces

# mithril
A Javascript Framework for Building Brilliant Applications (development repo).

* `+1`, Browser support, IE 9+.

# Benchmark
* [riot.js](https://rawgit.com/krausest/js-framework-benchmark/4f3cbb352c84c31d1d10ecd43f893cf753ae4f12/webdriver-java/table.html)
* [framework-comparison by mithril](https://mithril.js.org/framework-comparison.html)
