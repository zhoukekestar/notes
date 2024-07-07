---
layout: post
title:  "向量数据库使用样例"
date:  2024-07-08
tags: [AI]
---

  用 chroma 作为向量数据库，测试、写一下和 AI embedding 的集成。

# 向量数据库

  参考 langchain 的文档，使用 [[chroma](https://github.com/chroma-core/chroma)] 作为向量数据库的持久层。


## 安装&启动

  因为代理的关系，使用 Google 的 [Docker Hub Mirrors](https://cloud.google.com/artifact-registry/docs/pull-cached-dockerhub-images?hl=zh-cn) 来进行加速。

```sh
$ docker pull mirror.gcr.io/chromadb/chroma
$ docker run -p 8000:8000 mirror.gcr.io/chromadb/chroma
```


# 客户端 Demo

  安装依赖：

```sh
$ npm i chromadb chromadb-default-embed
# 相关版本如下
# "chromadb": "^1.8.1",
# "chromadb-default-embed": "^2.13.2"

$ touch index.mjs
```

  编写客户端代码如下：

```js
import { ChromaClient } from 'chromadb'

const client = new ChromaClient();

const collection = await client.createCollection({
    name: 'test',
    metadata: { "hnsw:space": "cosine" },
})

await collection.add({
    ids: ["id1", "id2", "id3"],
    embeddings: [[1.1, 2.3, 3.2], [4.5, 6.9, 4.4], [1.1, 2.3, 3.2]],
    metadatas: [{"chapter": "3", "verse": "16"}, {"chapter": "3", "verse": "5"}, {"chapter": "29", "verse": "11"}],
})

const result = await collection.query({
    queryEmbeddings: [[11.1, 12.1, 13.1],[1.1, 2.3, 3.2]],
    nResults: 10,
})

console.log(result);
```


  测试启动

```sh
$ node ./index.mjs
```


# 参考

* [langchain vectorstores](https://python.langchain.com/v0.2/docs/how_to/vectorstores/)
* [chroma](https://github.com/chroma-core/chroma)
* [Docker Hub Mirrors](https://cloud.google.com/artifact-registry/docs/pull-cached-dockerhub-images?hl=zh-cn)
