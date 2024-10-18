---
layout: post
title:  "docker 技巧"
date:  2024-10-18
tags: [system]
---

  包括镜像加速、切换 CPU 架构、安装源加速

# 镜像加速

  切换镜像地址，如

```dockerfile
FROM ubuntu:22.04
```

  切换为：

```dockerfile
FROM mirror.gcr.io/ubuntu:22.04
```

# 切换 CPU 架构

  默认跟随系统，但涉及较多 gcc、linux 构建时，建议切换到 x86，如：

```dockerfile
FROM ubuntu:22.04
```

切换为：

```dockerfile
FROM --platform=linux/amd64 ubuntu:22.04
```

# 加速源

  因为国内的镜像源一般不太全，猜测是根据同步源的机器指定不同 CPU 同步的。所以拆分 ARM 和 AMD64/x86

### ARM

  ARM 参考 https://developer.aliyun.com/mirror/ubuntu-ports/

  * 有 arm64 目录，无 x86 目录
  * 参考：https://mirrors.aliyun.com/ubuntu-ports/dists/jammy/main/


  Shell 命令：

```sh
$ cat > /etc/apt/sources.list << "EOF"
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-backports main restricted universe multiverse
EOF
```

  Docker 命令，参考：
* https://stackoverflow.com/questions/77191591/dockerfile-run-command-cannot-use-heredoc-with-build-args
* https://www.docker.com/blog/introduction-to-heredocs-in-dockerfiles/

```dockerfile
COPY <<EOF /etc/apt/sources.list
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-backports main restricted universe multiverse
EOF
```

### AMD64/x86

  x86 参考：https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/

  * 有 ADM64 和 i386 目录，无 ARM 目录，
  * 参考：https://mirrors.tuna.tsinghua.edu.cn/ubuntu/dists/jammy/main/


  Shell 命令：

```sh
$ cat > /etc/apt/sources.list << "EOF"
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
EOF
```

Docker 命令：

```dockerfile
COPY <<EOF /etc/apt/sources.list
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
EOF
```


# 完整实例

### AMD64

```dockerfile
FROM --platform=linux/amd64 mirror.gcr.io/ubuntu:22.04

COPY <<EOF /etc/apt/sources.list
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
EOF

RUN apt-get update
```

### ARM

```dockerfile
FROM --platform=linux/arm64 mirror.gcr.io/ubuntu:22.04

COPY <<EOF /etc/apt/sources.list
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu-ports/ jammy-backports main restricted universe multiverse
EOF

RUN apt-get update
```
