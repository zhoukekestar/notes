---
layout: post
title:  "Use cygwin to do cron task"
date:   2017-08-29
tags: [windows]
commentIssueId: 52
---

本文使用 `cygwin` 来模拟 `linux` 环境，从而使用 `cron` 和 `curl` 命令来定时触发相应的接口
* 安装 cygwin
* 安装 cron, curl
* cron 简介
* 启动/关闭 cron
* 安装 windows 服务

## 安装 cygwin

进入 [cygwin官网](https://cygwin.com/install.html) ，下载对应的版本（我的是 `win10` 系统，所以下载了 `64位`的 `cywin`）即可。

* 建议安装目录选择除 `C` 盘外的<br>
  ![tim 20170829115127](https://user-images.githubusercontent.com/7157346/29803793-d46459f6-8cb0-11e7-8751-a80359360c03.png)
* 建议安装包的目录选择与安装目录相同的路径<br>
  ![tim 20170829115135](https://user-images.githubusercontent.com/7157346/29803794-d4926c38-8cb0-11e7-93ee-d33feb05679b.png)

## 安装 cron, curl
* 搜索 `cron`
* 点击展开 `Net`
* 点击 `循环的那个图标`，然后会从 `Skip`(跳过安装，即不安装)，变成对应的版本号，（图中因为我安装过了，所以是 `keep`(保持，不变动).
* 然后 `curl` 也是同样的操作
* 安装完成后，你可以分别输入 `crontab` 和 `curl` 来验证是否安装成功。
![tim 20170829115313](https://user-images.githubusercontent.com/7157346/29803795-d4b817b2-8cb0-11e7-85c4-1225e2fe5e67.png)

## cron 简介

相关教程：[Linux crontab命令](http://www.runoob.com/linux/linux-comm-crontab.html)

* 输入 `crontab -e` 来编辑定时任务
* 输入 `crontab -l` 来显示定时任务
* 因为此处涉及到 `vi` 编辑器的相关知识和内容，此处提供一个简便方法
  * 在安装目录`D:\ProgramFiles\cygwin\var\cron\tabs\你的用户名`中的文件就是 `crontab` 需要编辑的文件，所以，直接编辑吧！比如：每分钟访问`http://localhost:3014/favicon.ico`

    ```
    # DO NOT EDIT THIS FILE - edit the master and reinstall.
    # (/tmp/crontab.L5s1nX2vSi installed on Tue Aug 29 11:05:36 2017)
    # (Cron version V5.0 -- $Id: crontab.c,v 1.12 2004/01/23 18:56:42 vixie Exp $)

    * * * * * curl http://localhost:3014/favicon.ico
    ```

## 启动 / 关闭 cron

启动 cron
* 运行 `/usr/sbin/cron` 即可

关闭 cron
* 通过 `ps` 查看进程名和 ID
* `kill xxx` 即可

## 安装 windows 服务
> 该步骤仅需在 windows 服务器才需要，自己开发测试只需要使用 '/usr/sbin/cron' 启动即可<br>
安装和卸载 windows 服务时，需要以管理员模式打开终端

参考：[利用cygwin创建windows下的crontab定时任务](http://www.cnblogs.com/Li-Cheng/p/4394225.html)

* 安装 `cygrunsrv`，通过 `cygwin` 的安装程序 `setup.exe` 即可安装，与安装 `cron` 类似
* 将 `cron` 安装为 `windows` 服务。`cygrunsrv -I cron -p /usr/sbin/cron -a -n`
  网上有些文章中命令格式为: cygrunsrv -I cron -p /usr/sbin/cron -a -d，可能是因为cron版本不同。
  * cygrunsrv参数说明：
    * -I: 安装服务
    * -R:删除服务
    * -S:启动服务
    * -E:停止服务
    * -Q:查询服务
    * -L:显示所有服务
  * 安装服务的参数:
    * -p:指定服务程序路径
    * -a:指定服务程序命令参数
    * -e:指定服务程序的环境变量
    * -d:服务的显示名称
* 启动cron服务 `cygrunsrv -S cron`

## References
* [利用cygwin创建windows下的crontab定时任务](http://www.cnblogs.com/Li-Cheng/p/4394225.html)
* [Linux crontab命令](http://www.runoob.com/linux/linux-comm-crontab.html)
