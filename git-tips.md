# Clone and Change repo
* http://stackoverflow.com/questions/22906917/how-to-move-git-repository-with-all-branches-from-bitbucket-to-github
* http://stackoverflow.com/questions/2432764/change-the-uri-url-for-a-remote-git-repository
```bash
git remote set-url origin https://github.com/user/repo2.git
git remote show original
git push

// if you want to push all branches
git push --mirror

```



# Tag
```bash
// see local tags
git tag

// tag current branch
git tag -a 2.1.2-release -m 'Updated: xxx.'

// push tag to remote
git push --tag


// Delete tag localy
git tag --delete 2.1.2-release


// Delete tag remotely
git push --delete origin 2.1.2-release

```

## Branching and Merging
```bash

// See branchs
git branch


// Create a branch and checkout it.
git checkout -b hotfix

// This is shorthand for :
// git branch hotfix
// git checkout hotfix


// Delete branch
git branch -d hotfix
// Delete remote branch
git push origin --delete hotfix


// Push branch to remote server
git push --set-upstream origin hotfix



// Merge
git merge hotfix


// See stutas if conflicts occurred
git status


// Merge files
// https://git-for-windows.github.io/
// http://stackoverflow.com/questions/426026/git-on-windows-how-do-you-set-up-a-mergetool
git mergetool
git commit -m 'merge finished'

// edit file directly
git add .
git commit -m 'merge finished'

```

Other Tips
```bash

// See last 2 commit & its detail
git log -p -2


// Discrad file change
git checkout -- README.md


// See changes you just made.
git diff
````

## Repos & Sites
* [git-commands](https://trello.com/b/qvYlSdKT/git-commands)
* [Tips](https://github.com/git-tips/tips)
* [awesome-github](https://github.com/AntBranch/awesome-github)
* [git-game](https://github.com/git-game/git-game)
