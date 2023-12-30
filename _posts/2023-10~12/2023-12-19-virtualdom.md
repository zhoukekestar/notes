---
layout: post
title:  "再谈 Virtual DOM（一）"
date:  2023-12-20
tags: [note]
---


* 背景：是从一开始的静态页面，发展到了 WebApp
* Web Application：WebApp 所遇到的问题和挑战
* 维护 DOM：是最大的挑战之一
* 更新 DOM：方案与优劣（接后续）

# 背景

  回顾历史，计算机应用从 CS（Client-Server） 架构往 BS（Browser-Server） 迁移后，应用的开发方式发生了变化。

  从 1991 年第一次公开 HTML 以来，再到 1995 年 Netscape 推出客户端脚本 Javascript 之后，再到 2000 年，Gmail 大规模使用 AJAX 来异步更新页面。前端浏览器页面，从无到有，从静态到动态，从动态到复交互形态。

  Web 页面从仅仅是静态展示，慢慢变成 Web 应用（即 Web Application）。

* https://en.wikipedia.org/wiki/Web_application
* https://en.wikipedia.org/wiki/Ajax_(programming)

# Web Application

  既然是应用，相比之前的 HTML 静态页面，就变得复杂了。

  在原有静态页面的时代，HTML 页面的内容是相对静态的，页面的真实渲染一般也由后端服务器使用模板语言来生成。

  比如：[Vecolity](https://velocity.apache.org/engine/1.7/user-guide.html), [JSP](https://www.geeksforgeeks.org/introduction-to-jsp/), [ASP](https://learn.microsoft.com/en-us/previous-versions/aspnet/h59db326(v=vs.100)), [art-template](https://aui.github.io/art-template/zh-cn/) 等等

  像 ASP.NET 的方案，通过 `runat=server` 可以将 click 事件，都放在服务端处理，并在点击后返回整个 HTML 页面。

```html
  <form id="form1" runat="server">
    <asp:Button id="Button1"
      Text="Submit"
      OnClick="SubmitBtn_Click"
      runat="server"/>
  </form>
```

  原有的模板方案，数据一般都在服务端维护（包括页面路由等），且多以展现为主，并无强烈的页面状态维护等诉求。

  一切都被 Gmail 打破了，在使用 AJAX 方案后，大幅减少了服务器流量（从原有的整体页面请求到页面区块的请求），且显著增强了应用程序性能和用户体验。

  <!-- DOM 是 Document Object Model 的简写，是 -->


# 维护 DOM

  一开始的网页，由于偏静态化，所以，一般没有复杂的 DOM 维护操作。

  通常情况，HTML DSL 即为 DOM，较少更新 DOM，如果需要更新 DOM。
  * 使用原生 DOM API `document.querySelector('p').innerHTML = '<b>hello wrold</b>'`
  * 在 `jQuery` 时代，会使用 `$('p').replaceWith('<b>hello world</b>')`

  后续随着网页往 `WebApp` 发展，网页趋于动态、复杂化。随着而来的，便是复杂的页面状态，以及复杂的 DOM 更新。

  比较典型的还是 Gmail 的例子：

* 复杂搜索筛选，发件人、收件人、主题、日期范围等等
* 复杂的操作，选择、删除、标记、移动等等

<img width="1004" alt="image" src="https://github.com/zhoukekestar/notes/assets/7157346/630b3ac6-8ae1-4e74-b84b-238cb02b7e72">


  于是 MVVM（Model-View-Viewmodel），MVC（Model-View-Controller），组件化，分层等软件工程概念出现了。

![image](https://github.com/zhoukekestar/notes/assets/7157346/1f56c030-af43-4eed-bbfd-7e1eb0d09e50)

  我们只需要控制 ViewModel，对应的 View 就会通过 DataBinding 自动更新，Angular、React、Vue 等此类框架的核心工作便是如此。

* https://en.wikipedia.org/wiki/Document_Object_Model#Manipulating_the_DOM_tree

