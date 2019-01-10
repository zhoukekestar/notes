---
layout: post
title:  "Bash Profile 整理"
date:  2019-01-06
tags: [note]
commentIssueId: 79
---



自己 Bash 脚本，继以下 Notes 之后，进行了升级改造，并做统计梳理整理
* [Command Alias](https://zhoukekestar.github.io/notes/2017/10/17/mac-command-alias.html), 评论区：[#58](https://github.com/zhoukekestar/notes/issues/58)
* [zsh & bash 不同](https://zhoukekestar.github.io/notes/2018/01/27/zsh-shell.html), 评论区: [#65](https://github.com/zhoukekestar/notes/issues/65)
* [Tool Tips](https://zhoukekestar.github.io/notes/2017/10/20/Tool-tips.html), 评论区: [#60](https://github.com/zhoukekestar/notes/issues/60)
* [Shell Selector](https://zhoukekestar.github.io/notes/2018/05/24/shell-selector.html), 评论区: [#79](https://github.com/zhoukekestar/notes/issues/79)





## Git Alias

#### Git log

* `gitlog` 查看各个 Commit 的记录，已经查看各 branch 引用和上下游关系，可参考 [git Branch](https://zhoukekestar.github.io/notes/2018/12/23/git-branch.html)
* `gitlog 10` 查看最近 10 次的提交记录详情

```bash

function gitlog() {

  # https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs
  if [ "$1" = "" ]; then
    git log --all --decorate --oneline --graph
  else
    git log -p -$1
  fi
}
```

#### git checkout

* `gitcheckout 0.1.0`  新建 `daily/0.1.0` 分支
* `gitcheckout feat/abc` 新建 `feat/abc` 分支

```bash
# 无参数情况下，自动更新 npm 版本号，并 checkout 新版本号的 daily 分支
# 指定版本号的情况下，checkout 新版本号的 daily 分支
# 指定分支的情况下，checkout 指定分支
function gitcheckout() {
  DAILY_REGEXP="^[0-9]"

  if [ "$1" = "" ]; then
    npm version patch
    VERSION=$(head package.json | grep "version" | cut -d "\"" -f 4)
    echo "git checkout -b daily/$VERSION"
    git checkout -b "daily/$VERSION"
  elif [[ $1 =~ $DAILY_REGEXP ]]; then
    echo "git checkout -b daily/$1"
    git checkout -b "daily/$1"
  else
    echo "git checkout -b $1"
     git checkout -b "$1"
  fi
}
alias gitco="gitcheckout"
```

#### git push

* `gitpush` 
  * 检查是否需要做前置工作，如：'lint'
  * 提交所有本地代码
  * push 到当前分支至远程
* `gitpush "commit message"` 指定提交 message，默认为 `feat: Update Code` 

```bash
function gitpush() {

  # just lint
  FILE="./.justconf"

  if [ -d $FILE ]; then
     echo "File $FILE exists. just lint . --fix"
     just lint . --fix
  else
     echo "File $FILE does not exist. Skip just lint"
  fi

  # https://medium.com/@raimibinkarim/9-bash-aliases-to-make-your-life-easier-3e5855aa95fa
  B=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
  git add -A .
  if [ "$1" = "" ]; then
      echo "git commit -m 'feat: Update Code'"
      git commit -m "Update Code"
  else
      echo "git commit -m '$1'"
      git commit -m "$1"
  fi
  echo "git push -u origin $B"
  git push -u origin $B
}
alias gitp="gitpush"
```



## Tool Tip

#### IP

Show & Copy my current IP.

```bash
function myip() {
  # 以前的老方式
  # alias ip="ifconfig | grep -o \"30\.\d*\.\d*.\d* \" | awk '{\$1=\$1};1' | pbcopy"

  # https://stackoverflow.com/questions/8529181/which-terminal-command-to-get-just-ip-address-and-nothing-else
  # IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d ' ' -f 2)
  IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2)
  echo "IP: $IP"
  echo $IP | pbcopy
}
```

#### KillPort

* `killport 8888` kill port 8888

```bash
function killport() {
  # npx fkill-cli
  # https://stackoverflow.com/questions/3855127/find-and-kill-process-locking-port-3000-on-mac

  if [ "$1" != "" ]; then
    lsof -ni tcp:"$1" | grep LISTEN
    kill -9 $(lsof -ni tcp:"$1" | grep LISTEN | awk '{print $2}')
  else
    echo "Missing argument! Usage: killport $PORT"
  fi
}
```

#### KillName

* `killname vscode`  kill process by name

```bash
function killname() {
  # killname "bin/rg"
  if [ "$1" = "" ]; then
     echo "Nothing to do"
  else
    ps -ej | grep "$1"
    ps -ej | grep "$1"  | awk '{print $2}' | xargs kill -s SIGINT
  fi
}
```

#### CCD

cd & ls

```bash
function ccd() {
  cd $1
  ls
}
```

#### Google

* `google something fun` just google 

```bash
function google() {
  open -na "Google Chrome" --args "https://www.google.com/search?q=$*"
}
```





## Shell Selector

参考 [Shell Selector](https://zhoukekestar.github.io/notes/2018/05/24/shell-selector.html), 具体的 bash 脚本参考文章下发的评论

```bash
function setnpm() {
    bash ~/.bash_profile_setnpm.sh
}

function setssh() {
    bash ~/.bash_profile_setssh.sh
}
```



## References

* [9 Bash Aliases to Make Your Life Easier](https://medium.com/@raimibinkarim/9-bash-aliases-to-make-your-life-easier-3e5855aa95fa
  B=$)
* [Pretty git branch graphs](https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs)