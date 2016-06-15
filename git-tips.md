
```bash
git remote set-url origin https://github.com/user/repo2.git
git remote show original
git push

// if you want to push all branches
git push --mirror

```
http://stackoverflow.com/questions/22906917/how-to-move-git-repository-with-all-branches-from-bitbucket-to-github
http://stackoverflow.com/questions/2432764/change-the-uri-url-for-a-remote-git-repository

```bash
// Merge
git checkout master
git merge --no-ff develop
git push
git checkout develop

```

```bash
// tag
git tag -a 2.1.2-release -m 'Updated: xxx.'
git push --tag
```
