---
layout: post
title: "怎么基于 Github 搭建自己的博客网站"
date: 2017-06-22
tags: [blog]
commentIssueId: 25
---

首先，我想说明一下，我这个网站，最开始的目的，还是自己平时学习的时候，记一点`笔记`。
很久之前，我和几个同学的讨论的时候，无意间聊到。我同学说：

> 现在的网上的Blog内容写得真不咋的，质量都不高。

然后，一想想我。。。额，我就是那种质量不高的`blog`的作者。于是，我就默默地把我项目的名字从`Blog`改成`Notes`了。

就我实际体会而言，写`Blog`会迫使自己去学一些东西，也会更系统，具体些。不过，我平时，瞎忙的时候，不太有时间，也不太愿意去学，更多的只是工作上的一些临时笔记。所以，很多东西也没有很系统具体。当然，我会建议更多地去写`Blog`。

PS: 该文章是应网友[@peterpanBest](https://github.com/peterpanBest) 在[issue](https://github.com/zhoukekestar/notes/issues/6)的要求写的，写的比较简单粗略，包括[jekyll-tempalte](https://github.com/zhoukekestar/jekyll-template)也是大概地精简notes项目的代码之后创建的，有错误之处，多多包涵。

## 基础搭建和技术
搭建Blog需要:
* 域名和网址
  > github 的static pages天然提供这种功能, 参考：[https://pages.github.com/](https://pages.github.com/)

* 写文章不要太麻烦，也不要失去灵活性，最好还有文章的修改的历史记录。
  > Markdown！写起来简单，还能嵌HTML，还可以用git管理！

* Blog页面最好能定制，静态生成，我写一个markdown的笔记，就能生成一个页面，那就好了。（作为前端的blog，有时候能写`js`，`css`，那就更好了）
  > Github 支持一种而且仅仅一种自动生成静态页面的技术：[Jekyll ](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)！你也可以查看一下[官方文档](https://jekyllrb.com/)。

* 评论和修改

## 文章修改
平时，看`Blog`的时候，经常看到blog会有明显的错误，其实，我们作为读者，可以和作者一起，积极地参与到文章的编写当中！

基于 `Github` 和 `PullRequest` ，阅读的人，只需要点击修改文章，然后，再提交`PR`，可以简单方便地参与文章的编写中。

## 评论系统

基于 Github 自带的评论的系统，有效解决了：
* 用户登录和注册（我已经假定看我文章的人，都是开发者，都有 Github 账号）
* 丰富的评论编辑功能（支持 Github 的 Markdown ，图片，标题，文本，各种功能用起来）
* 评论的通知的实时反馈（Github的通知）


## 具体的实施细节
跑本地 Jekyll 的话，步骤还挺多，也挺复杂的。

官方的文档和步骤是：

```sh
# Install Jekyll and Bundler gems through RubyGems
~ $ gem install jekyll bundler

# Create a new Jekyll site at ./myblog
~ $ jekyll new myblog

# Change into your new directory
~ $ cd myblog

# Build the site on the preview server
~/myblog $ bundle exec jekyll serve

# Now browse to http://localhost:4000
```
然后，你就按照文档走吧。。。

## 偷懒的做法
* `Fork` 我的 Notes 模板：[jekyll-tempalte](https://github.com/zhoukekestar/jekyll-template)
* 进入自己的项目并设置 Github Pages
  * 设置标签： ![](https://user-images.githubusercontent.com/7157346/27415325-0264cff0-5739-11e7-8d53-80681b36e639.png)
  * 开启 Github Pages ![](https://user-images.githubusercontent.com/7157346/27415355-2d1cf510-5739-11e7-96fc-c0567671211a.png)
* 然后你就可能访问你的blog系统了，域名为: `https://your-name.github.io/jekyll-template`

  比如，我建好的 `jekyll-template` 的地址是[https://zhoukekestar.github.io/jekyll-template/](https://zhoukekestar.github.io/jekyll-template/)
* 之后，修改blog样式之类的，你可以自己看[代码](https://github.com/zhoukekestar/jekyll-template)修改了

## 通过该方法搭建Blog的优势
* 灵活，强大，高效，定制
* 免费
* 免费
* 免费
