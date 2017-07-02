---
layout: post
title:  "HTML5 Semantic Elements"
date:   2017-06-30
tags: [html5]
commentIssueId: 30
---

HTML Semantic Elements (语义化标签)。
> 语义化的含义就是用正确的标签做正确的事情

## 优势

* 使用语义化标签，使得页面内容结构化
* 对浏览器和搜索引擎解析较为友好
  * 为什么友好
  * 具体怎么做才算友好
* 使得HTML文档更容易阅读，对开发、维护较为友好
* 有利于SEO
  * 因为搜索引擎的爬虫可以根据语义化HTML确定上下文以及关键字的权重

> According to the W3C, a Semantic Web: "Allows data to be shared and reused across applications, enterprises, and communities."

## New Semantic Elements in HTML5
* < article>
* < aside>
* < details>
* < figcaption>
* < figure>
* < footer>
* < header>
* < main>
* < mark>
* < nav>
* < section>
* < summary>
* < time>

## semantic-html
以下内容，大量引用[semantic-html](http://justineo.github.io/slideshows/semantic-html/#/)。

* HTML 语义：元素 + 属性 + 属性值（+文档结构）
* 全局属性
  * `id`: 标示符 (用于引用)，不应依赖其语义处理相应元素
  * `class`: authors are encouraged to use values that describe the nature of the content
  * `title`
    * 链接 - 描述目标信息
    * 图片 - 版权 / 描述
    * 引用 - 来源信息
    * 交互元素 - 操作指南
  * `lang`: 内容的语言
* 元数据（metadata）
  * `head`: 一组元数据
  * `title`: 文档标题（窗口标题，历史记录，搜索结果标题）
  * `meta`
    * `name/http-equiv/charset`
    * `name` 表示属性，content 表示表示内容
    * 标准名称
      * application-name, author, description, generator, keywords
    * 扩展名称 (WHATWG Wiki [MetaExtensions](https://wiki.whatwg.org/wiki/MetaExtensions))
      * Baidu: mobile-agent, baiduspider
      * Twitter: twitter:card, twitter:image, twitter:creator:id
      * Google: application-url, google-site-verification, googlebot
      * 360: renderer (未注册)
* Links
  * 外部资源链接：指向用来组成当前文档的外部资源，通常由 UA 自动处理
  * 超链接：用来「导航」到其他资源 (可以在 UA 中打开, 下载, ...)
  * 元素
    * `link`: 元数据，用来描述文档本身与其他资源的关系。必须包含 rel 及 href 属性。
      * `rel="stylesheet"`: 链接到样式表 (外部资源)
      * `rel="alternate"`: 链接到当前文档的其他形式 (超链接)

        ```html
        <link rel="alternate" type="application/rss+xml" title="Matt Mullenweg » Feed" href="http://ma.tt/feed/" />
        ```
        ![rss2](https://user-images.githubusercontent.com/7157346/27762244-f02c447a-5ea0-11e7-926a-b9766cab4114.png)

      * `rel="alternate stylesheet"`: 链接到可替换的样式表 (外部资源)
        ![altstyle](https://user-images.githubusercontent.com/7157346/27762245-f1462ca4-5ea0-11e7-9822-c9d2af9cdd15.png)
      * `rel="prev", rel="next"`: 链接到文档的前一篇 / 后一篇 / 前一页 / 后一页 (超链接), 在生成站点目录、归档视图时很有帮助。
      * `rel="icon"`: 当前文档的 favicon (外部资源)

    * `a`
      * `rel="prev", rel="next"`: 链接到文档的前一篇 / 后一篇 / 前一页 / 后一页 (超链接)
        ![nextpage](https://user-images.githubusercontent.com/7157346/27762246-f24fea9a-5ea0-11e7-86d3-e64f73d3904d.png)
      * `rel="nofollow"`: 当前文档的作者并不推荐超链接指向的文档 (超链接标注)
    * `area`
    * [links-type](http://w3c.github.io/html/links.html#linkTypes)
* `ul`, `ol`, `li`: 有序无序列表
  * value: 指定有序序号
* `dl`, `dt`, `dd` 元素
  * 名值对的集合
  * 术语定义表 / 元数据 / FAQ / ...
* `figure` 元素
  * 比较独立的、被主要内容引用的部分
  * 插图 / 图表 / 照片 / 代码 / ...
  * 通常会有一个标题 (figcaption)
* `figcaption` 元素: 图表标题 / 图例 / 代码说明 / ...
* `div`: 本身无语义。可以和 class, lang, title 等属性结合，为一系列连续的内容增加语义
* `main`: 文档的主内容 / 应用的核心功能; 唯一; 对应于 ARIA role="main" (定义)
* 文本级语义 (text-level semantics)
  * `em`
    * 表示侧重点的强调
    * 强调级别由 em 的嵌套个数决定
    * em 的位置不同，文本本身含义不同
    * 在可视化 UA 上一般渲染为斜体
  * `strong`
    * 表示内容的重要性
    * 重要程度由 strong 的嵌套个数决定
    * strong 的位置不同，文本本身含义不变
    * 在可视化 UA 上一般渲染为粗体
  * `i`
    * 不再只是「斜体」
    * 表示另一种叙述方式
    * 画外音 / 分类学名词 / 外来语片段 / 舞台指示 / 船名 / ...
    * 建议与 class / lang 属性搭配使用
  * `b`
    * 不再只是「粗体」
    * 表示某种需要引起注意却又没有其他额外语义的内容
    * 摘要中的关键词 / 评介中的产品名称 / 文章的开篇内容 ...
    * 建议与 class 属性搭配使用
  * `small`
    * 不再只是「小字」
    * fine print
    * 免责声明 / 许可证声明 / 注意事项 / ...
  * s
    * 不再只是「带删除线的文字」
    * 表示不再准确或不再相关的内容
    * 与 del 元素含义不同
  * `u`
    * 不再只是「带下划线的文字」
    * 表示用非文本进行的标注的内容
    * 中文专名 / 拼写检查的错误内容 / ...
  * `cite`
    * 引述的作品标题
    * 书 / 论文 / 散文 / 电影 / 歌曲 / 电视节目 / 画作 / ...
  * `q`
    * 引用的来自其他来源的段内内容
    * cite 属性表示该来源的 URL
    * 不用 q 而用引号亦正确
  * `abbr`
    * abbreviation or acronym (区别？)
    * 其 title 属性的含义为所写的全称
    > 建议在用户不熟悉的缩写词汇第一次出现时用 abbr + title 进行语义标注，帮助其理解

  * `dfn`
    * 用来展现一个术语的定义实例
    * 最接近的父级段落、定义列表组或区块内容必须包含 dfn 元素指定术语的定义
  * `time`
    * 为表述的内容增加一个机器可读的时间数据
    * datetime 属性值必须是预定义的几种时间格式之一
    * 如果不含 datetime 属性，则会解析其文本内容值
  * `code` - 代码片段
  * `samp` - 计算机程序的输出
  * `kbd` - 用户输入的内容 / 按键
  * `mark`
    * 在引用的文字中使用，表示在当前文档中需要引起注意但原文中并没有强调的含义 (eg. 对一篇文章的分析中对原文的标注)
    * 表示与用户当前的行为相关的内容 (eg. 高亮显示搜索关键词)
  * `ruby`, `rt`, `rp` 元素
    * 注音标示，「ruby」来自日本印刷业
    * 主要于 CJK(Chinese, Japanese, Korean) 文字
  * span
    * 本身无语义
    * 可以和 class, lang 等属性结合，为文本片段增加语义
    * 有更合适的元素时不应选择 span
* `ins`, `del` 元素
  * 表示对当前文档内容进行的增添与删改
  * `cite` 属性指向对某个修改的说明文档的 URL
  * `datetime` 属性表示了修改发生的时间 (取值规范)
  * 用来记录文档的编辑历史
* 嵌入内容 (embedded content)
  * `img`
    * `src`, `alt` 属性决定了图片的含义
      * 有 src 且 alt 为空字符串，代表装饰用图
      * 有 src 且 alt 为非空字符串，图为文档内容的一部分
      * 有 src 且无 alt，图为内容一部分但无等价的文本内容可用
    * 用 alt 文本替换图片，文档含义尽可能不变
  * `iframe` - 内嵌的浏览上下文
  * `embed` - 外部应用或可交互内容的整合入口
  * `object` - 通用外部资源: 根据具体内容可以被处理为图片、内嵌的浏览上下文、供插件调用的资源
  * `param` - 为 object 元素传递的参数
  * `video`, `audio`
    * `source`
      * 表示所在多媒体元素的可替代资源, (可能不同格式 / 清晰度，读取失败或无法解码时可以依次尝试)
      * `type` 属性中除了 MIME 类型外，可使用 codecs= 来指定编码
    * `track`
      * 用来为多媒体元素指定「文本轨」
      * `kind` 属性描述文本轨的类型
* 表格
  * `table` 元素：用来表示超过一维的数据
  * `caption` 元素：表示所处的 table 的标题
    > 当所处的 table 是外部 figure 元素的唯一子元素，应首选 figcaption

  * `tbody`, `thead`, `tfoot` 元素
    * 均为一组表格行
    * `thead` 表示列头 (通常为列标题，单元格用 th 元素)
    * `tfoot` 表示列脚 (通常为列数据汇总)
  * `col`, `colgroup`, `tr` 元素: 列，列组，行
  * `td`, `th`
    * `td` - 数据单元格
    * `th` - 标题单元格
    * `th` 的 `scope` 属性表示标题对应的数据范围

* [Microformats](http://microformats.org/): Microformats 是 HTML 的扩展，用来标注人物 / 组织 / 事件 / 地点 / 简历 / 菜谱 等等，很多格式已是业界的事实标准。

  * Microformats 的基本思路： 用 HTML 已有的元素 / 属性，配合对属性值语义的扩展 (主要针对 class 属性) 以及对文档结构的约定来增强 HTML 的语义表达能力。Microformats 的规范本质上就是对一系列常用类型数据 HTML 格式的约定。

  * [hCard](http://microformats.org/wiki/hcard):
    * 用来在 Web 上发布人物 / 公司 / 组织机构信息的格式
    * 和 vCard 格式 (MIME 类型：text/vcard, RFC2426) 定义的属性名值定义一一对应
  * [hCalendar](http://microformats.org/wiki/hcalendar) - 发布事件
    * 基于 iCalendar 格式 (MIME 类型：text/calendar, RFC2445)
  * [hReview](http://microformats.org/wiki/hreview) - 发布书评 / 影评 / 产品评价 / ...
  * 对 HTML rel 属性值的扩展定义, rel="license", rel="tag", rel="enclosure", ... 部分已经进入 HTML5 草案

  > 这里以wiki中使用hCard为例

  ![qq 20170702182316](https://user-images.githubusercontent.com/7157346/27769039-b59668fa-5f53-11e7-93fe-4785d13619a0.png)
  ![qq 20170702182356](https://user-images.githubusercontent.com/7157346/27769038-b5966bf2-5f53-11e7-900b-802d5a2b644b.png)

* 微数据 ([HTML Microdata](https://www.w3.org/TR/microdata/)): 允许在现有的文档中嵌入一组项的名值对集合
  * `itemscope` 属性: 用来标注描述项的位置
  * `itemtype` 属性, [schemas: 统一词汇表](http://schema.org/docs/schemas.html)
    * 如果期望服用已定义的项的模式，可用 itemtype 属性给出该类型的 URI
    * 必须与 `itemscope` 属性置于同一元素上
  * `itemprop` 属性: 当前项的属性名
  * `itemid` 属性: 当前项的全局 ID, 如：ISBN(International Standard Book Number)
  > 这里以IMDb为例，使用微数据，让Google在搜索结果中显示评分，投票数等信息

  ![qq 20170702175921](https://user-images.githubusercontent.com/7157346/27768886-0b98e578-5f51-11e7-800a-e08dc1357414.png)
  ![qq 20170702175838](https://user-images.githubusercontent.com/7157346/27768885-0abff51a-5f51-11e7-9d82-df2257624134.png)

## References
* [HTML语义化](https://leohxj.gitbooks.io/front-end-database/html-and-css-basic/semantic-html.html)
* [HTML5 Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
* [www.w3.org](https://www.w3.org/2001/sw/)
* [语义网](https://zh.wikipedia.org/wiki/%E8%AF%AD%E4%B9%89%E7%BD%91)
