---
layout: post
title:  "对微信小程序开发的钩子扩展"
date:  2024-09-24
tags: [tool]
---

  因为小程序的很多写法限制，再加之整体 IDE 缺少必要的 hook 提供给开发者，所以整体开发设计也比较受限，故尝试从 IDE 层面添加 hook 来方便开发者。

  笔者为 mac，但最终的 hook 文件，应该是类似的。

# 背景

  因为团队整体推行 WebComponent 方案，但小程序有比较多的限制，导致相关的规范在小程序下无法较好的执行落地。比如 bindClick、默认 slot、Toast 的 API 调用等等。

  事件绑定和默认slot，还有相关解法，但对于 Toast 的 API 调用，必须手动添加一个 wxml 中添加一个元素才行，无法做到动态添加。这对整体跨端方案提出了巨大的挑战。

  故需一种方式来对小程序做整体的预干预，最简单的就是在构建之前，对源代码做相关修改（比如：添加元素，本质上，很多用单纯的字符串识别就能解决问题），且最好是对内存文件做修改，不改动源码的情况下。

# 确认进程

  正常打开小程序开发工具，并使用 `ps -ef` 查找小程序相关进程。并记录进程号最靠前的命令参数。

```sh
$ ps -ef | grep "wechat"

  502  4414     1   0  3:29pm ??         0:00.04 wechatwebdevtools Daemon

  502  4415  4414   0  3:29pm ??         0:01.47 /Applications/wechatwebdevtools.app/Contents/MacOS/wechatdevtools /Applications/wechatwebdevtools.app/Contents/Resources/package.nw -load-extension=/Users/zhoukeke/Library/Application Support/微信开发者工具/50a7d9210159a32f006158795f893857/WeappPlugin --custom-devtools-frontend=file:///Users/zhoukeke/Library/Application Support/%E5%BE%AE%E4%BF%A1%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/50a7d9210159a32f006158795f893857/WeappPlugin/inspector --user-data-dir=/Users/zhoukeke/Library/Application Support/微信开发者工具/50a7d9210159a32f006158795f893857 --package-dir=/Applications/wechatwebdevtools.app/Contents/Resources/package.nw --app-session-id=#########此处是你自己的sessionid#########

  502  4419     1   0  3:29pm ??         0:00.01 /Applications/wechatwebdevtools.app/Contents/Frameworks/nwjs Framework.framework/Versions/91.0.4472.114/Helpers/chrome_crashpad_handler --monitor-self --monitor-self-annotation=ptype=crashpad-handler --database=/Users/zhoukeke/Library/Application Support/微信开发者工具/Crashpad --metrics-dir=/Users/zhoukeke/Library/Application Support/微信开发者工具 --annotation=plat=OS X --annotation=prod=微信开发者工具 --annotation=ver=1.06.2402040 --handshake-fd=9
  502  4421     1   0  3:29pm ??         0:00.01 /Applications/wechatwebdevtools.app/Contents/Frameworks/nwjs Framework.framework/Versions/91.0.4472.114/Helpers/chrome_crashpad_handler --no-periodic-tasks --monitor-self-annotation=ptype=crashpad-handler --database=/Users/zhoukeke/Library/Application Support/微信开发者工具/Crashpad --annotation=plat=OS X --annotation=prod=微信开发者工具 --annotation=ver=1.06.2402040 --handshake-fd=4

  ...
```
# 确定调试主目录

  但从现有的进程中，搜索关键词 `compile` 看，最有可能的就是：

```sh
502  7908  7872   0  3:41PM ttys027    0:04.03 /Applications/wechatwebdevtools.app/Contents/Frameworks/nwjs Framework.framework/Versions/91.0.4472.114/Helpers/wechatwebdevtools Helper (Renderer).app/Contents/MacOS/node /Applications/wechatwebdevtools.app/Contents/Resources/package.nw/js/common/miniprogram-builder/modules/corecompiler/summerEntryProcess.js --expose-gc
```

  大概确认整体资源都是从以下目录加载，所以，用 VSCode 打开以下目录：`/Applications/wechatwebdevtools.app/Contents/Resources/package.nw`。

