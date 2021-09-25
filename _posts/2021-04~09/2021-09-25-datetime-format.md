
---
layout: post
title:  "你可能不需要 moment 之实战篇"
date:  2021-09-25
tags: [js]
---


## Intl.Locale

参考 [Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/Locale)

### 语言

使用不同语言格式化一个日期，由于全球通用阿拉伯数字，所以，只有年份前后的差异：

```js

new Intl.DateTimeFormat(new Intl.Locale('zh'))
  .format(new Date());
// 2021/9/25，中文习惯

new Intl.DateTimeFormat(new Intl.Locale('en'))
  .format(new Date());
// 9/25/2021，英文习惯
```

为了更明显地区分，我们将日期信息更可能多的打印出来，如下：

```js
new Intl.DateTimeFormat(new Intl.Locale('zh'), {
  dateStyle: 'full',
  timeStyle: 'long',
}).format(new Date());
// 2021年9月25日星期六 GMT+8 下午12:25:07

new Intl.DateTimeFormat(new Intl.Locale('en'), {
  dateStyle: 'full',
  timeStyle: 'long',
}).format(new Date());
// Saturday, September 25, 2021 at 12:25:02 PM GMT+8
```

### 历法

使用 calendar 来指定不同历法，比如的中国农历、日本新年号，完整的历法参考 [此链接](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar)

```js
new Intl.DateTimeFormat(new Intl.Locale('zh', {
  calendar: 'chinese'
})).format(new Date());
// 2021年八月19

new Intl.DateTimeFormat(new Intl.Locale('zh', {
  calendar: 'japanese'
})).format(new Date());
// 令和3-09-25
```

## 数字体系

![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Numeral_Systems_of_the_World.svg/528px-Numeral_Systems_of_the_World.svg.png)

使用不同的数字体系来显示，比如：中文数字，但目前很多不使用的数字系统是不支持的，比如：玛雅、罗马。

```js
new Intl.DateTimeFormat(new Intl.Locale('zh', {
  numberingSystem:'hans',
})).format(new Date());
// 二千零二十一/九/二十五

new Intl.DateTimeFormat(new Intl.Locale('zh', {
  numberingSystem:'hansfin',
})).format(new Date());
// 贰仟零贰拾壹/玖/贰拾伍

```

## 小时制

12 小时、24 小时、23 小时制

```js
new Intl.DateTimeFormat(new Intl.Locale('zh', {
  hourCycle: 'h12'
}), {
  dateStyle: 'full',
  timeStyle: 'full'
}).format(new Date());
// 2021年9月25日星期六 中国标准时间 下午5:10:33


new Intl.DateTimeFormat(new Intl.Locale('zh', {
  hourCycle: 'h24'
}), {
  dateStyle: 'full',
  timeStyle: 'full'
}).format(new Date());
// 2021年9月25日星期六 中国标准时间 17:11:19
```

## 语言书写

简体书写和繁体书写，具体的可以在 [iana](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) 上查到。

```js
new Intl.DateTimeFormat(new Intl.Locale('zh', {
  script:'Hans', // Han 表示汉字，s 表示简写
}), {
  dateStyle: 'full',
  timeStyle: 'full'
}).format(new Date());
// 2021年9月25日星期六 中国标准时间 下午5:14:30

new Intl.DateTimeFormat(new Intl.Locale('zh', {
  script:'Hant', // Han 表示汉字，t 表示传统
}), {
  dateStyle: 'full',
  timeStyle: 'full'
}).format(new Date());
// 2021年9月25日 星期六 下午5:14:40 [中國標準時間]
```

## Intl.DateTimeFormat

### 日期和时间样式

* full 所有信息
* long 带时区
* medium 精确到秒
* short 仅到分

```js
new Intl.DateTimeFormat(new Intl.Locale('zh'), {
  dateStyle: 'full',
  timeStyle: 'full'
}).format(new Date());
// '2021年9月25日星期六 中国标准时间 下午5:20:26'

new Intl.DateTimeFormat(new Intl.Locale('zh'), {
  dateStyle: 'long',
  timeStyle: 'long'
}).format(new Date());
// '2021年9月25日 GMT+8 下午5:20:34'

new Intl.DateTimeFormat(new Intl.Locale('zh'), {
  dateStyle: 'medium',
  timeStyle: 'medium'
}).format(new Date());
// '2021年9月25日 下午5:20:52'

new Intl.DateTimeFormat(new Intl.Locale('zh'), {
  dateStyle: 'short',
  timeStyle: 'short'
}).format(new Date());
// '2021/9/25 下午5:21'

// -------------- 英文格式
new Intl.DateTimeFormat(new Intl.Locale('en'), {
  dateStyle: 'full',
  timeStyle: 'full'
}).format(new Date());
// 'Saturday, September 25, 2021 at 5:24:18 PM China Standard Time'

new Intl.DateTimeFormat(new Intl.Locale('en'), {
  dateStyle: 'long',
  timeStyle: 'long'
}).format(new Date());
// 'September 25, 2021 at 5:24:25 PM GMT+8'

new Intl.DateTimeFormat(new Intl.Locale('en'), {
  dateStyle: 'medium',
  timeStyle: 'medium'
}).format(new Date());
// 'Sep 25, 2021, 5:24:34 PM'

new Intl.DateTimeFormat(new Intl.Locale('en'), {
  dateStyle: 'short',
  timeStyle: 'short'
}).format(new Date());
// '9/25/21, 5:24 PM'
```


## toLocaleString

根据如上的介绍，将上述参数按照 [指定的字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) 格式拼接， 我们可以得出以下几种常用的 Case

```js
new Date().toLocaleString('zh-u-hc-h24')
// '2021/9/25 17:28:30'

new Date().toLocaleString('en-CA-u-hc-h24')
// '2021-09-25, 17:27:05'
```


## References
1. Intl.DateTimeFormat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
2. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation
3. iana: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry