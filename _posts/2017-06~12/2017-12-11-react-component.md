---
layout: post
title:  "React 组件最佳实践 - 笔记"
date:   2017-12-11
tags: [js, react]
commentIssueId: 65
---

参考 [写 React 组件的最佳实践](https://segmentfault.com/a/1190000010835260), 总结一下组件最佳实践：
* 文件引用
* 类属性
* 类方法
* setState 方法
* jsx 闭包
* jsx 判断

## 文件引用

首先引用库文件，其次引用本地文件，并用空行分割

```js
import React, { Component } from 'react'
import { observer } from 'mobx-react'

import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'
```

## 类属性

export 默认组件，并设置 state，defaultProps，propTypes 等

```js
export default class ProfileContainer extends Component {
  state = { expanded: false }

  static propTypes = { // 目前已不建议这么使用，建议使用 ts
    model: object.isRequired,
    title: string
  }

  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }
}
```

## 类方法

不建议在 constructor 中进行绑定，而是通过赋值进行上下文绑定

```js
exprot default class ABC extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.model.save()
  }

  handleNameChange = (e) => {
    this.props.model.changeName(e.target.value)
  }
}
```

## setState 方法

因为 setState 是异步的，所以，需要原有 state 并进行修改的，最佳方案是基于 preState 做一些改动

```js
this.setState({ expanded: !this.state.expanded })
// 传函数
this.setState(prevState => ({ expanded: !prevState.expanded }))
```


## jsx 中闭包

因为在 jsx 中写 闭包，会导致每次 render 都会创建新函数，所以，会产生不必要的二次渲染。

```js
return (
    <ExpandableForm
      onSubmit={this.handleSubmit}
      expanded={this.state.expanded}
      onExpand={this.handleExpand}>
      // Newline props if there are more than two
      <div>
        <h1>{title}</h1>
        <input
          type="text"
          value={model.name}
          // onChange={(e) => { model.name = e.target.value }}
          // Avoid creating new closures in the render method- use methods like below
          onChange={this.handleNameChange}
          placeholder="Your Name"/>
      </div>
    </ExpandableForm>
  )
```

## jsx 条件表达式

```jsx
// 如果只是 if 判断
{ true && <p></p>}

// 多个 case, 虽然有性能上的问题，但可读性更强
{
  (() => {
    if (a) {
      return <p></p>
    } else {
      return <a></a>
    }
  })()
}

// 或者，最好的写个 函数 或 子组件代替
```
