---
layout: post
title:  "Mac 访达快速打开终端"
date:  2025-11-03
tags: [tools]
---

Finder 自定义工具栏，MacOS Finder 如何快速打开 terminal、VSCode、Cursor，并打开指定选定目录。

# 新建 applescript

打开 `script editor`，写入代码如下：

```
tell application "Finder"
	set theSelection to selection
	
	if (count of theSelection) is equal to 1 then
		-- 步骤 1A: 如果【只选中了一个项目】
		set selectedItem to item 1 of theSelection
		
		-- 检查选中的项目是否为文件夹或应用（包）
		if class of selectedItem is in {folder, alias, application file} then
			set currentPath to POSIX path of (selectedItem as alias)
		else
			-- 如果选中的是文件，则切换到文件所在的【父级目录】
			set currentPath to POSIX path of (container of selectedItem as alias)
		end if
		
	else
		-- 步骤 1B: 如果【没有选中项目】或【选中了多个项目】
		try
			-- 退回到使用当前 Finder 窗口的【目标文件夹】
			set currentPath to POSIX path of (target of front window as alias)
		on error
			-- 如果没有 Finder 窗口打开，则使用家目录作为默认路径
			set currentPath to POSIX path of (path to home folder)
		end try
	end if
end tell

-- 步骤 2: 格式化路径并调试显示
set quotedPath to quoted form of currentPath

-- 打开 terminal
-- set shellCommand to "open -a \"Visual Studio Code\" " & quotedPath
-- set shellCommand to "open -a Cursor " & quotedPath
set shellCommand to "open -a Terminal " & quotedPath
do shell script shellCommand

```

> 以上代码由 gemini 生成，同理可打开 cursor、vscode 等


# 保持为应用

* 保持为 application 格式
* 修改应用图标，参考 [open-in-terminal](https://github.com/zhoukekestar/notes/blob/5c441a443a3780e435e3eecccab51eb84c6853a1/_posts/2020-04~09/2020-08-02-open-in-terminal.md)
    * 你可以从现有的 VSCode 应用，按同理获取应用的图标资源
* 打开 Finder，按住 Command 键，拖到 Finder 工具栏上即可

# 最终效果

![](https://img.alicdn.com/imgextra/i2/O1CN01bMP6T723ZG6UfBXAT_!!6000000007269-2-tps-1752-720.png)

# 参考
* https://github.com/zhoukekestar/notes/blob/5c441a443a3780e435e3eecccab51eb84c6853a1/_posts/2020-04~09/2020-08-02-open-in-terminal.md
