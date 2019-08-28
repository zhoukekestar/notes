---
layout: post
title:  "JSON Schema 简介"
date:  2019-08-28
tags: [tool]
commentIssueId: 108
---



* 在前后端分离架构下，JSON 格式被广泛用于前端的数据交互，并成为事实上的规范，但前端在编写表单的过程中，依旧对着字段和后端进行 CRUD，这其中的效率有可能提升吗？有什么规范能通用解决表单类的中后台需求呢？本文将从 JSON 格式出发，来探寻着其中的可能性。
* JSON
* JSON Schema & CRUD
* JSON Schema 表单
* JSON 2 Schem




## 背景

SCQA：在前后端分离架构下，JSON 格式被广泛用于前端的数据交互，并成为事实上的规范，但前端在编写表单的过程中，依旧对着字段和后端进行 CRUD，这其中的效率有可能提升吗？有什么规范能通用解决表单类的中后台需求呢？本文将从 JSON 格式出发，来探寻着其中的可能性。

> 对于这个问题，其实社区也有很不错的实现，比如：[AForm](https://github.com/xiehuiqi220/AForm), [formio.js](https://github.com/formio/formio.js) 等等，但这些往往是一些私有的协议，缺乏规范和标准，如何从规范出发，保持最大的兼容和面向未来编程，是我想追求的。



## JSON

从官网 [json.org](https://www.json.org/) <sup>[1]</sup>，可以了解到对 JSON 的描述：

> **JSON** (JavaScript Object Notation) is a lightweight data-interchange format.

JSON 是 JavaScript 对象的描述格式，是一种轻量的数据交换格式。优势有

* 方便人、机器的阅读（解析）、书写（生成）
* 文本格式，而非二进制或其他
* `completely language independent`  和编程语言独立，且实现简单，因为只有两种结构
  * 键值对
  * 数组



#### 为什么方便人阅读会是它的亮点呢？

我们可以通过 [Java 对象序列化描述](https://www.cnblogs.com/qq3111901846/p/7894532.html) 的这个列子看到，使用 Java **Serializable** 接口，最终会被序列化为一个二进制文件，这对于机器来说，没太大问题，但对人来说，二进制的阅读简直是噩梦。



<img src="https://img.alicdn.com/tfs/TB1i6RieEH1gK0jSZSyXXXtlpXa-636-424.png" width="200px" />





## JSON Schema

从官网 [json-schema.org](http://json-schema.org/) <sup>[2]</sup>，可以了解到对 JSON Schema 的描述：

> ​	**JSON Schema** is a vocabulary that allows you to **annotate** and **validate** JSON documents.

它是用来声明和验证 JSON 数据的，它的优势有：

- 用来描述现有 JSON 数据的格式
- 提供对人、机器可读的文档格式
- 验证数据的合法性，如
  - 自动化数据测试的合法性
  - 检测客户端提交数据的合法性





## JSON Schema & CRUD

有了 JSON Schema 这把利剑，他的主要场景是用来验证数据的合法性以及数据格式，看似和我们的背景无关，但想想 CRUD 的主要工作由以下几种:

1. 提供数据表单
2. 验证表单数据合法性
3. 提交表单

其中第 2 步，JSON Schema 再合适不过了，方便服务端或客户端用来做数据合法性的校验，第  3 步，没太大工作量，使用网络库解决就行，那对于工作量最重的第 1 步，有什么解法呢？



## 从 JSON Schema 创建表单

很幸运，我们从官网实现列表中找了一份质量不错的实现，[implementations](https://json-schema.org/implementations.html) , 剔除和框架绑定的，有以下几种，截止 20190828，各项目的 Star 数：

* [Alpaca Forms](http://www.alpacajs.org/) (ASL 2.0)【Star: 1074】
* [JSON Editor](https://github.com/json-editor/json-editor) (MIT)  【Star: 1319】
* [JSON Form (joshfire)](https://github.com/joshfire/jsonform) (joshfire) (MIT)【Star: 1813】
* [Json Forms (brutusin)](https://github.com/brutusin/json-forms) (brutusin) (MIT)【Star: 451】
* [JSONForms (jsonforms.io)](https://jsonforms.io/) (EclipseSource) (MIT)【Star: 313】
* [uniforms (Vazco)](https://github.com/vazco/uniforms) (MIT)【Star: 753】

按 Star 数，优先选择前 3 个，由于第一个和第三个，和 jQuery 和相关 UI 库绑定，且 `JSON Editor` 相对较为独立，所以，我们选择 `JSON Editor` 来作为实验对象。



代码如下：

```html
<div id='editor_holder'></div>
<script src="https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/jsoneditor.min.js"></script>

<script>
var element = document.getElementById('editor_holder');
  
var editor = new JSONEditor(element, {
  schema: {
    "type": "object",
    "properties": {
      "prop1": {
        "type": "string"
      },
      "prop2": {
        "type": "integer"
      }
    }
  }
});
</script>
```



示例如下：

<div id='editor_holder'></div>
<script src="https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/jsoneditor.min.js"></script>
<script>
var element = document.getElementById('editor_holder');
var editor = new JSONEditor(element, {
  schema: {
    "type": "object",
    "properties": {
      "prop1": {
        "type": "string"
      },
      "prop2": {
        "type": "integer"
      }
    }
  }
});
</script>





## JSON 2 Schema

这么好用的 Schema，如何快速从数据中生成呢？在实现列表中，官网贴心地提供了这样的工具，这样我们能通过 JSON 数据，快速生成我们想要的表单，比如，我们定义了以下 JSON：

```
{
  "hello": "world",
  "array": [
    {
      "name": "pipe"
    }
  ]
}
```

我们通过 [jsonschema.net](https://www.jsonschema.net/)<sup>[3]</sup> 将上述数据转成 JSON Schema

![](https://img.alicdn.com/tfs/TB1l50LeAY2gK0jSZFgXXc5OFXa-2760-1298.png)



通过这份 Schem，我们通过 `JSON Editor` [在线工具](https://json-editor.github.io/json-editor/)，一个 Form 表单就生成完毕了

![](https://img.alicdn.com/tfs/TB1vdRJeuL2gK0jSZPhXXahvXXa-2616-1294.png)



## References

1. JSON 官网：https://www.json.org/
2. JSON Schema 官网：http://json-schema.org/
3. JSON Schema From Data [jsonschema.net](https://www.jsonschema.net/)
4. JSON Editor: https://json-editor.github.io/json-editor/
