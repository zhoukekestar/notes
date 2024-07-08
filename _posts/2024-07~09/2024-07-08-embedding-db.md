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


# AI embedding

  embeddingFunction,  以阿里云的 text-embedding 为例

```js
export default async texts => {
  const res = await fetch(
    `https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding`,
    {
      headers: {
        Authorization: 'xxxx',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        model: 'text-embedding-v1',
        input: {
          texts
        },
        parameters: {
          text_type: 'query'
        }
      })
    }
  ).then(d => d.json())

  return res.output.embeddings?.map(t => t.embedding)
}
```

  Insert documents

```js
import { ChromaClient } from 'chromadb'
import embeddingFunction from './embeddingFunction.mjs'

const client = new ChromaClient()

const collection = await client.getOrCreateCollection({
  name: 'gemini-test2',
  // metadata: { 'hnsw:space': 'cosine' },
  metadata: { 'hnsw:space': 'l2' },
  embeddingFunction: {
    generate: embeddingFunction,
  }
})

const documents =
  `政治学研究的最高目标应该是改善每一位普通人的生活境况，唯有此，政治学才能具有强大的生命力。
中国文化之精髓：合知行，一天人，同真善。任何文化只有在适于其滋长的土壤才能发挥作用。要影响、改变、铲除某些文化，必须从其土壤开始研究。社会存在决定社会意识。`.split(
    '\n'
  )

collection.add({
  ids: Object.keys(documents),
  documents
})
```

  查询

```js
import { ChromaClient } from 'chromadb'
import embeddingFunction from './embeddingFunction.mjs';
import fs from 'fs'

const client = new ChromaClient()

const collection = await client.getOrCreateCollection({
  name: 'gemini-test2',
  // metadata: { 'hnsw:space': 'cosine' },
  metadata: { 'hnsw:space': 'l2' },
})

const results = await collection.get({ ids:
['0', '1'],
include: ["embeddings", "metadatas", "documents"] })

const jsons = {};
results.embeddings.forEach((embedding, index) => {
  jsons[results.documents[index]] = JSON.stringify(embedding);
})

console.log(results)
fs.writeFileSync('./embeddings.json', JSON.stringify(jsons))
```


# 聚类

  参考之前的 [k-means 聚类](https://zhoukekestar.github.io/notes/2023/09/06/chatglm-kmeans.html)

  用我 [自己的笔记](https://zhoukekestar.github.io/notes/2024/07/07/police.html) 做了一下测试：
```sh
0 从高度概括的意义上...
0 政治学研究的最高目...
0 民主不仅是政治制度...
0 社会主义初级阶段的...
1 一个宏观机制如果事...
1 中国文化之精髓：合...
1 企业公司管理的核心...
1 对企业家阶层的期望...
1 映射到日常管理中，...
1 生产力决定生产关系...
1 随着现生产活动和社...
2 改革前，权力过分集...
2 权力集中在战争和建...
2 权力集中的帝制是对...
```


# 参考

* [langchain vectorstores](https://python.langchain.com/v0.2/docs/how_to/vectorstores/)
* [chroma](https://github.com/chroma-core/chroma)
* [Docker Hub Mirrors](https://cloud.google.com/artifact-registry/docs/pull-cached-dockerhub-images?hl=zh-cn)
