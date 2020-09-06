---
layout: post
title:  "如何快速打开 VSCode"
date:  2020-08-02
tags: [tools]
---


Mac 系统下，如何快速打开 VSCode？
* 右键打开
* 快捷键打开，`Cmd + .`
* 工具栏打开



## 右键快速打开

参考：https://gist.github.com/tonysneed/f9f09bfa28bcf98e8d8306f9b21f99e2

* Open `Automator `
* `File` - `New`  - `Quick Action`

![](https://img.alicdn.com/tfs/TB1mcytP4z1gK0jSZSgXXavwpXa-2006-1100.png)

* Change to "files or folders" in "Finder" : `1, 2`
- Add a "Run Shell Script" action. From the left hand side pane in Automator, drag-drop Library > Utilities > Run Shell Script into the right hand pane : `3`
- Change "Pass input" to "as arguments" : `4`
- Paste the following in the shell script box: `open -n -b "com.microsoft.VSCode" --args "$f" `

![](https://img.alicdn.com/tfs/TB1EyT4cmslXu8jSZFuXXXg7FXa-1998-858.png)

* Save it as something like "Open in VS Code"

* And you can run it by Right Click

![](https://img.alicdn.com/tfs/TB1scyyP1L2gK0jSZPhXXahvXXa-1718-1272.png)





## 快捷键打开

> To make it even easier add a shortcut to this service `Command + .`
> System Preferences->Keyboard->Shortcuts->Services->Open with Visual Studio Code->Add->'Command' + '.' ->Save
> Now in finder select a file or folder and press `COMMAND + .`

![](https://img.alicdn.com/tfs/TB1S.T0dMgP7K4jSZFqXXamhVXa-1336-1162.png)



## 工具类打开

* 下载：https://github.com/sozercan/OpenInCode



## 其他

* Services 存储路径为：`~/Library/Services/`

![](https://img.alicdn.com/tfs/TB1Inuyd6MZ7e4jSZFOXXX7epXa-1632-598.png)



## 参考

* https://gist.github.com/tonysneed/f9f09bfa28bcf98e8d8306f9b21f99e2
