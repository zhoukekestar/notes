---
layout: post
title:  "Subset of Web Components"
date:   2016-12-26 11:51:00 +0800
categories: subset webcomponents polyfill
tags: [webcomponents, polyfill]
---

# WebComponents, our future!
WebComponents is great, but it's just too advanced so that we can't use it on all platform.

# webcomponentsjs
[Webcomponentsjs]() is also great, he did so much work on W3C's spec. But what we can see on it is bad compatibility on old mobile browser.

What should we do if we want to use webcomponents with good compatibility. Just remove the bad compatibility part of webcomponentsjs.

We just give up some feature (like: shadowdom or something is not able to polyfill) so we can use it on almost platform. That's subset of webcomponentsjs which is friendly for old mobile browser.

Yes, webcomponentsjs is a subset of W3C's webcomponents. And our webcomponents is a subset of webcomponentsjs.
