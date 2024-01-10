---
layout: post
title:  "lit SSR"
date:  2023-12-27
tags: [note]
---

  简单记录 Ember Glimmer 的 DOM 更新逻辑。

# 组件编写

  参考 [Component State and Actions](https://guides.emberjs.com/release/components/component-state-and-actions/)

  使用 Handlebars 模板编写:

```hbs
<div>
  <p>{{this.count}}</p>
  <button type="button" {{on "click" this.increment}}>+1</button>
  <button type="button" {{on "click" this.decrement}}>-1</button>
</div>
```

  并用 glimmer 组件进行 client 渲染和处理

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CounterComponent extends Component {
  @tracked count = 0;

  @action
  increment() {
    debugger;
    this.count = this.count + 1;
  }

  @action
  decrement() {
    this.count = this.count - 1;
  }
}
```

# 组件编译

  上述组件编译后的代码为：

```js
const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div>
    <p>{{this.count}}</p>
    <button type="button" {{on "click" this.increment}}>+1</button>
    <button type="button" {{on "click" this.decrement}}>-1</button>
  </div>
  */
  {
    id: 'wGHOXBQC',
    block:
      '[[[10,0],[12],[1,"\\n  "],[10,2],[12],[1,[30,0,["count"]]],[13],[1,"\\n  "],[11,"button"],[24,4,"button"],[4,[38,0],["click",[30,0,["increment"]]],null],[12],[1,"+1"],[13],[1,"\\n  "],[11,"button"],[24,4,"button"],[4,[38,0],["click",[30,0,["decrement"]]],null],[12],[1,"-1"],[13],[1,"\\n"],[13]],[],false,["on"]]',
    moduleName: 'ember-quickstart/components/counter.hbs',
    isStrictMode: false
  }
)
let CounterComponent = (_exports.default =
  ((_class = class CounterComponent extends _component2.default {
    constructor (...args) {
      super(...args)
      _initializerDefineProperty(this, 'count', _descriptor, this)
    }
    increment () {
      debugger
      this.count = this.count + 1
    }
    decrement () {
      this.count = this.count - 1
    }
  }),
  ((_descriptor = _applyDecoratedDescriptor(
    _class.prototype,
    'count',
    [_tracking.tracked],
    {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return 0
      }
    }
  )),
  _applyDecoratedDescriptor(
    _class.prototype,
    'increment',
    [_object.action],
    Object.getOwnPropertyDescriptor(_class.prototype, 'increment'),
    _class.prototype
  ),
  _applyDecoratedDescriptor(
    _class.prototype,
    'decrement',
    [_object.action],
    Object.getOwnPropertyDescriptor(_class.prototype, 'decrement'),
    _class.prototype
  )),
  _class))
;(0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, CounterComponent)

```

# 模板含义

  参考 [@glimmer/compiler](https://github.com/glimmerjs/glimmer-vm/blob/2ddbbc4a9b97db4f326c4d92021f089c464ab093/packages/%40glimmer/compiler/test/compiler-test.ts)

```js
import { precompile, WireFormatDebugger } from '@glimmer/compiler';

function compile(content) {
  let parsed = JSON.parse(precompile(content, {}));
  let block = JSON.parse(parsed.block);

  return Object.assign({}, parsed, { block });
}

const actual =compile(`
<div>
  <p>{{this.count}}</p>
  <button type="button" {{on "click" this.increment}}>+1</button>
  <button type="button" {{on "click" this.decrement}}>-1</button>
</div>`)

let debugActual = new WireFormatDebugger(actual.block).format(actual.block)
console.log(JSON.stringify(debugActual, null, 2));

// let symbols = new ProgramSymbols();
// const statements = buildStatements(JSON.parse(res.block), symbols)
// console.log(JSON.stringify(res, null, 2), statements);

```

  模板编译后，背后的本质代码：

```json
[
  [
    "append",
    "\n"
  ],
  [
    "open-element",
    "div"
  ],
  [
    "flush-element"
  ],
  [
    "append",
    "\n  "
  ],
  [
    "open-element",
    "p"
  ],
  [
    "flush-element"
  ],
  [
    "append",
    [
      "get-symbol",
      "this",
      [
        "count"
      ]
    ]
  ],
  [
    "close-element"
  ],
  [
    "append",
    "\n  "
  ],
  [
    "open-element-with-splat",
    "button"
  ],
  [
    "static-component-attr",
    "type",
    "button",
    null
  ],
  [
    "modifier",
    [
      "GetFreeAsModifierHead",
      "on",
      null
    ],
    [
      "click",
      [
        "get-symbol",
        "this",
        [
          "increment"
        ]
      ]
    ],
    null
  ],
  [
    "flush-element"
  ],
  [
    "append",
    "+1"
  ],
  [
    "close-element"
  ],
  [
    "append",
    "\n  "
  ],
  [
    "open-element-with-splat",
    "button"
  ],
  [
    "static-component-attr",
    "type",
    "button",
    null
  ],
  [
    "modifier",
    [
      "GetFreeAsModifierHead",
      "on",
      null
    ],
    [
      "click",
      [
        "get-symbol",
        "this",
        [
          "decrement"
        ]
      ]
    ],
    null
  ],
  [
    "flush-element"
  ],
  [
    "append",
    "-1"
  ],
  [
    "close-element"
  ],
  [
    "append",
    "\n"
  ],
  [
    "close-element"
  ]
]
```

# 运行时

  ![image](https://github.com/zhoukekestar/notes/assets/7157346/e6250507-f0fc-4e21-a7f7-4557a37486bd)

  [@glimmer/compiler](https://github.com/glimmerjs/glimmer-vm/blob/2ddbbc4a9b97db4f326c4d92021f089c464ab093/packages/%40glimmer/compiler/test/compiler-test.ts)

  [validator](https://github.com/glimmerjs/glimmer-vm/blob/2ddbbc4a9b97db4f326c4d92021f089c464ab093/packages/%40glimmer/validator/lib/meta.ts#L19)

# 参考

* https://github.com/handlebars-lang/handlebars.js
* https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/
* https://engineering.linkedin.com/blog/2017/06/glimmer--blazing-fast-rendering-for-ember-js--part-2
* https://blog.emberjs.com/glimmer-progress-report/
