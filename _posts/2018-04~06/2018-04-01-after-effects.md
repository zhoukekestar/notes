---
layout: post
title:  "SVG 动画 by After Effects"
date:   2018-04-01
tags: [note]
commentIssueId: 76
---

使用 Adobe After Effects 做前端网页的 SVG 动画
* 安装 AE & Bodymovin
* 创建 hello world 动画
* 使用 bodymovin 导出
* hello world demo


## 安装 AE & Bodymovin

* AE：进入 [AE 官网](https://www.adobe.com/cn/products/aftereffects.html) 免费试用即可

* bodymovin：进入adobe 插件官网即可 [bodymovin](https://www.adobeexchange.com/creativecloud.details.12557.html) ，这是一款 airbnb 推出的 svg 动画导出工具

  > 由于国内的 creative cloud 同步有点问题，需要使用离线安装方式，能用同步当然是最好

  * 点击使用其他方式安装

    ![](https://user-images.githubusercontent.com/7157346/38174349-9a968f6c-35fe-11e8-8485-00870a49650e.png)


  * 下载 xzp 包和 xzp installer，并安装插件

    ![](https://user-images.githubusercontent.com/7157346/38174363-ca6eabb6-35fe-11e8-8642-6caef79c7e3d.png)

    ​



## 创建 hello world 动画

打开 AE 并新建 composition

![](https://user-images.githubusercontent.com/7157346/38174565-d0694bea-3601-11e8-861e-926e8c72058e.png)



1. 新建文本
2. 输入文本
3. 即可看到新图层

![](https://user-images.githubusercontent.com/7157346/38174567-d0b55d5a-3601-11e8-81bd-179fdcf72f72.png)

1. 点击秒表图标激活关键帧
2. 在右侧时间轴上即可看到关键帧

![](https://user-images.githubusercontent.com/7157346/38174568-d1001aa2-3601-11e8-8488-6d3f8b79e5fb.png)

1. 拖动时间轴至任意时间
2. 拖动鼠标改变文本位置，会在时间轴上插入新的关键帧
3. 拖动鼠标改变文本大小
4. 可以看到场景中文本的新状态

![](https://user-images.githubusercontent.com/7157346/38174569-d14cd36a-3601-11e8-92df-43c72443a08b.png)

1. 拖动时间区间至合适的位置
2. 按空格即可预览动画

![](https://user-images.githubusercontent.com/7157346/38174570-d199998e-3601-11e8-989a-16cbdf08abb0.png)

## 使用 bodymovin 导出

在 window -> extensions -> bodymovin 中打开 boymovin 插件

![](https://user-images.githubusercontent.com/7157346/38174571-d1eab3b4-3601-11e8-9905-8457d062f84b.png)

在 Preferences -> General 中设置 allow scripts to write files and asscess network

![](https://user-images.githubusercontent.com/7157346/38174572-d235f5a4-3601-11e8-8a9e-b1fa4ed5f07b.png)

1. 选择 comp

2. 导出设置中把 demo 勾选上，为了能导出 html 文件，用游览器直接打开看到效果，不勾选的仅会导出 data.json

   2.1 勾选 demo

   2.2 保存

3. 选择输出路径

4. 点击 render 即可完成导出

![](https://user-images.githubusercontent.com/7157346/38174573-d28163c2-3601-11e8-9d98-16a48d77de9f.png)
![](https://user-images.githubusercontent.com/7157346/38174574-d2cc18b8-3601-11e8-9cb4-b50c7a07b5fa.png)



## 最后的 Hello World Demo

<iframe style='width: 100%; display: block; border: none; height: 500px;' src='https://zhoukekestar.github.io/notes/assets/2018/04-01-after-effects/demo.html'></iframe>