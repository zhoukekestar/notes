---
layout: post
title:  "VSCode debug 多线程应用"
date:   2018-05-18
tags: [tip, vscode]
commentIssueId: 79
---

使用 VSCode 调试多线程应用，这里以调试 `egg` 为例。使用以下文件配置 `launch.json` 即可。

```json
{
  // Use IntelliSense to learn about possible Node.js debug attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "compounds": [ // 将三个任务组合一起运行
    {
      "name": "Debug Egg",
      "configurations": [
        "npm debug",
        "Attach 5800",
        "Attach 9230"
      ]
    }
  ],
  "configurations": [
    // {
    //   "name": "Start Egg",
    //   "type": "node",
    //   "request": "launch",
    //   "program": "${workspaceRoot}/index.js",
    //   "cwd": "${workspaceRoot}",
    //   "runtimeArgs": [
    //     "--debug-brk"
    //   ],
    //   "port": 5858
    // },
    {
      "name": "npm debug",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "runtimeArgs": [
        "run",
        "debug"
      ],
      "port": 9229
    },
    {
      "name": "Attach 5800", // 对 5800 端口进行调试，Agent
      "type": "node",
      "request": "attach",
      // "timeout": 10000,
      "protocol": "inspector", // 默认会使用 legacy 协议，因为刚开始无法 auto detect
      "port": 5800
    },
    {
      "name": "Attach 9230", // 对 9230 端口进行调试，Worker
      "type": "node",
      "request": "attach",
      // "timeout": 10000,
      "protocol": "inspector",
      "port": 9230
    }
  ],
}
```

