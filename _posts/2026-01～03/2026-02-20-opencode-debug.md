---
layout: post
title:  "Opencode debug 小记"
date:  2026-02-20
tags: [ai]
---


简单记录一下 opencode 的 debug 踩坑记录

# 代码

重点参考 https://github.com/anomalyco/opencode/blob/dev/CONTRIBUTING.md#setting-up-a-debugger

由于其为 CS/BS 架构，tui 和 browser、tauri 等均为不同客户端，和 server 是 https 协议交互，重点 debug server 即可。

```sh
$ git clone https://github.com/anomalyco/opencode
$ vi ./debug.sh
# bun run --inspect=ws://localhost:6499/ --cwd packages/opencode ./src/index.ts serve --port 4096
$ chmod +x ./debug.sh

# 启动之后，通过 tui 连接 server
$ opencode attach http://127.0.0.1:4096
```

### 常见路径

```sh
# 配置文件：~/.config/opencode/opencode.jsonc

# 查看所有 opencode 路径
$ opencode debug paths
home       ~
data       ~/.local/share/opencode
bin        ~/.local/share/opencode/bin
log        ~/.local/share/opencode/log
cache      ~/.cache/opencode
config     ~/.config/opencode
state      ~/.local/state/opencode

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

