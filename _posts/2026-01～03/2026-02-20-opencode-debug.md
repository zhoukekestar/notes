---
layout: post
title:  "Opencode debug 小记"
date:  2026-02-20
tags: [ai]
---


简单记录一下 opencode 的 debug 踩坑记录

# 代码

```sh
$ git clone https://github.com/anomalyco/opencode
$ vi ./debug.sh
# bun run --inspect=ws://localhost:6499/ --cwd packages/opencode ./src/index.ts serve --port 4096
$ chmod +x ./debug.sh
```

### 如果有部门 error 包找不到的情况

在 packages/opencode/tsconfig.json 中

```json
{
  ...
  "compilerOptions": {
    ...
    "paths": {
      ...
      "@opencode-ai/util/*": ["../util/src/*"]
    }
  }
}
```

### 环境变量问题

如果是 vscode 中的 debug，记得重启 vscode

# vscode 配置

### tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run debug.sh",
      "type": "shell",
      "command": "./debug.sh",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": [],
      "isBackground": true
    }
  ]
}
```

### launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "bun",
      "request": "attach",
      "name": "opencode (attach)",
      "url": "ws://localhost:6499/",
      "preLaunchTask": "Run debug.sh"
    }
  ]
}

```

# opencode-cursor

debug opencode-cursor 的时候，需注意各个插件的架构，比如：

https://github.com/Nomadcxx/opencode-cursor/blob/main/src/plugin.ts#L1454

中，背后的启动了一个 http server，且会优先复用，如想 debug，记得把老的 kill 掉

```sh
# debug.sh
killport 32142

# debug 命令
bun run --inspect=ws://localhost:6499/ --cwd packages/opencode ./src/index.ts serve --port 4096
```

