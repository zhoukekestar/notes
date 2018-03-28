---
layout: post
title:  "debug web tips on native"
date:   2018-03-28
tags: [note]
commentIssueId: 75
---

## Debug iOS Web Page

* Mac Safari:
  * Safari -> Preferences -> Advanced -> Show Develop menu in menu bar
  * ![](https://user-images.githubusercontent.com/7157346/38006442-a1eccc70-3277-11e8-879c-0e983051ea58.png)
* iPhone
  * Settings -> Safari -> Advanced -> Javascript & Web Inspector
  * ![wechatimg88](https://user-images.githubusercontent.com/7157346/38006446-a2c7cb9a-3277-11e8-9b04-e315c5b476df.jpeg)
* 在 iOS 上通过 Safari 打开页面，即可在 Mac 上使用 Develop 按钮调试

![](https://user-images.githubusercontent.com/7157346/38006443-a235efcc-3277-11e8-87a8-928adcb9c9d2.png)
![](https://user-images.githubusercontent.com/7157346/38006444-a27f69c2-3277-11e8-98ba-066abd2d0edc.png)


## Debug Android Web Page

* 打开开发者模式

  * 如小米参考： https://jingyan.baidu.com/article/425e69e602008cbe15fc161b.html
* 打开 USB debugging
* 手机通过数据线连接
* PC Chrome 打开 `chrome://inspect` 页面
* Android 游览器打开页面 （用 系统游览器或 chrome 都可以）
* 一切正常的话，能看到 Chrome 和 webview 的网页

![](https://user-images.githubusercontent.com/7157346/38006822-2672c3ae-3279-11e8-9b51-c6be27e9976b.png)

* 点击 inspect 即可正常调试页面
* ![](https://user-images.githubusercontent.com/7157346/38006824-26b822fa-3279-11e8-8cf1-bbd1c5249d74.png)
* 页面也可通过控制台的更多 ->  Remote devices 打开

![](https://user-images.githubusercontent.com/7157346/38006825-270cb1ee-3279-11e8-98e4-a2a0ba9e4db0.png)

