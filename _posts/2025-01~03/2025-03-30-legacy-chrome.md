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
