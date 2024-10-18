---
layout: post
title:  "可启动的最小内核测试"
date:  2024-10-16
tags: [system]
---

在 ARM 机器上（Apple M1），通过 Docker 构建一个最小化的内核系统（打印 Hello World），使用 GRUB 来做引导，最终生成一个 iso 文件。

最终的效果为，通过 CD-ROM 启动机器，并能在屏幕上打印 Hello World。

# QuickStart

```sh
$ qemu-system-x86_64 -cdrom os.iso
```

![image](https://github.com/user-attachments/assets/1b05bc8a-f707-4927-93d9-1f40156abbf0)


# 构建环境

### Docker（简易方式）

简易方式，通过 Dockerfile 构建镜像，已适配国内加速。

```sh
$ docker build -t bootable-compiler-amd64 .
```

### Docker（分步骤）

##### 运行 Docker：

```sh
$ docker run --rm -it --platform linux/amd64 mirror.gcr.io/ubuntu:22.04
```

* `--rm` 关闭容器后，自动删除容器，避免每次启动 + 关闭后，有一堆的容器列表
* `-it` 是 `--interactive` 和 `--tty` 的组合，创建一个能和 docker 交互的终端命令行界面
* `--platform linux/amd64` 目的是运行 `x86` 架构的镜像，默认跟随系统，如 Apple M1 默认为 ARM
  * 为了后续构建、运行 x86 的系统方便，需指定此平台类型。
  * 参考 [Run x86 (Intel) and ARM based images on Apple Silicon (M1) Macs?](https://forums.docker.com/t/run-x86-intel-and-arm-based-images-on-apple-silicon-m1-macs/117123)
* `mirror.gcr.io/ubuntu:22.04` 为镜像名称，为避免国内的较差的网速，通过 `mirror.gcr.io` 进行加速。


##### 安装构建工具（docker 环境中）

    参考 [intermezzos](https://intermezzos.github.io/book/first-edition/linux.html) 的指南。

```sh
$ apt-get install nasm xorriso qemu build-essential

# 安装 grub-mkrescue 工具
$ apt-get install grub2-common

# 为了解决 Could not read from CDROM (code 0009)
# 参考：https://intermezzos.github.io/book/first-edition/appendix/troubleshooting.html#could-not-read-from-cdrom-code-0009
$ apt-get install grub-pc-bin
```

##### 创建并保存当前容器

为了保存当前容器，方便后续继续使用（因为加了 `--rm` 命令，所以需要保持当前容器，并新开终端执行）。

```sh
# 显示容器列表
$ docker ps

# 通过刚刚显示的 container id，进行提交保存，名称为 bootable-compilter-amd64
# 比如：docker commit 0b27d34a970d bootable-compiler-amd64
$ docker commit <container-id> bootable-compiler-amd64
```

# 构建

### 启动 docker 编译

```sh
# 运行，并挂载当前 git 项目目录到 docker 的 /home 目录
$ docker run -it --rm -v .:/home bootable-compiler-amd64
```

### 构建

```sh
$ nasm -f elf64 multiboot_header.asm
$ nasm -f elf64 boot.asm
$ ld --nmagic --output=kernel.bin --script=linker.ld multiboot_header.o boot.o
$ grub-mkrescue -o os.iso isofiles
```

### 运行测试

```sh
qemu-system-x86_64 -cdrom os.iso
```

# References

* [源码 bootable-minimized-os](https://github.com/zhoukekestar/bootable-minimized-os)
* [intermezzos](https://intermezzos.github.io/book/first-edition/hello-world.html)

