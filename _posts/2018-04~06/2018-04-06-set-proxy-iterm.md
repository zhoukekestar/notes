---
layout: post
title:  "Set proxy for iTerm2"
date:   2018-04-06
tags: [note]
commentIssueId: 77
---

Set proxy for iTerm2, eg: you got error when do some stuff like `curl https://gist.github.com/xxx`
* export http_proxy
* unset export
* alias shortcuts

## export http_proxy


```bash
➜  admin git:(master) curl https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
curl: (7) Failed to connect to gist.github.com port 443: Operation timed out
➜  admin git:(master)
➜  admin git:(master) export http_proxy=http://127.0.0.1:1087
➜  admin git:(master) export https_proxy=$http_proxy
➜  admin git:(master) export
ZSH=/Users/zhoukeke/.oh-my-zsh
http_proxy=http://127.0.0.1:1087
https_proxy=http://127.0.0.1:1087
➜  admin git:(master) curl https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
  <link rel="dns-prefetch" href="https://assets-cdn.github.com">
  <link rel="dns-prefetch" href="https://avatars0.githubusercontent.com">
  <link rel="dns-prefetch" href="https://avatars1.githubusercontent.com">
  <link rel="dns-prefetch" href="https://avatars2.githubusercontent.com">
....
```



## unset export

```bash
unset http_proxy https_proxy
```



## Alias

```bash
$ vi ~/.bash_profile
$ // 复制以下内容
alias goproxy='export http_proxy=http://127.0.0.1:1087 https_proxy=http://127.0.0.1:1087'
alias disproxy='unset http_proxy https_proxy'
$ source ~/.bash_profile
```



## References

* [给 iTerm 终端设置代理](http://honglu.me/2015/11/06/%E7%BB%99iTerm%E7%BB%88%E7%AB%AF%E8%AE%BE%E7%BD%AE%E4%BB%A3%E7%90%86/)
* 关于 vi clipboard 的共用可参考：[vi 快捷键](https://zhoukekestar.github.io/notes/2018/01/23/vi-guide.html)