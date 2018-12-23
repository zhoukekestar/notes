---
layout: post
title:  "Learn Git Branching"
date:  2018-12-23
tags: [note, git]
commentIssueId: 97
---


学习 Git 分支笔记
* commit, checkout, branch, rebase, merge, cherry-pick
* revert, reset, tag, log
* fetch, pull, push






## Git branch

### Main

#### Commit

* `git commit` 新建一个 commit，也就是 git 的最小存储单位
* 分支 branch，原则上 `branch early, and branch often`

  * `git branch newImage` 会在当前 commit 上新建一个分支
  * `git checkout newImage` 用于切换分支
  * `git branch -b newImage` 用于新建分支并切换分支
* `git merge` merge 目标分支至当前分支，并新建 merge commit
* `git rebase targetBranch` 将`当前分支变更引用`添加至目标分支下
  * 如果目标分支和当前分支在同一分支链路上，且目标分支更靠前，则将当前分支更新引用至目标分支即可，看 rebase 动画会更清楚些。

#### HEAD

* `HEAD` 一般是跟随着分支走的，但你也可以通过 `checkout commitid` 来分离 HEAD 指向
  * 如 `git checkout master` ，此时的指向是 `HEAD -> master -> CommitID` 
  * `git checkout CommitID` 则会将 HEAD 指向抽离出来变成 `HEAD -> CommitID` 
* 在分支移动 HEAD 指向
  * `git checkout CommitID` 移动到某个 CommitID
  * `git checkout branch^` 移动 branch 指向的父节点
  * `git checkout HEAD^` 移动当前指向的父节点
  * `git checkout HEAD~2` 移动当前指向的二级父节点 
* 修改 Branch 指向
  * 通过 `git rebase ` 可以将当前较老的分支指向最新的 commit
  * `git branch -f master HEAD^` 将分支强制指向到 HEAD 的父节点
  * `git branch -f  master CommitID` 将分支指向到某个 CommitID
* `git reset` & `git revert` 
  * 使用该命令也能修改分支指向，`git reset HEAD^` 如果HEAD 指向  master 分支，则会将 master 和 HEAD 都指向到父节点。
  * `git revert HEAD` 会将撤销 HEAD 指向的 CommitID，并将该撤销以新的 CommitID 的形式提交



#### Cherry Pick

* `git cherry-pick CommitID` 将某个提交 ID 更新到当前分支上
* `git rebase -i targetBranch` 将当前分支上的 CID 以交互方式提交到目标分支上



### Tips

* `git rebase targetBranch currentBranch` 将当前分支（可指定）rebase 到目标分支
* `git tag tagName CommitID` 
* `git log --all --stat --graph` 查看提交日志



## Remote

* `git checkout origin/master; git commit` 这并不会更新 origin/master 分支，因为，远程分支只有远程更新了之后，才会更新

* `git fetch` 用于将远程分支(所有本地缺失的 commit，包括其他远程分支)更新到本地，不会更新任何本地分支

* `git pull` 用于更新远程到本地，并更新当前本地分支，该条命令是以下命令的组合

  * `git fetch`
  * `git merge o/master` 或 `git rebase o/master` 或 `git cherry-pick o/master` 

* `git push` 用于将当前分支提交更新至远程

  * 当远程有新提交时，而本地分支是基于老分支开发的，可先更新 `o/master` 并将当前分支 rebase 到 `o/master` 并再次 push：`git fetch; git rebase o/master; git push` 或 `git pull --rebase; git push`
    * 也可以使用 `git fetch; git merge o/master; git push`  或 `git pull; git push` 

* `git checkout -b foo o/master` 新建 foo 分支，并将 foo 指定跟踪远程 master 分支

  * `git branch -u o/master foo` 指定分支 track 某个远程分支 
  * 当 checkout 未 track 远程分支的 commitid 的时候，push 命令将会失败，如 `git checkout CommitID; git push`

* `git push origin master` 将指定分支上未提交的 commit 更新至远程 origin

  * > *Go to the branch named "master" in my repository, grab all the commits, and then go to the branch "master" on the remote named "origin". Place whatever commits are missing on that branch and then tell me when you're done.*

  * `git push origin foo^:master` 将 foo 分支上的父节点及之前的提交更新至远程 master 分支，`git push origin master:newBranch` 如果远程分支不存在，则新建远程分支
  * `git push origin :foo` 将会删除远程 foo 分支

* `git fetch origin foo~1:bar` 将远程分支foo 的父节点下载更新至本地的 bar 分支

  * `git fetch origin :bar` 将会新建 bar 分支

* `git pull origin foo` => `git fetch origin foo; git merge o/foo`

  * `git pull origin bar~1:bugFix` => `git fetch origin bar~1:bugFix; git merge bugFix` 



## References

* [Pretty git branch graphs](https://stackoverflow.com/questions/1057564/pretty-git-branch-graphs)
* [Learn Git Branching](https://learngitbranching.js.org/)