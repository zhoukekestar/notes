---
layout: post
title:  "Hello to puppeteer"
date:   2017-08-17
tags: [chrome]
commentIssueId: 48
---

Headless Chrome Node API
* Hello world
* A Baidu Demo

## Hello World

index.js
```js
// index.js
const puppeteer = require('puppeteer');

(async() => {

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
await page.screenshot({path: 'example.png'});

browser.close();
})();
```

Bash history

```bash
C:\Users\Administrator\Desktop
λ npm install puppeteer

> puppeteer@0.9.0 install C:\Users\Administrator\Desktop\node_modules\puppeteer
> node install.js

Downloading Chromium r494755 - 113.3 Mb [====================] 100% 0.0s
npm WARN saveError ENOENT: no such file or directory, open 'C:\Users\Administrator\Desktop\package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open 'C:\Users\Administrator\Desktop\package.json'
npm WARN Desktop No description
npm WARN Desktop No repository field.
npm WARN Desktop No README data
npm WARN Desktop No license field.

+ puppeteer@0.9.0
added 36 packages in 94.563s

C:\Users\Administrator\Desktop
λ vi index.js

C:\Users\Administrator\Desktop
λ vi index.js

C:\Users\Administrator\Desktop
λ node index.js

C:\Users\Administrator\Desktop
λ

```

Screenshot

![tim 20170817093040](https://user-images.githubusercontent.com/7157346/29393277-652a531c-8335-11e7-9807-4d3bc1a46dee.png)

## Baidu Demo

```js
const puppeteer = require('puppeteer');

const sleep = t => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t)
  })
};

(async() => {

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  page.setViewport({
    height: 800,
    width: 1000,
  });

  await sleep(3000);
  await page.goto('https://www.baidu.com');

  await page.type ('hello world', {
    delay: 300,
  });

  let n = 100;
  while(n--) {
    if (n < 90) {
      await page.mouse.click(100, 100);
    }
    await page.press('ArrowDown');
    await sleep(100);
  }

  await sleep(6000);

  browser.close();
})();

```

![abc](https://user-images.githubusercontent.com/7157346/29393276-64fbbe1c-8335-11e7-888a-e455eeef60cc.gif)