# Debug 小程序

  确认主进程，并使用 VSCode 的 Javascript Debug Terminal 进行调试。

  ![image](https://github.com/user-attachments/assets/1df91d4f-9b19-4e17-b4c8-58a262e14cd6)

  打开 debug 终端，然后用命令执行启动小程序开发工具。如下：

```sh
$ /Applications/wechatwebdevtools.app/Contents/MacOS/wechatdevtools /Applications/wechatwebdevtools.app/Contents/Resources/package.nw -load-extension="/Users/zhoukeke/Library/Application Support/微信开发者工具/50a7d9210159a32f006158795f893857/WeappPlugin" --custom-devtools-frontend="file:///Users/zhoukeke/Library/Application Support/%E5%BE%AE%E4%BF%A1%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7/50a7d9210159a32f006158795f893857/WeappPlugin/inspector" --user-data-dir="/Users/zhoukeke/Library/Application Support/微信开发者工具/50a7d9210159a32f006158795f893857" --package-dir=/Applications/wechatwebdevtools.app/Contents/Resources/package.nw --app-session-id=#########此处是你自己的sessionid#########
```


# 打各种断点

  这里没啥技巧，找关键词，然后打上断点，比如：
* `change`
* `fileChange`
* `compile`

  等等，主打一个体力活和猜测。

  当然，入口肯定和 `js/common/miniprogram-builder/modules/corecompiler/summerEntryProcess.js` 相关。

  所以，可以在 `summerEntryProcess.js` 文件下的 `messageHandler` 打断点测试。然后慢慢调试。。。。


# 执行路径

最终调试出来的整体执行路径大致如下：

* `applwatcherapp.js` 负责监听文件变化，比如：内容修改、新增文件、新增目录等等。
* 监听到变化后，通过 [NodeJS channel](https://nodejs.org/api/diagnostics_channel.html) 通知到 `summerEntryProcess` 进程。
* 触发 `basegraph.js` 的文件重新获取 `loadModuleFromFile`，这个 graph 猜测是内部构建的依赖图
* 通过 `AppGraph` 依赖了 `compiler` ，名称叫 `SummerCompiler`，这个 graph 为 compiler 提供依赖解析、插件配置、读取文件等等。
* `AppGraph` 读取文件，依赖了 `PreCompileProject` 读取，并依赖 `SummerCPProject` 读取，并最终依赖 `baseProject`
* 最终仅需要在 `BaseProject` 中的 `getSrcFile` 中添加相关钩子，即可做相关扩展。

![image](https://github.com/user-attachments/assets/37f56335-d801-48dc-be38-331ca5d687c7)


# 测试效果

* 对源码的 `123` 做字符串替换，改为 `###`
* 重新启动小程序编辑器
* 重新预览页面，可以看到 `123` 已被替换

![image](https://github.com/user-attachments/assets/6d1fc865-a443-4c89-be17-fbb9e8dc4926)


# HOOK

  修改 `/Applications/wechatwebdevtools.app/Contents/Resources/package.nw/js/common/miniprogram-builder/project/baseProject.js`

```js
  // 引入 child_process
  const cp = require('child_process');

  ...

  // 修改 getSrcFile
  getSrcFile (t, e) {
    t = t || ''
    const i = this.getTargetPath(t, e),
      r = (0, tools_1.normalizePath)(
        path_1.default.posix.join(this.projectPath, i)
      )
    const content = fs_extra_1.default.readFileSync(r, null);

    // 通过 shell 来透出 hook
    try {
      const { stdout, stderr } = cp.spawnSync('/usr/local/bin/node', ['/usr/local/bin/wehcat-miniprogram-getsrcfile-hook', r, String(content)])
      return stdout.length ? stdout : content;
    } catch(err) {
    }

    return content;
  }
```

  hook 脚本，放在 `/usr/local/bin/wehcat-miniprogram-getsrcfile-hook` 或和前面透出的 hook 一致即可。

```js
#!/usr/bin/env node

const fs = require('fs')
const filePath = process.argv[2]
const fileContent = process.argv[3]

// 日志打印
const logPath = '/Users/zhoukeke/hook.log'
const log = msg => {
  try {
    fs.appendFileSync(logPath, String(msg))
  } catch (err) {
    console.error(err)
  }
}

// 测试有 123 的文件做替换
if (/123/.test(fileContent)) {
  log('filepath replaced:' + filePath);
  // 通过标准输出，输出替换后的文件内容
  // 对所有的 123 做替换
  console.log(fileContent.replace(/123/g, '###'))
}
```

  至此，就可以直接正常打开小程序开发，并能做动态快速的语法扩展了。

# 演示效果

<video src="https://github.com/user-attachments/assets/dfb0b94c-1e03-4d90-a7c7-4d6f287e50b2"></video>

# 小结

  本文通过对小程序 IDE 添加了一个文件 hook 的方式，对小程序的写法做了非常大的扩展，可以字符串替换、宏定义、AST 语法分析，修改等等。
