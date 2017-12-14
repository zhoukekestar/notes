---
layout: post
title:  "如何在 Mac 机上调试线上的 页面"
date:   2017-11-02
tags: [mac, debug]
commentIssueId: 64
---

额，线上的页面又在 IE 有错误？Mac 机上怎么破？

## 基础工作
* 安装 Charles
* 安装 VirtualBox & Windows

## Windows 上安装 Charles 证书并设置代理
* Mac 上导出证书 `Help` -> `SSL Proxying` -> `Save Charles Root Certificate`
  * 注意保存格式为 `cer`, 而不是 `pem`
    ![paste image](https://user-images.githubusercontent.com/7157346/32315016-532f74ac-bfe5-11e7-8869-b21ad86534d9.png)
    ![paste image](https://user-images.githubusercontent.com/7157346/32315314-972d395e-bfe6-11e7-8a62-f3aeae238bb7.png)


* 拖动证书至 Widnows 并安装
  * 注意选择将证书保存到根机构下
    ![root](https://user-images.githubusercontent.com/7157346/32314841-b512c472-bfe4-11e7-873f-c0a22537610a.png)
* 设置代理为 Mac 地址
  * 设置完代理后，IE 游览器记得重新启动一下
    ![proxy](https://user-images.githubusercontent.com/7157346/32314842-b6a8fca2-bfe4-11e7-9579-0cdac2c26476.png)

## 开启 Charles 进行抓包并做映射
* 查询需要进行代理的 url，右击进行映射即可
  ![map](https://user-images.githubusercontent.com/7157346/32314844-b88c67a2-bfe4-11e7-863d-f937433d1b3d.png)


## 如何抓 iOS 的包
[十分钟学会Charles抓包(iOS的http/https请求)](http://www.jianshu.com/p/5539599c7a25), 其中需要注意的是，在 iOS 上，安装完证书后，需要在 通用 -> 关于本机 -> 证书信任设置中 打开 根信息的开关
