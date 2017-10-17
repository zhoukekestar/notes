---
layout: post
title:  "Command Alias"
date:   2017-10-17
tags: [mac]
commentIssueId: 58
---

```bash
# ifconfig => show ip
# grep => get ip
# awk => trim string
# pbcopy => copy to clipboard
alias ip="ifconfig | grep -o \"\d*\.\d*\.\d*.\d* \" | awk '{\$1=\$1};1' | pbcopy"

alias gd="git add ."
alias gc="git commit -m 'update'"
alias gp="git push"

```
