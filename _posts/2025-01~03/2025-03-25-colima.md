---
layout: post
title:  "colima QuickStart"
date:  2025-03-25
tags: [tool]
---

使用 colima 替代 limactl

# colima

limactl 使用还是比较麻烦，推各种搜索，推荐使用 colima。

```sh
$ rm -rf ~/.docker
$ rm -rf ~/.lima

$ brew install colima
$ brew install docker docker-compose
```

# 启动

colima volumes 文件写入权限问题，参考：

* https://github.com/langgenius/dify/issues/4126
* https://github.com/abiosoft/colima/issues/1067#issuecomment-2231475199

所以，需要指定一下 vm-type 和 mount-type

```sh
# 默认是 sshfs，会导致 volumes 的权限有问题
$ colima start --mount-type=virtiofs

# 权限写入测试
$ mkdir test
$ docker run -v ./test:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password postgres:15-alpine
```

# 镜像加速

这也是我替换 limactl 到 colima 的原因，因为国内环境问题，需要配置相关镜像地址，所以：

```sh
$ vi ~/.colima/default/colima.yaml 
```

### 修改 docker 配置为以下内容：

```yaml
docker:
  insecure-registries:
    - yum.tbsite.net
  registry-mirrors:
    - http://yum.tbsite.net/mirrors/
    - https://docker.m.daocloud.io
    - https://hub-mirror.c.163.com
    - https://mirror.baidubce.com
    - https://your_preferred_mirror
    - https://dockerhub.icu
    - https://docker.registry.cyou
    - https://docker-cf.registry.cyou
    - https://dockercf.jsdelivr.fyi
    - https://docker.jsdelivr.fyi
    - https://dockertest.jsdelivr.fyi
    - https://mirror.aliyuncs.com
    - https://dockerproxy.com
    - https://mirror.baidubce.com
    - https://docker.m.daocloud.io
    - https://docker.nju.edu.cn
    - https://docker.mirrors.sjtug.sjtu.edu.cn
    - https://docker.mirrors.ustc.edu.cn
    - https://mirror.iscas.ac.cn
    - https://docker.rainbond.cc
```
