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
  * 指定页面特定样式(用户可自行修改)
  * 对页面中的链接做适当的解释（比如指定上一页，或下一页的地址）
  * 微格式，获取页面中特定的数据，如：wiki信息
  * 微数据，获取页面中特定的数据，如：电影信息
* 使得HTML文档更容易阅读，对开发、维护较为友好
* 有利于SEO
  * 因为搜索引擎的爬虫可以根据语义化HTML确定上下文以及关键字的权重

> According to the W3C, a Semantic Web: "Allows data to be shared and reused across applications, enterprises, and communities."

## Semantic Elements
以下所有注释均来源于[MDN](https://developer.mozilla.org)。

* `article`: 表示文档、页面、应用或网站中的独立结构，其意在成为可独立分配的或可复用的结构，如在发布中，它可能是论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。
* `aside`: 表示一个和其余页面内容几乎无关的部分，被认为是独立于该内容的一部分并且可以被单独的拆分出来而不会使整体受影响。其通常表现为侧边栏或者嵌入内容。他们通常包含在工具条，例如来自词汇表的定义。也可能有其他类型的信息，例如相关的广告、笔者的传记、web 应用程序、个人资料信息，或在博客上的相关链接。

  ```html
  <article>
    <p>
      The Disney movie <em>The Little Mermaid</em> was
      first released to theatres in 1989.
    </p>
    <aside>
      The movie earned $87 million during its initial release.
    </aside>
    <p>
      More info about the movie...
    </p>
  </article>
  ```

  <article>
    <p>
      The Disney movie <em>The Little Mermaid</em> was
      first released to theatres in 1989.
    </p>
    <aside>
      The movie earned $87 million during its initial release.
    </aside>
    <p>
      More info about the movie...
    </p>
  </article>

* `details`: 被用作发现小部件，用户可以从其中检索附加信息。
* `summary`: 用作 一个`details`元素的一个内容的摘要，标题或图例。

  ```html
  <details>
    <summary>Some details</summary>
    <p>More info about the details.</p>
  </details>

  <details open>
    <summary>Even more details</summary>
    <p>Here are even more details about the details.</p>
  </details>
  ```
  <details>
    <summary>Some details</summary>
    <p>More info about the details.</p>
  </details>

  <details open>
    <summary>Even more details</summary>
    <p>Here are even more details about the details.</p>
  </details>

* `figure`: 代表一段独立的内容, 经常与说明(caption) `figcaption` 配合使用, 并且作为一个独立的引用单元。当它属于主体(main flow)时，它的位置独立于主体。这个标签经常是在主文中引用的图片，插图，表格，代码段等等，当这部分转移到附录中或者其他页面时不会影响到主体。
* `figcaption`: 是与其相关联的图片的说明/标题，用于描述其父节点 `figure` 元素里的其他数据。这意味着 `figcaption` 在 `figure` 块里是第一个或最后一个。同时 `HTML Figcaption` 元素是可选的；如果没有该元素，这个父节点的图片只是会没有说明/标题。

  ```html
  <figure>
    <img src="https://developer.cdn.mozilla.net/media/img/mdn-logo-sm.png" alt="An awesome picture">
    <figcaption>Fig1. MDN Logo</figcaption>
  </figure>
  ```
  <figure>
    <img src="https://developer.cdn.mozilla.net/media/img/mdn-logo-sm.png" alt="An awesome picture">
    <figcaption>Fig1. MDN Logo</figcaption>
  </figure>

* `main`: 呈现了文档`body`或应用的主体部分。主体部分由与文档直接相关，或者扩展于文档的中心主题、应用的主要功能部分的内容组成。这部分内容在文档中应当是独一无二的，不包含任何在一系列文档中重复的内容，比如侧边栏，导航栏链接，版权信息，网站logo，搜索框（除非搜索框作为文档的主要功能）。
* `footer`: 表示最近一个章节内容或者根节点（sectioning root ）元素的页脚。一个页脚通常包含该章节作者、版权数据或者与文档相关的链接等信息。
* `header`: 表示一组引导性的帮助，可能包含标题元素，也可以包含其他元素，像logo、分节头部、搜索表单等。
  ```html
  <header></header>
  <main>
    <h1></h1>
    <article></article>
  </main>
  <footer></footer>
  ```

* `mark`: 代表突出显示的文字,例如可以为了标记特定上下文中的文本而使用这个标签. 举个例子，它可以用来显示搜索引擎搜索后关键词。
  * 在一个引用或者块级元素中，突出显示的文本通常是外部引用的文本，或者标记成特殊审查其他的作者很重要.
  * 在主要的文本中，突出显示的文本通常可能和用户当前活动具有某种关联性，比如搜索的结果.
  * 不要为了语法高亮而用 `mark` 元素; 你应该用 `strong` 元素来实现这个目的（语法高亮）。
  * 不要把 `mark` 元素和  `strong` 元素搞混淆. `strong` 元素用来表示文本在上下文的重要型的， 而 `mark` 元素是用来表示上下文的关联性的.

  ```html
  <p>&lt;mark&gt; 元素用于 <mark>highlight</mark> 文本</p>
  ```

  <p>&lt;mark&gt; 元素用于 <mark>highlight</mark> 文本</p>

* `nav`: 描绘一个含有多个超链接的区域，这个区域包含转到其他页面，或者页面内部其他部分的链接列表.

  ```html
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  ```
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>

* `section`: 表示文档中的一个区域（或节），比如，内容中的一个专题组，一般来说会有包含一个标题（heading）。一般通过是否包含一个标题 (`h1`-`h6` element) 作为子节点 来 辨识每一个`section`。

  ```html
  <section>
    <h1>Heading</h1>
    <p>Bunch of awesome content</p>
  </section>
  ```
  <section>
    <h1>Heading</h1>
    <p>Bunch of awesome content</p>
  </section>


* `time`: 用来表示24小时制时间或者公历日期，若表示日期则也可包含时间和时区。

  ```html
  <p>The concert took place on <time datetime="2001-05-15 19:00">May 15</time>.</p>
  ```
  <p>The concert took place on <time datetime="2001-05-15 19:00">May 15</time>.</p>

* `ul, ol, li`: 无序、有序列表。 其中，也可以通过`reversed`, `start`, `list-style-type`等值设置`倒序`, `初始值`, `列表类型`。

  ```html
  <ol style="list-style-type: upper-roman;" start='3'>
    <li>列表3</li>
    <li>列表4</li>
  </ol>
  ```

  <ol style="list-style-type: upper-roman;" start='3'>
    <li>列表3</li>
    <li>列表4</li>
  </ol>

* `dl`, `dt`, `dd`: 定义列表。使用场景有术语定义，FAQ等

  ```html
  <!-- https://en.wikipedia.org/wiki/Wikipedia:FAQ -->
  <dl>
    <dt>How do I edit a page?</dt>
    <dd>Editing most Wikipedia pages is easy, just click the "Edit" tab at the top of a Wikipedia page (or on a section-edit link). </dd>
    <dt>How do I create a new page?</dt>
    <dd>You are required to have a Wikipedia account to create a new article—you can register here. </dd>
  </dl>
  ```

  <dl>
    <dt>How do I edit a page?</dt>
    <dd>Editing most Wikipedia pages is easy, just click the "Edit" tab at the top of a Wikipedia page (or on a section-edit link). </dd>
    <dt>How do I create a new page?</dt>
    <dd>You are required to have a Wikipedia account to create a new article—you can register here. </dd>
  </dl>



* `table`, `thead`, `tbody`, `tfoot`, `caption`: 表格，表头，表内容，表脚，表标题。

  ```html
  <table style='border: 1px;'>
    <caption>mytable</caption>
    <thead>
      <tr>
        <th>Month</th>
        <th>Savings</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>January</td>
        <td>$100</td>
      </tr>
      <tr>
        <td>February</td>
        <td>$80</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Sum</td>
        <td>$180</td>
      </tr>
    </tfoot>
  </table>
  ```

  <table style='border: 1px;'>
    <caption>mytable</caption>
    <thead>
      <tr>
        <th>Month</th>
        <th>Savings</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>January</td>
        <td>$100</td>
      </tr>
      <tr>
        <td>February</td>
        <td>$80</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Sum</td>
        <td>$180</td>
      </tr>
    </tfoot>
  </table>

* `blockquote`, `q`: 块引用, 短引用。

  ```html
  <p>Here comes a short quotation: <q>This is a short quotation</q></p>
  <blockquote>
    blockquote
  </blockquote>
  ```

  <p>Here comes a short quotation: <q>This is a short quotation</q></p>
  <blockquote>
    This is a long quotation
  </blockquote>

* `video`, `audio`: 视频，音频。`source`: 视频资源。 `track`: 字幕。

  ```html
  <video width="320" height="240" controls="controls">
    <source src="forrest_gump.mp4" type="video/mp4" />
    <source src="forrest_gump.ogg" type="video/ogg" />
    <track kind="subtitles" src="subs_chi.srt" srclang="zh" label="Chinese">
    <track kind="subtitles" src="subs_eng.srt" srclang="en" label="English">
  </video>
  ```

* `em`: 着重元素 (`em`) 标记出需要用户着重阅读的内容，`em` 元素是可以嵌套的，嵌套层次越深，则其包含的内容被认定为越需要着重阅读。
* `i`: 用于表现因某些原因需要区分普通文本的一系列文本。例如技术术语、外文短语或是小说中人物的思想活动等，它的内容通常以斜体显示。<br><br>
  该元素只在没有更适合的语义元素表示时使用。例如：
  * 使用`em` 表示强调或重读。
  * 使用`strong` 表示重要性。
  * 使用`mark` 表示相关性。
  * 使用`cite` 标记著作名，如一本书、剧本或是一首歌。
  * 使用`dfn` 标记术语的定义实例。

  > <em> 标签表示着重强调其内容，而 <i> 标签表示从正常的散文中区分出的文本, 如电影或书籍的名字，一个外来词, 或者当文本指的是一个字的定义，而不是其自身代表的语义。

  ```html
  <p>The <i>Queen Mary</i> sailed last night</p>
  <p>Just <em>do</em> it already!</p>
  <p>When doing x it is <strong>imperative</strong> to do y before proceeding.</p>
  <p>&lt;mark&gt; 元素用于 <mark>highlight</mark> 文本</p>
  <p>More information can be found in <cite>[ISO-0000]</cite>.</p>
  <p><dfn id="def-internet">The Internet</dfn> is a global system of interconnected networks that use the Internet Protocol Suite (TCP/IP) to serve billions of users worldwide.</p>
  ```
  <p>The <i>Queen Mary</i> sailed last night</p>
  <p>Just <em>do</em> it already!</p>
  <p>When doing x it is <strong>imperative</strong> to do y before proceeding.</p>
  <p>&lt;mark&gt; 元素用于 <mark>highlight</mark> 文本</p>
  <p>More information can be found in <cite>[ISO-0000]</cite>.</p>
  <p><dfn id="def-internet">The Internet</dfn> is a global system of interconnected networks that use the Internet Protocol Suite (TCP/IP) to serve billions of users worldwide.</p>

* `code`: 呈现一段计算机代码. 默认情况下, 它以浏览器的默认等宽字体显示.

  ```html
  <p>Regular text. <code>This is code.</code> Regular text.</p>
  ```
  ![tim 20170703181012](https://user-images.githubusercontent.com/7157346/27788496-6817b868-601b-11e7-83a3-d4e6c3eaa925.png)

* `samp`: 用于标识计算机程序输出，通常使用浏览器缺省的 monotype 字体（例如 Lucida Console）。

  ```html
  <p>Regular text. <samp>This is sample text.</samp> Regular text.</p>
  ```

  <p>Regular text. <samp>This is sample text.</samp> Regular text.</p>

* `kbd`: 用户输入的内容 / 按键

  ```html
  <p>Save the document by pressing <kbd>Ctrl</kbd> + <kbd>S</kbd></p>
  ```

  <p>Save the document by pressing <kbd>Ctrl</kbd> + <kbd>S</kbd></p>

* `small`: 將使文本的字体变小一号。(例如从大变成中等，从中等变成小，从小变成超小)。在HTML5中，除了它的样式含义，这个元素被重新定义为表示边注释和附属细则，包括版权和法律文本。

  ```html
  <p>This is the first sentence.  <small>This whole sentence is in small letters.</small></p>
  ```
  <p>This is the first sentence.  <small>This whole sentence is in small letters.</small></p>

* `del`: 表示已经从文档中删除的文本范围。此元素通常是（但不必）呈现删除线的文本。
* `ins`: 定义已经被插入文档中的文本。
  * `cite`: 指向一个文档的 URL，该文档解释了文本被插入或修改的原因。（目前该属性还没有被主流浏览器支持）
  * `datetime`: 该特性指示的此修改发生的时间和日期，并且该特性的值必须是一个有效的日期或者时间字符串。如果该值不能被解析为日期或者时间，则该元素不具有相关联的时间标记。

  ```html
  <p>This is <del datetime="2000-00-00">a del message</del> <ins>a ins message</ins>.</p>
  ```

  <p>This is <del datetime="2000-00-00">a del message</del> <ins>a ins message</ins>.</p>

* `abbr`: 代表缩写，并可选择提供一个完整的描述。如果存在，title 属性必须包含这个完整的描述。

  ```html
  <abbr title="Internationalization">I18N</abbr>
  ```

  <abbr title="Internationalization">I18N</abbr>

* `ruby`, `rt`, `rp`: 被用来展示东亚文字注音或字符注释。

  ```html
  <ruby>
  漢 <rp>(</rp><rt>Kan</rt><rp>)</rp>
  字 <rp>(</rp><rt>ji</rt><rp>)</rp>
  </ruby>
  ```

  <ruby>
  漢 <rp>(</rp><rt>Kan</rt><rp>)</rp>
  字 <rp>(</rp><rt>ji</rt><rp>)</rp>
  </ruby>

## 语义化布局样例

<img src="https://user-images.githubusercontent.com/7157346/27770027-607310f0-5f6a-11e7-9054-acab41209605.png" style="width: 200px;">

可参考：
* https://developer.mozilla.org/en-US/docs/Web/API
* https://developer.mozilla.org/en-US/docs/Web/API/Metadata

## Semantic HTML by 顾轶灵

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

* 嵌入内容 (embedded content)
  * `iframe` - 内嵌的浏览上下文
  * `embed` - 外部应用或可交互内容的整合入口
  * `object` - 通用外部资源: 根据具体内容可以被处理为图片、内嵌的浏览上下文、供插件调用的资源
  * `param` - 为 object 元素传递的参数


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

## 语义化的升华 - 语义网
语义网

## References
* [semantic-html](http://justineo.github.io/slideshows/semantic-html/#/)
* [HTML语义化](https://leohxj.gitbooks.io/front-end-database/html-and-css-basic/semantic-html.html)
* [HTML5 Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
* [www.w3.org](https://www.w3.org/2001/sw/)
* [语义网](https://zh.wikipedia.org/wiki/%E8%AF%AD%E4%B9%89%E7%BD%91)
* [semantic html](https://internetingishard.com/html-and-css/semantic-html/)
