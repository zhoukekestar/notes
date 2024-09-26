---
layout: post
title:  "Git 远程 master 回滚"
date:  2024-09-26
tags: [git]
---

  工作中遇到几次了，更为详细地解释说明一下。

## 紧急应对

* `git checkout publish/x.x.x`
* `git branch -f master publish/x.x.x`
* `git push --force origin master`


## 常规应对

* `git pull` 更新同步
* `git checkout publish/x.x.x` 本地 HEAD 指向老的版本号
  * 一般是一个 tag 标签
* `git checkout -b rollback` 基于当前 HEAD 新建 rollback 分支
* `git branch -f master rollback` 强制更新本地 master 分支指向到 rollback 分支
* `git push --force origin master` 强制更新远程 origin/master 分支


## 谨慎应对

以上过程中记得随时查看 git tree 来确认操作正常:

`git log --all --decorate --oneline --graph`

#### 测试仓库

假设当前 git 记录如下：
* 有3个分支，`branch1`、 `branch2`、`master`
* `HEAD` 指向 `master`
* 远程分支 `origin/master`, `origin/branch1`, `origin/branch2`, `origin/HEAD` 分别和本地对应
* 两个分支，有共同的父节点 `publish/0.0.1`

```
* 7cce722 (HEAD -> master, origin/master, origin/branch2, origin/HEAD, branch2) feat: Update Code
| * 923815f (origin/branch1, branch1) feat: Update Code
|/
* c9f9fc5 (tag: publish/0.0.1) Update README.md
* c79305f Add new file
```

#### 指向老 tag

* `git checkout publish/x.x.x` 本地 HEAD 指向老的版本号
  * 除了 HEAD 变化之后，其他的没有任何变化

```
* 7cce722 (origin/master, origin/branch2, origin/HEAD, master, branch2) feat: Update Code
| * 923815f (origin/branch1, branch1) feat: Update Code
|/
* c9f9fc5 (HEAD, tag: publish/0.0.1) Update README.md
* c79305f Add new file
```

#### checkout 新分支

* `git checkout -b rollback` 基于当前 HEAD 新建 rollback 分支

  * 基于当前 HEAD（也就是 publish/0.0.1）新建了一个 rollback 分支
  * HEAD 自动指向此分支
  * PS：新建分支，是为了更好地做后续操作，比如 cherry-pick 或 做新的更新和 commit

```
* 7cce722 (origin/master, origin/branch2, origin/HEAD, master, branch2) feat: Update Code
| * 923815f (origin/branch1, branch1) feat: Update Code
|/
* c9f9fc5 (HEAD -> rollback, tag: publish/0.0.1) Update README.md
* c79305f Add new file
```

#### 本地 master 更新

* `git branch -f master rollback` 强制更新本地 master 分支指向到 rollback 分支

  * `git branch -f` 用于强制将已有的分支指向到新的指定位置
  * 此处除了 master 也指向到了 rollback 之外，没有其他变化
  * 此时，本地已达到预期的回滚，即 master 回滚到具体版本

```
* 7cce722 (origin/master, origin/branch2, origin/HEAD, branch2) feat: Update Code
| * 923815f (origin/branch1, branch1) feat: Update Code
|/
* c9f9fc5 (HEAD -> rollback, tag: publish/0.0.1, master) Update README.md
* c79305f Add new file
```

#### 远程 master 更新

* `git push --force origin master` 强制更新远程 origin/master 分支

  * `--force` 是因为本地 master 是远程 master 的祖先，默认不允许回滚，所以，需要加个 force
  * 如果 master 设置为保护，则需要到 git 相关配置做勾选或配置

```
* 7cce722 (origin/branch2, branch2) feat: Update Code
| * 923815f (origin/branch1, branch1) feat: Update Code
|/
* c9f9fc5 (HEAD -> rollback, tag: publish/0.0.1, origin/master, origin/HEAD, master) Update README.md
* c79305f Add new file
```


## CherryPick


* `git cherry-pick xxx..xxx` cherry-pick 指定范围的 commit
  * 但此处需保障两个 commit 之间是有关系的，而不是断开的，否则无法正常 pick
* `git cherry-pick --continue` 执行 --continue
  * 一般情况下，会有冲突，需一个个解决
  * 解决完冲突后，需执行 `git add path/to/file`


# 参考

* [Learn Git Branching](https://zhoukekestar.github.io/notes/2018/12/23/git-branch.html)
