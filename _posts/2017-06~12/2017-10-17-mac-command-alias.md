---
layout: post
title:  "Command Alias"
date:   2017-10-17
tags: [mac]
commentIssueId: 58
---

Bash alias for Mac
* Get IP by `ip`
* Commit Code by `commit`

## IP
```bash
# ifconfig => show ip
# grep => get ip
# awk => trim string
# pbcopy => copy to clipboard
alias ip="ifconfig | grep -o \"\d*\.\d*\.\d*.\d* \" | awk '{\$1=\$1};1' | pbcopy"
```

## Code

```bash

alias gd="git add ."
alias gc="git commit -m 'update'"
alias gp="git push"

commit() {
    echo "git add ."
    git add .

    if [ "$1" == "" ]; then
        echo "git commit -m 'Update Code'"
        git commit -m "Update Code"
    else
        echo "git commit -m '$1'"
        git commit -m "$1"
    fi
}
```

## my bash
```bash
alias ip="ifconfig | grep -o \"30\.\d*\.\d*.\d* \" | awk '{\$1=\$1};1' | pbcopy"
alias br="source ~/.bash_profile"

# GIT
alias gs="git status"

gp() {
    if [ "$1" == "" ]; then
        git push
    else
        git push --set-upstream origin $1
    fi
}

gb() {
    git checkout -b "daily/$1"
}

commit() {
    echo "git add ."
    git add .

    if [ "$1" == "" ]; then
        echo "git commit -m 'Update Code'"
        git commit -m "Update Code"
    else
        echo "git commit -m '$1'"
        git commit -m "$1"
    fi
}

setnpm() {
    if [ "$1" == "alibaba" ]; then
        echo "set npm to [alibaba]"
        npm config set registry http://registry.npm.alibaba-inc.com
    elif [ "$1" == "npm" ]; then
        echo "set npm to [npm]"
        npm config delete registry
    else
        echo "set npm to [taobao]"
        npm config set registry https://registry.npm.taobao.org
    fi

    echo ""
    echo "===== Current NPM Config ===="
    echo ""

    npm config list
}
```

