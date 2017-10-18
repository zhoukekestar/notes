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

