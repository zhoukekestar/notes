---
layout: post
title:  "再谈 Virtual DOM（三）"
date:  2024-01-10
tags: [note]
---


  接上次
* [再谈 Virtual DOM（一）](https://zhoukekestar.github.io/notes/2023/12/20/virtualdom.html)
* [再谈 Virtual DOM（二）](https://zhoukekestar.github.io/notes/2023/12/30/virtualdom-2.html)


# 编写 DOM：HTML 的进化

### 模板语言时代

  在早期的 Web 开发中，模板语言是最常用的一种技术。但由于没有规定其动态生成的规范，导致各自语言体系中，有各自的模板规范。比如：Java、C#、JS、PHP 等等。

  以下是一些常见的模板语言：

JavaScript Template Engine

* [mustache](https://github.com/janl/mustache.js)

  ![](https://cloud.githubusercontent.com/assets/288977/8779228/a3cf700e-2f02-11e5-869a-300312fb7a00.gif)

* [handlebars](https://handlebarsjs.com/zh/)

```html
<h2>Names</h2>
{{#names}}
  <strong>{{name}}</strong>
{{/names}}
```

ServerSide Template Engine

* ASP.NET

```html
@foreach (var person in members)
{
  <p>@person</p>
}
  ```

* JSP (Java Server Pages) & JSTL ( JSP Standard Tag Library)

  ![image](https://github.com/zhoukekestar/notes/assets/7157346/3f8295b2-a0e2-4758-8cf7-86890ac641bd)

```html
<c:forEach items="${requestScope.empList}" var="emp">
  <tr>
    <td><c:out value="${emp.id}"></c:out></td>
    <td><c:out value="${emp.name}"></c:out></td>
    <td><c:out value="${emp.role}"></c:out></td>
  </tr>
</c:forEach>
```
* [art-template](https://aui.github.io/art-template/)

```html
<% for(var i = 0; i < target.length; i++){ %>
    <%= i %> <%= target[i] %>
<% } %>
```

* [Velocity](https://velocity.apache.org/engine/1.7/user-guide.html)

```html
<table>
#foreach( $mud in $mudsOnSpecial )
  #if ( $customer.hasPurchased($mud) )
    <tr>
      <td>
        $flogger.getPromo( $mud )
      </td>
    </tr>
  #end
#end
</table>
```

### JSX

  随着 React 的崛起，框架侧引入了新的 JSX 语法，力求将模板语言的语法统一起来。

  因为页面大部分是前端的领域，而且随着 [前后端分离](https://www.google.com.hk/search?q=frontend+backend+separate) 的兴起，此方式受到了广泛的欢迎。

  但本质上，JSX 已不再是模板语言，而是 JS 代码。所以，灵活性和模板语言已不可同日而语，其灵活性所带来的问题，也导致其优化的上限。

* [facebook/jsx](https://github.com/facebook/jsx)

### Template Literals & Tagged templates

```js
// Template Literals
`Hello ${name}`

// Tagged templates
html`
  <div>
    <h1>Hello ${name}</h1>
  </div>`
```

* [tagged_templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
* [ecmascript-language-lexical-grammar](https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html#sec-template-literal-lexical-components)

# Virtual DOM 核心作用



* DSL vs JSX
* Ecosystem
  * Three.JS
  *
*

> The big improvements that React brought to the mainstream were componentization, and popularizing declarative rendering.
> https://news.ycombinator.com/item?id=34621279

> For some reason I thought the virtual DOM was a native feature of the browser
> https://news.ycombinator.com/item?id=34633339



### RTED

> RTED requires O(n2) space as the most space-efficient competitors, and its runtime complexity of O(n3) in the worst case is optimal.


# Virtual DOM 简写

  使用 JSX 简写


# References

* https://news.ycombinator.com/item?id=34612162
* https://svelte.dev/blog/virtual-dom-is-pure-overhead
* https://github.com/mbasso/asm-dom
* https://github.com/patrick-steele-idem/morphdom
* https://zhoukekestar.github.io/notes/2017/08/07/webcomponents-demo.html
* https://zhoukekestar.github.io/notes/2017/08/07/beyond-framework.html
* https://github.com/WebReflection/hyperHTML
* https://github.com/AFASSoftware/maquette

* https://en.wikipedia.org/wiki/Virtual_DOM
  * https://svelte.dev/blog/virtual-dom-is-pure-overhead
  * https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/


* [RTED: A Robust Algorithm for the Tree Edit Distance](https://vldb.org/pvldb/vol5/p334_mateuszpawlik_vldb2012.pdf)
* [Minimal Edit-Based Diffs for Large Trees](https://dl.acm.org/doi/pdf/10.1145/3340531.3412026)
* [Detecting Changes in XML Documents](https://people.cs.rutgers.edu/~amelie/papers/2002/diff.pdf)
* [Google String diff-match-patch](https://github.com/google/diff-match-patch)
