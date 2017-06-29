---
layout: post
title:  "Shadowsocks on EC2"
date:   2017-06-29
tags: [vpn]
commentIssueId: 29
---

咳~
* 又上不了网了
* 我的`Github`好慢
* 花钱买的服务，又叒又和谐了<br>
于是我毅然决定搭个自己VPN（虽然这些理由貌似有点牵强）！<br>
文章主要介绍如何在`EC2`上搭建自己的`shadowsocks`服务器。


## 准备工作
* 下载shadowsocks客户端，[进入下载页](https://github.com/shadowsocks/shadowsocks/wiki/Shadowsocks-%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)
  * [shadowsocks for windows](https://github.com/shadowsocks/shadowsocks-windows/releases)
  * [shadowsocks for OSX](https://github.com/shadowsocks/shadowsocks-iOS/releases)

  * [其他客户端，包括Android, iOS](https://github.com/shadowsocks/shadowsocks/wiki/Shadowsocks-%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)
* 下载[cmder](http://cmder.net/), 因为windows自带终端没有`ssh`命令，（Linux和Mac用户自动忽略）
* 下载[Proxy-SwitchySharp](http://pan.baidu.com/s/1c6d8ho)，用于切换代理服务器。或自己在Chrome商家中搜索下载

## 创建EC2服务器并连接
* 各种亚马逊云的注册步骤省略
* 创建EC2
  ![ec2-1](https://user-images.githubusercontent.com/7157346/27674521-bf21a236-5cd8-11e7-8665-44ae6bc9c025.png)

* 勾选免费试用
  ![ec2-2](https://user-images.githubusercontent.com/7157346/27674522-c00f7808-5cd8-11e7-80ce-9f3cabfc3370.png)

* 选择服务器
  ![ec2-3](https://user-images.githubusercontent.com/7157346/27674525-c156939a-5cd8-11e7-83d3-3e0e91354283.png)

* 开启
  ![ec2-4](https://user-images.githubusercontent.com/7157346/27674529-c27a034c-5cd8-11e7-9256-02ccb6a5f825.png)
* 创建并下载密钥，点击下载的时候，就会有一个`server-key.pem`文件下载到本地计算机上
  ![down-key](https://user-images.githubusercontent.com/7157346/27674565-e2a944de-5cd8-11e7-90f1-55a505b2b7a0.png)
* 使用终端连接服务器(打开cmder), `ssh -i "your.pem" yourserver`, 如：`ssh -i "server-key.pem" ec2-user@ec2-52-53-248-165.us-west-1.compute.amazonaws.com`
  ![tim 20170629140737](https://user-images.githubusercontent.com/7157346/27674582-f0eb7080-5cd8-11e7-8b48-4cb02ec4e82c.png)

## 安装shadowsocks服务器
* `sudo -s`, 获取超级权限
* `yum install python-setuptools && easy_install pip`, 安装`python`
* `pip install shadowsocks`, 安装`shadowsocks`
* `vi /etc/shadowsocks.json`, 编辑shadowsocks
  * 输入`i`, 插入
  * 复制一下文件，（修改password为你的密码）
  ```json
  {
    "server":"0.0.0.0",
    "port_password": {
      "8383":"password1",
      "8384":"password2",
      "8385":"password3"
    },
    "timeout":600,
    "method":"aes-256-cfb"
  }
  ```
  * 按`ESC`键，输入`wq`, 保存并退出
* `export PATH=/usr/local/bin:$PATH` 设置Path路径，
  > 因为我们选的`Amazon Linux AMI`镜像没有把`/usr/local/bin`设置到`Path`下，所以需要这一步，如果选择其他镜像的，可能不需要这一步

* `ssserver -c /etc/shadowsocks.json -d start`，启动服务器。

  ```
  启动：ssserver -c /etc/shadowsocks.json -d start
  停止：ssserver -c /etc/shadowsocks.json -d stop
  重启：ssserver -c /etc/shadowsocks.json -d restart
  查看状态：ssserver -c /etc/shadowsocks.json -d status
  ```

#### 所有命令记录
```sh
[ec2-user@ip-172-31-8-13 ~]$ sudo -s

[root@ip-172-31-8-13 ec2-user]# yum install python-setuptools && easy_install pip
Loaded plugins: priorities, update-motd, upgrade-helper
...
Complete!
Searching for pip
Best match: pip 6.1.1
Adding pip 6.1.1 to easy-install.pth file
Installing pip script to /usr/local/bin
Installing pip2.7 script to /usr/local/bin
Installing pip2 script to /usr/local/bin

Using /usr/lib/python2.7/dist-packages
Processing dependencies for pip
Finished processing dependencies for pip

[root@ip-172-31-8-13 ec2-user]# pip install shadowsocks
You are using pip version 6.1.1, however version 9.0.1 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
Collecting shadowsocks
  Downloading shadowsocks-2.8.2.tar.gz
Installing collected packages: shadowsocks
  Running setup.py install for shadowsocks
Successfully installed shadowsocks-2.8.2

[root@ip-172-31-8-13 ec2-user]# vi /etc/shadowsocks.json

[root@ip-172-31-8-13 ec2-user]# echo $PATH
/sbin:/bin:/usr/sbin:/usr/bin:/opt/aws/bin

[root@ip-172-31-8-13 ec2-user]# ls /usr/local/bin
pip  pip2  pip2.7  sslocal  ssserver

[root@ip-172-31-8-13 ec2-user]# export PATH=/usr/local/bin:$PATH

[root@ip-172-31-8-13 ec2-user]# ssserver -c /etc/shadowsocks.json -d start
INFO: loading config from /etc/shadowsocks.json
2017-06-29 06:29:40 INFO     loading libcrypto from libcrypto.so.10
started
[root@ip-172-31-8-13 ec2-user]#
```

## 设置EC2防火墙
* 实例列表中，最后一列安全组
  ![tim 20170629143106](https://user-images.githubusercontent.com/7157346/27674712-64af1a80-5cd9-11e7-8fa8-f271d667298e.png)

* 设置入网规则
  ![tim 20170629143247](https://user-images.githubusercontent.com/7157346/27674713-656c4880-5cd9-11e7-8788-babdfa2afb9e.png)


## 开启shadowsocks并连接
* 打开`shadowsocks`客户端，设置服务器地址，端口，密码
  ![tim 20170629144119](https://user-images.githubusercontent.com/7157346/27674725-79b35f54-5cd9-11e7-9cb3-63662cf32047.png)
* 设置`SwitchySharp`的代理，设置为本地`127.0.0.1:：1080`
  ![tim 20170629143443](https://user-images.githubusercontent.com/7157346/27674779-c02d61c8-5cd9-11e7-9509-8ca700e9a7ab.png)
* 选择`私人VPN`，开启网络之旅。如果要上国内网站，可选择`Direct Connection`，这样不走代理会更快。
  ![tim 20170629143712](https://user-images.githubusercontent.com/7157346/27674787-c8aa8998-5cd9-11e7-99f5-3d0c4cb7d78a.png)


## 参考
* [【已解决】连接不上服务器，Error: connect ETIMEDOUT 。](
https://github.com/shadowsocks/shadowsocks/issues/133)
* [亚马逊EC2搭建Shadowsocks](http://www.jianshu.com/p/640417385175)
* [Gist 笔记](https://gist.github.com/zhoukekestar/3d58eee766f750a3c059366308d6ec08)
