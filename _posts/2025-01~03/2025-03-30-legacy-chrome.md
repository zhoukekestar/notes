---
layout: post
title:  "安装老版本 chrome"
date:  2025-03-30
tags: [tool]
---

接着上篇 [selenium](https://zhoukekestar.github.io/notes/2025/03/29/selenium.html) 的介绍，发现 chrome 版本没有想象中的那么全。所以，简单记录一下老版本的 chrome docker 版本。

# 安装

参考 [how-do-i-install-a-specific-version-of-chrome-in-a-dockerfile](https://stackoverflow.com/questions/56840476/how-do-i-install-a-specific-version-of-chrome-in-a-dockerfile)，可以选择 deb 包来进行制定版本的安装。

### 版本号确认

* [ubuntu 的包更新来确认](https://www.ubuntuupdates.org/package/google_chrome/stable/main/base/google-chrome-stable?id=202706&page=1)
* [镜像站点来确认](https://mirror.cs.uchicago.edu/google-chrome/pool/main/g/google-chrome-stable/)

### 下载

比如：CHROME_VERSION 为 `71.0.3578.98-1`

* 通过官方拼接下载：`https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb`
* 通过镜像拼接下载：`https://mirror.cs.uchicago.edu/google-chrome/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb`

### 安装

  使用 apt 命令安装即可

```sh
$ apt-get install -y ./google-chrome-stable_${CHROME_VERSION}_amd64.deb
```

# Dockerfile


###  加速

```dockerfile
#### https://mirrors.tuna.tsinghua.edu.cn/help/debian/
# deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware
# deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware
# deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware
# deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bookworm-security main contrib non-free non-free-firmware
COPY ./mirror /etc/apt/sources.list
```

```dockerfile
FROM --platform=linux/amd64 debian:bullseye

# https://developer.aliyun.com/mirror/debian/
RUN echo "deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib\n\
deb http://mirrors.aliyun.com/debian-security/ bullseye-security main\n\
deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib\n\
deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib\n\
" > /etc/apt/sources.list
```

PS:
* heredocs 不支持 colima，https://zhoukekestar.github.io/notes/2025/03/25/colima.html

### 中文支持

```dockerfile
RUN apt-get update
# install utf8 fonts
RUN apt-get install -y xfonts-unifont fonts-unifont
```


### dbus 支持

```dockerfile
# https://github.com/puppeteer/puppeteer/blob/main/docker/Dockerfile
RUN apt-get install -y dbus dbus-x11
ENV DBUS_SESSION_BUS_ADDRESS autolaunch:

# https://github.com/puppeteer/puppeteer/issues/11900#issuecomment-2442350212
COPY ./start.sh /app/start.sh
CMD ["/app/start.sh"]
```

start.sh

```sh
#!/usr/bin/env sh
set -e

# In your startup script, start the dbus daemon with the default system config.
echo "dbus"
dbus-daemon --system

# Then, set up and run your app...
/app/entrypoint.sh
```


# 运行

```sh
# 构建并启动
docker build --tag chrome71 . && docker run -it --rm -p 8080:8080 --name chrome71 chrome71:latest

# 进入 shell
docker exec -it chrome71 bash
```

# M1 Mac

colima 启动记得加 `--arch x86_64`, 如：`colima start x86 --arch x86_64 --vm-type=vz --mount-type=virtiofs`
否者 docker 中虽然指定了 `--paltform=linux/amd64`，编译能过，但跑不起来，https://github.com/microsoft/playwright/issues/17395#issuecomment-2768337664

# 完整 dockerfile

```dockerfile
FROM --platform=linux/amd64 swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/theasp/novnc:latest

# chrome 目前仅支持 amd64，不支持 arm64，https://github.com/microsoft/playwright/issues/17395#issuecomment-1250830493
# 所以，docker 构建需要使用 amd64，colima 跑 docker 也需要使用 --arch x86_64
# https://github.com/theasp/docker-novnc/blob/master/Dockerfile

# 加速配置：https://developer.aliyun.com/mirror/debian/
RUN echo "deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib\n\
deb http://mirrors.aliyun.com/debian-security/ bullseye-security main\n\
deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib\n\
deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib\n\
" > /etc/apt/sources.list

# 安装下载工具，及对 utf8 等中文显示支持
RUN apt-get update
RUN apt-get install -y \
        wget \
        fonts-unifont

# Download and install Google Chrome
ENV CHROME_VERSION=71.0.3578.98-1
# ENV CHROME_VERSION=79.0.3945.117-1
# ENV CHROME_VERSION=81.0.4044.113-1
# ENV CHROME_VERSION=90.0.4430.212-1
# ENV CHROME_VERSION=100.0.4896.127-1

RUN wget -q https://systemjs-dev.1688.com/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb
RUN apt-get install -y ./google-chrome-stable_${CHROME_VERSION}_amd64.deb

# 启动 chrome
RUN echo "[program:google-chrome-stable]\n\
command=google-chrome-stable --disable-gpu --disable-software-rasterizer --disable-dev-shm-usage --no-sandbox --disable-gpu-sandbox --in-process-gpu\n\
autorestart=true\n\
" > /app/conf.d/chrome.conf

# 配置屏幕大小，1688 用户分辨率占比最多的大小
ENV DISPLAY_WIDTH=1920 \
    DISPLAY_HEIGHT=1080


# 更新到最新的novnc 版本
# 修复剪切板 utf8 编码问题
RUN cd /usr/share/novnc && wget -q https://github.com/zhoukekestar/noVNC/archive/refs/tags/v1.6.2.tar.gz && tar -zxvf v1.6.2.tar.gz


# xclip -o | base64 --decode | xclip  -selection clipboard
EXPOSE 8080
```


# 简化后且支持 UTF8 的版本

```dockerfile
FROM --platform=linux/amd64 debian:bullseye

# chrome 目前仅支持 amd64，不支持 arm64，https://github.com/microsoft/playwright/issues/17395#issuecomment-1250830493
# 所以，docker 构建需要使用 amd64，colima 跑 docker 也需要使用 --arch x86_64，否者会出现编译能过，运行时报错的情况

# 加速配置：https://developer.aliyun.com/mirror/debian/
RUN echo "deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib\n\
deb http://mirrors.aliyun.com/debian-security/ bullseye-security main\n\
deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib\n\
deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib\n\
" > /etc/apt/sources.list

# 安装基础工具
# tigervnc、fluxbox 窗口管理工具、novnc 浏览器vnc支持、fonts-unifont utf8 等中文显示支持
RUN apt-get update
RUN apt-get install -y \
        bash \
        wget \
        fonts-unifont \
        fluxbox \
        novnc \
        tigervnc-standalone-server

# 从 CDN 上下载不同版本的 Chrome 并安装，目前已覆盖以下版本
ENV CHROME_VERSION=71.0.3578.98-1
# ENV CHROME_VERSION=79.0.3945.117-1
# ENV CHROME_VERSION=81.0.4044.113-1
# ENV CHROME_VERSION=90.0.4430.212-1
# ENV CHROME_VERSION=100.0.4896.127-1

RUN wget -q https://systemjs-dev.1688.com/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb
RUN apt-get install -y ./google-chrome-stable_${CHROME_VERSION}_amd64.deb


# 更新 novnc 版本，并指定 8080 的默认页面
RUN wget -q https://systemjs-dev.1688.com/google-chrome-stable/noVNC-1.6.0.tar.gz
RUN tar -zxvf noVNC-1.6.0.tar.gz -C /usr/share/novnc
RUN echo "<script>location.href = '/noVNC-1.6.0/vnc.html?autoconnect=1'</script>" > /usr/share/novnc/index.html

# 清理工作
RUN rm -rf ./google-chrome-stable_${CHROME_VERSION}_amd64.deb noVNC-1.6.0.tar.gz
RUN rm -rf /var/lib/apt/lists/*
RUN apt clean

# 设置默认显示器 :0
# 设置 VNC 端口 5900
# 设置 NOVNC 端口 8080
# 设置显示器分辨率 1920x1080
ENV DISPLAY=:0 \
    VNC_PORT=5900 \
    NO_VNC_PORT=8080 \
    GEOMETRY=1920x1080

# 启动设置
WORKDIR /root
COPY start.sh /root/start.sh
CMD ["/root/start.sh"]
```


# 其他

* 不管是 selenium 还是手动安装 deb，首次启动 chrome 都比较慢，这个问题待排查
* novnc 的剪切板对中文支持不够，目前仅能通过手动 base64 来绕过，有些麻烦，novnc 也没有支持的打算

