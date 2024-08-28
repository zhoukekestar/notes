---
layout: post
title:  "Spotlight 替代 Alfred"
date:  2024-08-28
tags: [shell]
---

  因为 alfred 脚本的维护比较麻烦，输入输出虽然也是 stdin 和 stdout ，但总体开发和维护体验并不友好，还需要做 alfred 特定的格式化输出，所以决定使用 spotlight 替代 alfred，并用标准 shell 脚本来解决维护成本的问题。

# 可行性

  spotlight 搜索可行性和他的边界问题。目前 spotlight 仅支持文件级别的搜索，[不支持参数输入](https://stackoverflow.com/questions/35711642/how-to-run-a-shell-script-using-spotlight-passing-a-parameter)（所以，迁移到 shell 中进行输入）。

  spotlight 唤起 shell 的方式，可参考 [how-to-run-a-shell-script-using-spotlight](https://stackoverflow.com/questions/2877741/how-to-run-a-shell-script-using-spotlight)

  新建一个 shell 脚本，并以 `.command` 结尾即可，例如：

```shell
!/usr/bin/env sh
echo "hello spotlight"
```

# 配合 zx 脚本

  因为工作目录的问题，参考 [how-to-get-absolute-path-name-of-shell-script-on-macos](https://stackoverflow.com/questions/5756524/how-to-get-absolute-path-name-of-shell-script-on-macos)，获取当前路径，并使用 zx 来执行脚本逻辑。



```sh
!/usr/bin/env sh

echo "hello spotlight"

ABSPATH=$(cd "$(dirname "$0")"; pwd -P)

zx $ABSPATH/hello.mjs

# 需要立即关闭当前窗口的，执行下述代码，不需要的，则注释即可
osascript -e 'tell application "Terminal" to close (every window whose name contains "cli-hello.command")' &
```

  编写 zx 脚本逻辑

```js
#!/usr/bin/env zx

const res = await fetch('https://httpbin.org/get').then(d => d.json());

$`echo '${JSON.stringify(res)}'`
```


# fetch with local cookies

```js
import request from 'request'
import chrome from 'chrome-cookies-secure'

function fetchWithLocalCookie (url) {
  const urlObj = new URL(url)
  return new Promise(resolve => {
    chrome.getCookies(urlObj.origin, 'jar', function (err, jar) {
      request(
        {
          url,
          jar: jar
        },
        function (err, response, body) {
          if (err) {
            return reject(err)
          }
          resolve(body)
        }
      )
    })
  })
}
```


# 参考

* 获取 chrome 信息：[https://github.com/prasmussen/chrome-cli](https://github.com/prasmussen/chrome-cli)
* 登录态请求：[https://github.com/bertrandom/chrome-cookies-secure](https://github.com/bertrandom/chrome-cookies-secure)
* zx nodejs 脚本：[https://github.com/google/zx](https://github.com/google/zx)
* cli 搜索：[https://github.com/mokkabonna/inquirer-autocomplete-prompt](https://github.com/mokkabonna/inquirer-autocomplete-prompt)
  * prompts: [https://github.com/terkelg/prompts](https://github.com/terkelg/prompts)
