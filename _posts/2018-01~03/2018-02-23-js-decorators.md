---
layout: post
title:  "@decorators"
date:   2018-02-23
tags: [js]
commentIssueId: 74
---

ECMAScript Decorator 初探, Object.defineProperty 描述符简析, core-decrators 简析.



## Object.defineProperty 

Object.defineProperty 中可设置以下`描述符`:

* `configurable` 默认为 false, 设置属性是否可以被删除, 是否可以修改除`value`, `writeable` 以外的描述符
* `enumerable` 默认为 false, 用于设置是否对 `for…in` 和 `Object.keys` 可见
* `value` 默认为 undefined, 属性值
* `writeable` 默认为 false, 不可写入, 属性只读. (只有在严格模式下, 赋值才会报错.)
* `get `  不能和 value 同时设置
* `set`



> 具体可参考: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
>
> 也可参考之前的: https://zhoukekestar.github.io/notes/object/defineproperty/2017/01/04/Object.defineProperty.html



## core-decorators

### @readonly

readonly.js

```js
//https://github.com/jayphelps/core-decorators/blob/5b754256a30c23a0aef846c1b45f261e0c7b21a2/src/readonly.js

import { decorate } from './private/utils';

function handleDescriptor(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

export default function readonly(...args) {
  return decorate(handleDescriptor, args);
}
```

utils.js

```js
// https://github.com/jayphelps/core-decorators/blob/5b754256a30c23a0aef846c1b45f261e0c7b21a2/src/private/utils.js

export function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  const keys = ['value', 'initializer', 'get', 'set'];

  for (let i = 0, l = keys.length; i < l; i++) {
    if (desc.hasOwnProperty(keys[i])) {
      return true;
    }
  }

  return false;
}

// 用于统一将注解参数放 descriptor 后面, 以数组形式传入
export function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor(...entryArgs, []);
  } else {
    return function () {
      return handleDescriptor(...Array.prototype.slice.call(arguments), entryArgs);
    };
  }
}
```



### @deprecate

```js
import { decorate, warn } from './private/utils';

const DEFAULT_MSG = 'This function will be removed in future versions.';

// 经过 decorate 处理, 参数统一放最后
// 即支持 @deprecate 和 @deprecate('message') 两种方式
function handleDescriptor(target, key, descriptor, [msg = DEFAULT_MSG, options = {}]) {
  if (typeof descriptor.value !== 'function') {
    throw new SyntaxError('Only functions can be marked as deprecated');
  }
  
  // 拼接消息内容
  const methodSignature = `${target.constructor.name}#${key}`;
  
  if (options.url) {
    msg += `\n\n    See ${options.url} for more details.\n\n`;
  }
      
  return {
    ...descriptor,
    value: function deprecationWrapper() {
      warn(`DEPRECATION ${methodSignature}: ${msg}`); // 显示警告
      return descriptor.value.apply(this, arguments); // 执行原有函数, 需保持上下文
    }
  };
}

export default function deprecate(...args) {
  return decorate(handleDescriptor, args);
}
```





## References

* [Exploring EcmaScript Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)
* [core-decorators](https://github.com/jayphelps/core-decorators)
* [proposal-decorators](https://tc39.github.io/proposal-decorators/)
* [lodash-decorators](https://github.com/steelsojka/lodash-decorators)