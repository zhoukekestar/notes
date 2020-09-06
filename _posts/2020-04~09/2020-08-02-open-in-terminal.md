---
layout: post
title:  "如何快速打开 iTerm"
date:  2020-08-02
tags: [tools]
---

* 新建 iTermHere.scpt 脚本
* 导出为应用
* 修改图标
* 拖拽至 Toolbar 即可

## 步骤

* 新建脚本文件 `iTermHere.scpt`，拷贝 [代码](http://hohonuuli.blogspot.com/2016/02/iterm2-version-3-open-iterm-here-script.html)

![](https://img.alicdn.com/tfs/TB1fNYqbsieb18jSZFvXXaI3FXa-2110-1120.png)



* 在 Finder 中使用 Script Editor 打开，并导出为应用

![](https://img.alicdn.com/tfs/TB1Y9yEP1L2gK0jSZPhXXahvXXa-1656-1048.png)



* 将其保存或拖拽到应用

![](https://img.alicdn.com/tfs/TB1lTiLPWL7gK0jSZFBXXXZZpXa-672-538.png)



* [修改 icon 图标](https://stackoverflow.com/questions/42815166/customize-applescript-app-icon)，我们使用 iTerm 的图标来显示即可，参考文章内容：
  * 我们分别打开 iTerm 和 iTermHere 的包内容（右击显示包内容即可）
  * 将图表拖拽到目标文件夹，然后修改名称为 `droplet.icns` 即可

![](https://img.alicdn.com/tfs/TB1o.u5b0Tfau8jSZFwXXX1mVXa-1902-818.png)



* 修改完图标之后，直接将 `iTermHere` 拖拽到 Toolbar 上即可



![](https://img.alicdn.com/tfs/TB13DCDPYY1gK0jSZTEXXXDQVXa-1872-686.png)





## 参考

* 脚本：http://hohonuuli.blogspot.com/2016/02/iterm2-version-3-open-iterm-here-script.html
* 修改图标：https://stackoverflow.com/questions/42815166/customize-applescript-app-icon

