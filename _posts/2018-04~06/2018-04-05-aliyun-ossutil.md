---
layout: post
title:  "Aliyun OSS ossutil notes"
date:   2018-04-05
tags: [note]
commentIssueId: 77
---

aliyun ossutil notes
* 下载 ossutil
* 使用 ossutil 创建 bucket
* 同步文件夹功能
* brew & tree 安装



## All OSS utils

下载 ossutil 

https://help.aliyun.com/document_detail/44075.html



## ossutil

设置用户信息并测试创建 bucket

```bash
$ mv ossutilmac64 ossutil
$ chmod +x ossutil
$ ./ossutil config 
输入 RAM key & secret
$ ./ossutil mb oss://zhoukekestar20180405test
0.288786(s) elapsed
```

到 oss 控制台查看，已创建成功

![](https://user-images.githubusercontent.com/7157346/38347769-0e85f4a2-38d0-11e8-9f41-0debde8a4db4.png)



## 同步文件夹

* 创建临时文件夹
* 使用 `./ossutil cp -r osstemp oss://zhoukekestar20180405test` 命令同步到 oss

```bash
➜  Downloads mkdir osstemp
➜  Downloads touch osstemp/a.txt
➜  Downloads ls osstemp
a.txt
➜  Downloads mkdir osstemp/bdir
➜  Downloads touch osstemp/bdir/b.txt
➜  Downloads tree osstemp
osstemp
├── a.txt
└── bdir
    └── b.txt

1 directory, 2 files
➜  Downloads ./ossutil cp -r osstemp oss://zhoukekestar20180405test
Succeed: Total num: 3, size: 0. OK num: 3(upload 2 files, 1 directories).
0.260253(s) elapsed

```

![](https://user-images.githubusercontent.com/7157346/38349456-c5fec1dc-38d9-11e8-911a-ba74b06636a0.png)



## Brew & tree 命令安装

```bash
➜  Downloads tree
zsh: command not found: tree
➜  Downloads brew install tree
zsh: command not found: brew
➜  Downloads /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew
...
➜  Downloads brew install tree
==> Downloading https://homebrew.bintray.com/bottles/tree-1.7.0.sierra.bottle.1.tar.gz
######################################################################## 100.0%
==> Pouring tree-1.7.0.sierra.bottle.1.tar.gz
🍺  /usr/local/Cellar/tree/1.7.0: 7 files, 113.3KB
➜  Downloads
```



## References

* [Mac中tree命令使用](https://segmentfault.com/a/1190000009962072)
* [ossutil 有关object的命令](https://help.aliyun.com/document_detail/50561.html?spm=a2c4g.11186623.6.1058.QSTipL)