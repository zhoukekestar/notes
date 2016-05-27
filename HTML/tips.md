## ios&android弹数字键盘
···html
<input type="number" name='hello' pattern="[0-9]*">
```

## 获取cookie
```js
var wechat = (wechat = (' ' + document.cookie).match(/[; ]wechat=([^;]*)/)) && wechat[1];
```

## 设置cookie(设置50分钟超时)
```js
document.cookie = 'key=value; domain=.abc.com; path=/; expires=' + (new Date(Date.now() + 60 * 1000 * 50)).toUTCString();
```

## 删除cookie
```js
document.cookie = 'key=; domain=.abc.com; path=/; expires=' + (new Date(0)).toUTCString();
```

## 获取url路径中的值
```js
location.pathname.match(/\/path\/([\/]*)$/)[1]
```

## 获取url参数中的值
```js
location.search.match(/key=([^&=]*)/)[1]
```

## 调试动态js
```js
//@ sourceURL=dynamicScript.js
```
