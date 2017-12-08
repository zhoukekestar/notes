---
layout: post
title:  "技术尝鲜 & Demo 实践"
date:   2017-12-08
tags: [js, demo]
commentIssueId: 65
---

本文以尝试**非生产化工具**，并进行 Demo 尝试：
* [prettier](https://github.com/prettier/prettier): 在 ESLint 进行代码 lint 的同时，使用 prettier 进行代码样式的优化。[查看线上 Demo](https://prettier.io/playground/#N4Igxg9gdgLgprEAuEAzArlMMCW0AEAEnADYkQDqEATiQCYAUwA5tXHLlM-gLz4A6IABalyggDT5W7eHV74A5IKq06ghZIDOOEghjzUAQxKa4k6AFkI6UwHkAbnGriAvgEp8wflG-58OVAYAQmkOHC43YDYYdGoofCh0MhcAbm9fPz8Aeiz8ABVbABFbJHxC6AV9Gzh8akMoOggAW394tganDN19RJa+C0MYIQA6VHIafAYBoeG6huaGDwAqfABGAFEAagB2N2GYCABlGGpw5kXZuAAHEkMwOAYs-n5h57pNrJxmSUFBN3T4rUOLF4gAeOg4ez4MC3TSaAByhiacB4CmIZEoNHoCnwuBguh4wAABgBNaz4QxsfD2HDaA7UBLoJoAIyc+AAJMBGS0XESXPhLNY7I5qITBdUHE4XAA+AGZfCgzQnaDMaVc0KcZjDTQkHD3Bj4AAMklW+D2BwAqlcrk4AMKGUyLfCbKRsMJcbW6-Wrc0QAAyEAA7naHQ8PC5QVkldQVbLAX4WG7NcMEHRNBQcEMGBI-vgAPwCECF-ClRVXer4JUATwJwGAkHI1FKSn40irChcMokhcjmnLUGl+BcGT8oLgTTj-Bg6qTcDkw58MEj47j8q5DG0ulg-3jmQLgleIBHmVKgiCggXx8jEPs0rSPigLhA4hAECuuGgmmQoCup1gGboIZkAADmNEAYEMZkAKApAACYX20LhdAARXQCB4GQIwTDMcC6h0M5bWaJpDGQEAoGgOBnxAZk6jAABrDhDnLMAzmQE50BwgArTQAA8ACFaIYmBDiROA-XCSikCw0wX3LahTGoUjmUgmtoCo0wmhwNjqA4l9qjySCvyk4wZJAcIFJgAAFOpmGIzCTJwtgAEd0BwNhrMMWySOM7DZJjUwKDqK5SN-OAFMcKjKRjQNLMpBAjJAQx7AgHA6CoxowHs3zEqVLLTOsGArnQGBYLyuBOyAA)
* 打包工具用 webpack ？不！用[parcel](https://github.com/parcel-bundler/parcel)

  > 听说 parcel 源码读起来更好，而且  0 配置，感觉不错的样子。想想 webpack 的配置，= =! 配了老半天，就不是让代码跑起来！而且，我就想用 webpack 的基本功能，不想那么高大上，咋就这么难！

* [preact](https://github.com/developit/preact)：源码少，简单，兼容 react，深入学习 react 绝佳库
* [unistore](https://github.com/developit/unistore), 替代 redux，源码少，深入学习系列之绝佳库

* [jsvu](https://github.com/GoogleChromeLabs/jsvu), 在多个 js 引擎上测试代码，新库
* [jest](http://facebook.github.io/jest/), 包括单测、snapshot 等等，用用看？
* [superstruct](https://github.com/ianstormtaylor/superstruct)： 规范数据输入

> 说了这么多，还不是因为之前没好好学习。。。Webpack 没了解透、用得不多，React 之前也没怎么用，Redux 也是，刚好出了个新的工具（parcel、unistore )，而且源码更简单，学习、深入起来也更简单。
