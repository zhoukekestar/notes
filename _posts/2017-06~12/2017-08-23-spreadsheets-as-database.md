---
layout: post
title:  "Spreadsheets as database"
date:   2017-08-23
tags: [google]
commentIssueId: 49
---

想找个简单的数据存储，用 `MySQL` ？自己搭得有服务器，云数据库又太贵。当你只需要一个简单的数据存储，`Excel` 可能是个不错的选择。
本文将简单介绍基于 `Google Sheet` ，并将其作为一个简易版数据库的实践操作。
* 新建 `Sheet`
* 发布到网络
* 在网页中应用数据
* 在线 Demo

## 新建表格

如图所示，建立一个表格，[在线链接](https://docs.google.com/spreadsheets/d/1XMWiqVNHGwCuatDW_QFzNTErQzpc1CkUHwnwD7WZJtg/edit?usp=sharing)

![tim 20170823103013](https://user-images.githubusercontent.com/7157346/29597283-3cef3d7c-87f4-11e7-9377-a7dc4e7b5335.png)

## 发布到网络

点击 `文件` -> `发布到网络`

![tim 20170823104735](https://user-images.githubusercontent.com/7157346/29597286-3eae8b18-87f4-11e7-89b3-841bd6332358.png)

## 网页中读取数据

* 采用 `json` 格式读取数据：[https://spreadsheets.google.com/feeds/list/1XMWiqVNHGwCuatDW_QFzNTErQzpc1CkUHwnwD7WZJtg/od6/public/values?alt=json](https://spreadsheets.google.com/feeds/list/1XMWiqVNHGwCuatDW_QFzNTErQzpc1CkUHwnwD7WZJtg/od6/public/values?alt=json)
* 采用 `jsonp` 格式读取数据：[https://spreadsheets.google.com/feeds/list/1XMWiqVNHGwCuatDW_QFzNTErQzpc1CkUHwnwD7WZJtg/od6/public/values?alt=json&callback=spreadsheets_callback](https://spreadsheets.google.com/feeds/list/1XMWiqVNHGwCuatDW_QFzNTErQzpc1CkUHwnwD7WZJtg/od6/public/values?alt=json&callback=spreadsheets_callback)

其中需要将链接 `https://spreadsheets.google.com/feeds/list/你的文档ID/od6/public/values?alt=json` 中 `你的文档ID` 替换成你自己的 ID

## Demo

<div id='table'></div>
<style>
  table td,
  table th {
    border: solid 1px #ccc;
  }
</style>
<script src='https://cdn.bootcss.com/mustache.js/2.3.0/mustache.min.js'></script>
<script id='template' type="x-template-mustache">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>name</th>
        <th>date</th>
      </tr>
    </thead>
    <tbody>
      <%#feed.entry%>
        <tr>
          <td><%gsx$id.$t%></td>
          <td><%gsx$name.$t%></td>
          <td><%gsx$date.$t%></td>
        </tr>
      <%/feed.entry%>
    </tbody>
  </table>
</script>
<script>
  Mustache.tags = ['<%', '%>'];
  window.spreadsheets_callback = function (d) {
    console.log(d)
    var template = document.querySelector('#template').innerHTML;
    template = Mustache.render(template, d);
    document.querySelector('#table').innerHTML = template;
  }
</script>
<script src='https://spreadsheets.google.com/feeds/list/1XMWiqVNHGwCuatDW_QFzNTErQzpc1CkUHwnwD7WZJtg/od6/public/values?alt=json&callback=spreadsheets_callback'></script>

该 Demo 的数据源是[这个 Sheet 文档](https://docs.google.com/spreadsheets/d/1XMWiqVNHGwCuatDW_QFzNTErQzpc1CkUHwnwD7WZJtg/edit?usp=sharing)。

```html
<div id='table'></div>
<style>
  table td,
  table th {
    border: solid 1px #ccc;
  }
</style>
<script src='https://cdn.bootcss.com/mustache.js/2.3.0/mustache.min.js'></script>
<script id='template' type="x-template-mustache">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>name</th>
        <th>date</th>
      </tr>
    </thead>
    <tbody>
      <%#feed.entry%>
        <tr>
          <td><%gsx$id.$t%></td>
          <td><%gsx$name.$t%></td>
          <td><%gsx$date.$t%></td>
        </tr>
      <%/feed.entry%>
    </tbody>
  </table>
</script>
<script>
  Mustache.tags = ['<%', '%>'];
  window.spreadsheets_callback = function (d) {
    console.log(d)
    var template = document.querySelector('#template').innerHTML;
    template = Mustache.render(template, d);
    document.querySelector('#table').innerHTML = template;
  }
</script>
<script src='https://spreadsheets.google.com/feeds/list/1XMWiqVNHGwCuatDW_QFzNTErQzpc1CkUHwnwD7WZJtg/od6/public/values?alt=json&callback=spreadsheets_callback'></script>
```
