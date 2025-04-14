---
layout: post
title:  "Browser-use 提示词解密"
date:  2025-04-14
tags: [tool]
---


本文通过 browser-use 的 agent，给定一个任务并查看该 agent 与 LLM 的完整通信。模板任务如下：

```
'1. Go to https://www.bing.com '
"2. Search for 'browser use' in the search bar "
'3. Click on first page url '
'4. Return the page title'
```


# 完整 Prompts 

### 第一步

* prompt 中，指定了通用操作（common action），比如：表单填充（form fill）、导航和提取（navigation and extraction）等
* Deepseek 理解任务，并返回的 action 选择了 go_to_url

Deepseek 返回：

```json
{
  "current_state": {
    "evaluation_previous_goal": "Unknown - The task has just started, and no actions have been taken yet.",
    "memory": "Task started. Step 1: Go to https://www.bing.com. 0 out of 4 steps completed.",
    "next_goal": "Navigate to https://www.bing.com."
  },
  "action": [
    {
      "go_to_url": {
        "url": "https://www.bing.com"
      }
    }
  ]
}
```

### 第二步

点击查看完整 prompt：[p2.log](./p2.log)

* prompt 中，提供了可以操作的按钮、编号及其信息。
* Deepseek 在表单填充的可选 action 中（input_text、click_element）中，选择了先输入、再点击，并给出了指定的编号

Deepseek 返回：

```json
{
  "current_state": {
    "evaluation_previous_goal": "Success - Successfully navigated to https://www.bing.com as per the task.",
    "memory": "Navigated to Bing homepage. Next step is to search for 'browser use' in the search bar.",
    "next_goal": "Search for 'browser use' in the search bar."
  },
  "action": [
    {
      "input_text": {
        "index": 13,
        "text": "browser use"
      }
    },
    {
      "click_element": {
        "index": 14
      }
    }
  ]
}

```

### 第三步

[p3.log](./p3.log)

Deepseek 返回：

```json
{
  "current_state": {
    "evaluation_previous_goal": "Success - Successfully input 'browser use' into the search bar. Suggestions appeared as expected.",
    "memory": "Input 'browser use' into the search bar. Next step is to click the search button to execute the search.",
    "next_goal": "Click the search button to execute the search for 'browser use'."
  },
  "action": [
    {
      "click_element": {
        "index": 14
      }
    }
  ]
}

```

### 其他

* [p4.log](./p4.log)
* [p5.log](./p5.log)
* [p6.log](./p6.log)

可复制完整的上诉 prompt 给 deepseek，然后查看相关结果


# 本地测试

# Install UV

参考 https://github.com/astral-sh/uv，用于管理 python 环境，依赖等。

```sh
# On macOS and Linux.
curl -LsSf https://astral.sh/uv/install.sh | sh
```


# 基础环境

参考：https://github.com/browser-use/browser-use

```sh
# 新文件夹
$ mkdir browser-use-demo

# 创建虚拟 python 环境，避免影响系统的主环境
$ uv venv --python 3.12

# 激活虚拟环境
$ source .venv/bin/activate

# 安装 browser-use
$ uv pip install browser-use

# 安装 chrome
# 安装 browser-use 后，子依赖 playwright 就会被安装
# 在 ./.venv/bin/playwright 中，主机环境无此命令
$ playwright install chromium

```


# Demo

```python
from langchain_openai import ChatOpenAI
from browser_use import Agent
import os
from pydantic import SecretStr
import asyncio
from dotenv import load_dotenv
load_dotenv()

# 打印所有 prompt 
import langchain
langchain.verbose = True
langchain.debug = True

# 获取 API_KEY
# 具体配置放 .env 文件中
api_key = os.getenv('DEEPSEEK_API_KEY', '')
if not api_key:
	raise ValueError('DEEPSEEK_API_KEY is not set')

# Initialize the model
llm=ChatOpenAI(base_url='https://api.deepseek.com/v1', model='deepseek-chat', api_key=SecretStr(api_key))

async def main():
    agent = Agent(
        # task="Compare the price of gpt-4o and DeepSeek-V3",
        task=(
            '1. Go to https://www.bing.com '
            "2. Search for 'browser use' in the search bar "
            '3. Click on first page url '
            '4. Return the page title'
        ),
        llm=llm,
        use_vision=False,
    )
    await agent.run()

asyncio.run(main())
```


# Debug

VSCode 中，打开命令 `Control + Command + P`，选择 `Python: Select interpreter`，参考：

* https://stackoverflow.com/questions/54009081/how-can-i-debug-a-python-code-in-a-virtual-environment-using-vscode
* https://code.visualstudio.com/docs/python/environments


如果要调试依赖文件，需要创建 `.vscode/launch.json` 文件，并指定 `justMyCode` 为 false，默认为 true，无法断点进依赖。

```json
{
    "version": "0.2.0",
    "configurations": [

        {
            "name": "Python Debugger: Current File",
            "type": "debugpy",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal",
            // debug python module
            "justMyCode": false
        },
    ]
}
```
