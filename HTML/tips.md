## ios&android弹数字键盘
input(type="number" name='hello' pattern="[0-9]*")

## 获取cookie
var wechat = (wechat = (' ' + document.cookie).match(/[; ]wechat=([^;]*)/)) && wechat[1];

## 设置cookie(设置50分钟超时)
document.cookie = 'key=value; domain=.abc.com; path=/; expires=' + (new Date(Date.now() + 60 * 1000 * 50)).toUTCString();

## 删除cookie
document.cookie = 'key=; domain=.abc.com; path=/; expires=' + (new Date(0)).toUTCString();

## 获取url路径中的值
location.pathname.match(/\/path\/([\/]*)$/)[1]

## 获取url参数中的值
location.search.match(/key=([^&=]*)/)[1]
