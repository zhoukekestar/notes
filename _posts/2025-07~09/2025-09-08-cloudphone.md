---
layout: post
title:  "移动优先下的聚合搜索"
date:  2025-09-08
tags: [search]
---

  在 PC 时代，有网络搜索引擎帮忙做信息的整合和搜索，搜索引擎有相关的爬虫机制，将相关信息作索引，我们仅需通过搜索引擎，就能比较好地找到相关的信息。但在移动优先的时代下，各家平台的信息壁垒越垒越高，导致我们对信息的检索效率大大降低。本文探讨一种可行的机制，尝试打破这种壁垒，将各家平台信息重新做整合。

# UGC 的平台

  在 PC 时代，大家积极优化 SEO 不同，移动时代下，各自平台的信息，正在积极构建越来越高的壁垒。目前 UGC 平台中，用户量较大，内容产出质量较高的，有如下平台：

* 微信公众号
* 小红书
* 抖音/快手
* 微博
* B 站
* 其他有：知乎、今日头条、百度贴吧
* 海外有：youtube、tiktok

# 可能的方式

1、通过各个平台的搜索接口进行集成（难度较大，需加解密各自的算法）
2、通过自动化的方式，模拟人的输入来集成

# 模拟方式集成

  优势：相对稳定，风险较 API 小一些
  劣势：脚本后续的维护成本较高

### 技术方案

云手机 + AutoJS + 各自平台的脚本 + 网络反向代理

* 云手机，作为目前新兴的云计算资源，各大平台均已支持，包括阿里云、华为云、腾讯云、百度云。
  * 尝试了之后，首推阿里云-云影云手机（1.2元每 4 小时，支持原生 ADB 命令连接）
  * 华为云为 3 块钱每 1 小时，相对较贵
  * 百度云，有 500 元的充值门槛，直接放弃
* AutoJS
  * AutoJS：https://github.com/NEPDream/Auto.js-backup/releases
  * 用于跑自动化脚本，比较方便友好
* 网络反向代理
  * 由于云手机直连网络是云提供商的 IP，很有可能会被封 IP，所以，需要将出口 IP 换成自己家里的，避免封禁。
  * 此处可参考，v2ray 工具，https://toutyrater.github.io/app/reverse2.html


### 相关笔记

* adb 连接，需下载密钥对到本地 `～/.android` 目录，https://help.aliyun.com/zh/ecp/how-to-connect-cloud-phone-via-adb，然后阿里云上一键 ADB 即可。本地： `adb connect xx.xx.xx.xx:xx`
  * 网络不通的情况下，记得在一键 ADB 的页面，打开对应的安全组，把相关的 5555 端口给打开权限，否则默认的安全策略是不允许所有 IP 访问的。
* adb 命令
  * `adb install xx.apk`
* adb shell 命令
  * `pm list package` 列出所有包
  * `dumpsys package com.xingin.xhs | grep "Activity" | grep "com.xingin.xhs"` 找出小红书的启动 activity
  * `am start com.xingin.xhs/.routers.RouterPageActivity` 启动小红书
  * `getprop ro.product.cpu.abi` 获取要下载 arm8 还是 arm7，比如 `arm64-v8a`
* autojs
  * 相比 adb 命令，autojs 脚本仅需 `launchApp("小红书");` 即可启动小红书，相对简化许多。


# 其他

* 自动化导致账号被封禁或相关法律风险
* 尝试通过网络 filter 来获取相关结果
