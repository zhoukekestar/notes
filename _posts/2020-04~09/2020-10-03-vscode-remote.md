---
layout: post
title:  "VSCode 远程工作目录"
date:  2020-10-03
tags: [vscode]
---


通过在本地启动 Docker，然后按照 VSCode 的 Remote SSH 插件，连接本地 Docker 远程即可实现。


## Docker 模拟远程

#### 新建镜像

参考：

* https://cloud.tencent.com/developer/article/1081673
  * -t 为 tag 名称

```
$ mkdir centos-ssh
$ vi Dockerfile
```

文件内容如下：

```
FROM        centos
RUN         yum install -y openssh openssh-server openssh-clients
RUN         mkdir -p /var/run/sshd
RUN         ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
RUN         ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
RUN         /bin/echo 'root:aaaaaa' | chpasswd
RUN         /bin/sed -i 's/.*session.*required.*pam_loginuid.so.*/session optional pam_loginuid.so/g' /etc/pam.d/sshd
EXPOSE      22:2022
CMD         /usr/sbin/sshd -D
```



#### 构建镜像

```
$ docker build -t centos:ssh .
Sending build context to Docker daemon   2.56kB
Step 1/13 : FROM        centos
.......
.......
> fdf4bb7bff35
Step 13/13 : CMD         /usr/sbin/sshd -D
 ---> Running in 9b10ed40b8cb
Removing intermediate container 9b10ed40b8cb
 ---> 63d5d5935d99
Successfully built 63d5d5935d99
Successfully tagged centos:ssh
```



#### 运行镜像

```
$ docker run -d -p 22 centos:ssh
```



#### 登录

```
$ ssh root@127.0.0.1 -p 2020
```



## 设置 VSCode 远程



#### 安装插件

搜索 Remote SSH

![](https://img.alicdn.com/tfs/TB1xziTWRr0gK0jSZFnXXbRRXXa-2420-1072.png)



#### 连接远程

调出命令行，输入 `Remote-SSH: Connect to Host` 



#### 设置 sshconfig

```
# Read more about SSH config files: https://linux.die.net/man/5/ssh_config
Host local-docker
    User root
    HostName 127.0.0.1
    Port 2020
```



#### 连接远程

* 选择 local-docker
* 输入密码

* 选择文件夹，然后就能得到一个来自远程文件系统，但使用本地 vscode 的环节
  * 左下角的 SSH 为当前的连接状态
  * 新建文件之后，所有本地的 VSCode 插件都可以使用
  * 命令行是来自远程的，目录也是远程的

![](https://img.alicdn.com/tfs/TB1yYeykPMZ7e4jSZFOXXX7epXa-2048-1536.png)





## QA

* `error checking context: ‘can’t stat ‘/Users/usr/.Trash”.` 

  参考：https://igorkhromov.com/2020/06/25/error-checking-context-cant-stat-users-usr-trash

  新建目录，移动 Dockerfile 至新目录，再次运行即可

* 其他镜像使用：https://hub.docker.com/r/jdeathe/centos-ssh

  