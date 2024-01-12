---
layout: post
title:  "再谈 Virtual DOM（二）"
date:  2024-01-10
tags: [note]
---


  如何编写 DOM？

* [再谈 Virtual DOM（一）](https://zhoukekestar.github.io/notes/2023/12/20/virtualdom.html)
* [再谈 Virtual DOM（二）](https://zhoukekestar.github.io/notes/2023/12/30/virtualdom-2.html)


# 编写 DOM：HTML 的进化

### 原生时代

  最早的 Web 开发，是以 HTML 为基础的。

  随着后续动态技术的兴起，动态页面也逐渐流行起来。

### 模板语言时代

  在早期的 Web 开发中，模板语言是最常用的一种技术。但由于没有规定其动态生成的规范，导致各自语言体系中，有各自的模板规范。比如：Java、C#、JS、PHP 等等。

  以下是一些常见的模板语言：

JavaScript Template Engine

* [mustache](https://github.com/janl/mustache.js)

  ![](https://cloud.githubusercontent.com/assets/288977/8779228/a3cf700e-2f02-11e5-869a-300312fb7a00.gif)

* [handlebars](https://handlebarsjs.com/zh/)

```html
<h2>Names</h2>
{#names}
  <strong>{name}</strong>
{/names}
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

