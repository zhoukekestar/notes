---
layout: post
title:  "Gemini 翻译实践"
date:  2024-05-04
tags: [note]
---

  在国内环境，iOS + ShortCuts + Cloudflare + Gemini 搭建基于 AI 能力的翻译能力。

# 搭建 Cloudflare Gemini

```js
// https://gist.github.com/zhoukekestar/0dc50a93ac295826bb319f8b7d08d8e8
import { GoogleGenerativeAI } from './ai-sdk.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const text = url.searchParams.get('text');

    if (!text) {
      return new Response("no text found");
    }
    // uuid 生成 https://www.uuidgenerator.net/
    if (url.pathname !== '/xxx') {
      return new Response("not auth");
    }
    const genAI = new GoogleGenerativeAI(env.API_KEY)

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const result = await model.generateContent(text)
    const response = await result.response
    const responseText = response.text()

    return new Response(responseText);
  },
};
```


# 国内访问 Cloudflare

  参考 https://zhoukekestar.github.io/notes/2023/10/22/CF-workers.html

  在电脑使用 CURL 的话，可以使用以下两种方式。

```sh
curl http://gemini.zhoukekestar.workers.dev/\?text\=hi --resolve gemini.zhoukekestar.workers.dev:80:172.64.80.2
curl http://172.64.80.2/\?text\=hi -H "host: gemini.zhoukekestar.workers.dev"
```

  在手机上，我们就使用第二种方式，可以更方便配置。


# ShortCuts

  大致如下：

  ![WX20240504-161944@2x](https://github.com/zhoukekestar/notes/assets/7157346/09c77500-d51c-4d06-b6c4-1d47f58b81e4)


# 总体效果

  [视频](https://www.youtube.com/shorts/a4zQex_FmtM)
  

