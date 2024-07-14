---
layout: post
title:  "VNC 控制 Docker Chrome"
date:  2024-07-14
tags: [tool]
---

  在 Docker 中运行 Chrome 并使用 VNC 远程控制。

# 安装镜像

  测试安装镜像

### nkpro/chrome-vnc

* [https://hub.docker.com/r/nkpro/chrome-vnc](https://hub.docker.com/r/nkpro/chrome-vnc)

  因为国内网络问题，需要走镜像拉取：

```sh
$ docker pull mirror.gcr.io/nkpro/chrome-vnc
```

### siomiz/chrome

* [https://github.com/siomiz/chrome](https://github.com/siomiz/chrome)

因为 mirror.gcr.io 出现网络错误，放弃之后使用离线方案下载 [wukongdaily/DockerTarBuilder](https://github.com/wukongdaily/DockerTarBuilder)

下载完成后，使用 `docker load` 进行加载，注意其中可能有多层压缩（zip -> tar.gz -> tar），需要解压直到最后一层的 tar 文件才行。

```sh
$ docker load --input siomiz_chrome-amd64.tar
c5ff2d88f679: Loading layer  80.33MB/80.33MB
01069ebee988: Loading layer  10.75kB/10.75kB
ee1a62390f51: Loading layer  303.1MB/303.1MB
b85e9454510a: Loading layer  111.9MB/111.9MB
6506e72a6e5e: Loading layer  782.3MB/782.3MB
718f726f2283: Loading layer  376.3kB/376.3kB
5f70bf18a086: Loading layer  1.024kB/1.024kB
Loaded image: siomiz/chrome:latest
```


# 两种镜像对比



![WX20240714-163708@2x](https://github.com/user-attachments/assets/2ff130d7-6547-42d9-92b1-6af8d444952f)

* nkpro/chrome-vnc
  * 体积更小
  * 但对中文支持不好
  * 操作需要启动浏览器并选择启动程序

![WX20240714-163607@2x](https://github.com/user-attachments/assets/1ee04177-c993-42ef-a60b-26184c2ef956)


* siomiz/chrome
  * 体积较大
  * 支持中文
  * 直接启动浏览器，无其他操作系统 UI

![WX20240714-163427@2x](https://github.com/user-attachments/assets/141ae867-cbc3-40ff-adaf-e63b1438746c)


# 实现方式

### puppeteer screenshot 实现

  之前有想过用类似 [dosyago/puppetromium](https://github.com/dosyago/puppetromium/blob/main/src/index.js) 的方案来实现，本人也简单写过相关项目，通过显示图片（screenshot），然后用 x、y 的鼠标坐标和简单的键盘输入，基本能做到相对的控制。

  问题是不成体系，没有较为完整的协议体系来支持。


### VNC

  [VNC](https://en.wikipedia.org/wiki/Virtual_Network_Computing) 是 Virtual Network Computing 的简称，能远程控制计算机。相对更为底层些，并无明显的输入和控制限制了。

  VNC 协议可以用于 VNC Viewser 的远程显示和控制。

  ![](https://www.umsl.edu/~eckerta/vnc_docs/Xvnc.gif)

  VNC Server 目前比较著名是 [X Window System](https://en.wikipedia.org/wiki/X_Window_System) 简称 X，其发展至今的 X11 已

  ![WX20240714-172429@2x](https://github.com/user-attachments/assets/7039b0ff-a0f1-4911-ab2f-4671b824ee7e)

  Linux 中，相关图形应用程序，通过 x11 协议将视图指令传给 xvnc，然后 xvnc 将其视图转为 Remote Frame Buffer protocol (RFB) ，远程的 VNC Viewer 通过接收 RFB，然后将其转为 x11 协议传给 xserver 绘制，且接受来自远程的键盘、鼠标等输入，与远程服务器交互。

# References

* [https://www.umsl.edu/~eckerta/vnc_docs/xvnc.html](https://www.umsl.edu/~eckerta/vnc_docs/xvnc.html)
* [VNC ARCHITECTURE BASED REMOTE DESKTOP ACCESS THROUGH ANDROID MOBILE PHONES](https://ijarcce.com/wp-content/uploads/2012/05/VNC-ARCHITECTURE-BASED-REMOTE-DESKTOP-ACCESS-THROUGH-ANDROID-MOBILE-PHONES.pdf)
