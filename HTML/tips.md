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


## 上下移动元素
```js
window.moveUp = function() {
  this.parentNode.insertBefore(this, this.previousElementSibling || this);
}
window.moveDown = function() {
  this.parentNode.insertBefore(this, this.nextElementSibling && this.nextElementSibling.nextElementSibling || null);
}
```

## 滚动条
```css

::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(188, 188, 188, 1);
}

```


## 多行文本超出省略
```css
p {
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4; // 文本显示行数
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
}
```

## 元素是否在当前可见范围
```js
  function elementInViewport(el) {
    var rect = el.getBoundingClientRect()

    // For invisible element.
    if (rect.top + rect.bottom + rect.left + rect.right + rect.height + rect.width === 0) {
      return false;
    }

    return (
       rect.top   >= 0
    // Pre load.
    && rect.top   <= ((window.innerHeight || document.documentElement.clientHeight) + 100)
    && rect.left  >= 0
    // Hide carousel except first image. Do not add equal sign.
    && rect.left  < (window.innerWidth || document.documentElement.clientWidth)
    )
  }
```
