---
layout: post
title:  "阿里数据智能"
date:   2018-04-22
tags: [note]
commentIssueId: 77
---

阿里[数据智能](https://data.aliyun.com/?spm=5176.192645.765261.16.3b6c3c24xOsJgt), 包括 
* MaxCompute （原ODPS）
* DataWork
* MapReduce 等
在此，梳理一下产品的关系，还有图计算的应用场景，并简单说明了一下 MapReduce 的基本原理。



## 数据智能产品关系

SLB 做网关，ECS 做应用服务器，RDS 作为实时数据的落盘，RDS 应用数据通过 MaxCompute （ODPS）做离线计算，并将分析数据存入 AnalyticDB 数据库。

![tb1xf9rqpxxxxbfxxxxxxxxxxxx-1371-1016](https://user-images.githubusercontent.com/7157346/39095228-8f1212d4-466f-11e8-91cb-35077d9ea771.png)



大数据开发套件，可以使用离线计算和实时计算将原始数据进行采集接入，在接入应用数据后，通过 MaxCompute （包括 MapReduce，机器学习等）或其他工作流二次分析处理数据，在生成新数据后，通过数据同步工具，将数据同步至报表等用于分析或展示。

![default](https://user-images.githubusercontent.com/7157346/39095272-5949f0bc-4670-11e8-95ee-902ecf23f362.png)



## 图计算应用场景

一直不太理解图计算的应用场景，在新出的阿里技术的介绍中，有简单介绍一下，包括

* 个性化推荐
* 刷单等异常检测
* 关联搜索

[《阿里技术参考图册》](https://link.zhihu.com/?target=https%3A//102.alibaba.com/downloadFile.do%3Ffile%3D1523962960197/AliTech101_RD.pdf) 33 - 36

![](https://user-images.githubusercontent.com/7157346/39095183-01014834-466f-11e8-94bf-fd6cb65ad2e7.png)

![](https://user-images.githubusercontent.com/7157346/39095184-01489d4c-466f-11e8-9e5c-f785e2ae3b04.png)

![](https://user-images.githubusercontent.com/7157346/39095185-0192f46e-466f-11e8-891e-053f2bb78468.png)

![](https://user-images.githubusercontent.com/7157346/39095187-01dc0a46-466f-11e8-94e1-568e993a470d.png)





## MapReduce 说明

> 该文档来自阿里云，整理说明得很不错。

MaxCompute 提供了三个版本的 MapReduce 编程接口，如下所示：

- MaxCompute MapReduce：MaxCompute 的原生接口，执行速度更快。开发更便捷，不暴露文件系统。
- [MR2](https://help.aliyun.com/document_detail/27876.html)（扩展 MapReduce）：对 MaxCompute MapReduce 的扩展，支持更复杂的作业调度逻辑。Map/Reduce 的实现方式与 MaxCompute 原生接口一致。
- 以及 [Hadoop 兼容版本](https://help.aliyun.com/document_detail/44626.html)：高度兼容 [Hadoop MapReduce](http://hadoop.apache.org/docs/r1.0.4/cn/mapred_tutorial.html) ，与 MaxCompute 原生 MapReduce，[MR2](https://help.aliyun.com/document_detail/27876.html) 不兼容。

以上三个版本在 [基本概念](https://help.aliyun.com/document_detail/27879.html)，[作业提交](https://help.aliyun.com/document_detail/27878.html)，[输入输出](https://help.aliyun.com/document_detail/27880.html)，[资源使用](https://help.aliyun.com/document_detail/27881.html) 等方面基本一致，不同的是 Java SDK 彼此不同。本文仅对 MapReduce 的基本原理做简单介绍，更多详情请参见 [Hadoop MapReduce 教程](http://hadoop.apache.org/docs/r1.0.4/cn/mapred_tutorial.html)。

> **注意**：
>
> 您还不能够通过 MapReduce 读写“外部表”中的数据。

#### 应用场景

MapReduce 最早是由 Google 提出的分布式数据处理模型，随后受到了业内的广泛关注，并被大量应用到各种商业场景中。示例如下：

- 搜索：网页爬取、倒排索引、PageRank。
- Web 访问日志分析：
  - 分析和挖掘用户在 Web 上的访问、购物行为特征，实现个性化推荐。
  - 分析用户访问行为。
- 文本统计分析：
  - 莫言小说的 WordCount、词频 TFIDF 分析。
  - 学术论文、专利文献的引用分析和统计。
  - 维基百科数据分析等。
- 海量数据挖掘：非结构化数据、时空数据、图像数据的挖掘。
- 机器学习：监督学习、无监督学习、分类算法如决策树、SVM 等。
- 自然语言处理：
  - 基于大数据的训练和预测。
  - 基于语料库构建单词同现矩阵，频繁项集数据挖掘、重复文档检测等。
- 广告推荐：用户点击（CTR）和购买行为（CVR）预测。

#### 处理流程

MapReduce 处理数据过程主要分成 Map 和 Reduce 两个阶段。首先执行 Map 阶段，再执行 Reduce 阶段。Map 和 Reduce 的处理逻辑由用户自定义实现，但要符合 MapReduce 框架的约定。处理流程如下所示：

1. 在正式执行 Map 前，需要将输入数据进行 **分片**。所谓分片，就是将输入数据切分为大小相等的数据块，每一块作为单个 Map Worker 的输入被处理，以便于多个 Map Worker 同时工作。
2. 分片完毕后，多个 Map Worker 便可同时工作。每个 Map Worker 在读入各自的数据后，进行计算处理，最终输出给 Reduce。Map Worker 在输出数据时，需要为每一条输出数据指定一个 Key，这个 Key 值决定了这条数据将会被发送给哪一个 Reduce Worker。Key 值和 Reduce Worker 是多对一的关系，具有相同 Key 的数据会被发送给同一个 Reduce Worker，单个 Reduce Worker 有可能会接收到多个 Key 值的数据。
3. 在进入 Reduce 阶段之前，MapReduce 框架会对数据按照 Key 值排序，使得具有相同 Key 的数据彼此相邻。如果您指定了 **合并操作（Combiner）**，框架会调用 Combiner，将具有相同 Key 的数据进行聚合。Combiner 的逻辑可以由您自定义实现。与经典的 MapReduce 框架协议不同，在 MaxCompute 中，Combiner 的输入、输出的参数必须与 Reduce 保持一致，这部分的处理通常也叫做 **洗牌（Shuffle）**。
4. 接下来进入 Reduce 阶段。相同 Key 的数据会到达同一个 Reduce Worker。同一个 Reduce Worker 会接收来自多个 Map Worker 的数据。每个 Reduce Worker 会对 Key 相同的多个数据进行 Reduce 操作。最后，一个 Key 的多条数据经过 Reduce 的作用后，将变成一个值。

> **注意**：
>
> 上文仅是对 MapReduce 框架做简单介绍，更多详情请查阅其他相关资料。

下文将以 WordCount 为例，为您介绍 MaxCompute MapReduce 各个阶段的概念。

假设存在一个文本 a.txt，文本内每行是一个数字，您要统计每个数字出现的次数。文本内的数字称为 Word，数字出现的次数称为 Count。如果 MaxCompute Mapreduce 完成这一功能，需要经历以下流程，如下图所示：

![openmr](https://user-images.githubusercontent.com/7157346/39095900-b9e5ceb4-467a-11e8-968a-59479afeb992.jpg)

**操作步骤：**

1. 输入数据：对文本进行分片，将每片内的数据作为单个 Map Worker 的输入。
2. Map 阶段：Map 处理输入，每获取一个数字，将数字的 Count 设置为 1，并将此<Word, Count>对输出，此时以 Word 作为输出数据的 Key。
3. Shuffle > 合并排序：在 Shuffle 阶段前期，首先对每个 Map Worker 的输出，按照 Key 值（即 Word 值）进行排序。排序后进行 Combiner 操作，即将 Key 值（Word 值）相同的 Count 累加，构成一个新的<Word, Count>对。此过程被称为合并排序。
4. Shuffle > 分配 Reduce：在 Shuffle 阶段后期，数据被发送到 Reduce 端。Reduce Worker 收到数据后依赖 Key 值再次对数据排序。
5. Reduce 阶段：每个 Reduce Worker 对数据进行处理时，采用与 Combiner 相同的逻辑，将 Key 值（Word 值）相同的 Count 累加，得到输出结果。
6. 输出结果数据。

> **注意**：
>
> 由于 MaxCompute 的所有数据都被存放在表中，因此 MaxCompute MapReduce 的输入、输出只能是表，不允许您自定义输出格式，不提供类似文件系统的接口。



## References

* [MaxCompute](https://help.aliyun.com/document_detail/27800.html?spm=a2c4g.11186623.6.539.0LAFKO)
* [DataWorks](https://help.aliyun.com/document_detail/30256.html?spm=a2c4g.11186623.2.4.IZOqgL)
* [阿里技术-研发篇](http://techforum-img.cn-hangzhou.oss-pub.aliyun-inc.com/1523962960197/AliTech101_RD.pdf?Expires=1524405048&OSSAccessKeyId=LTAIAJ2WBIdlRPlb&Signature=aC46wc6UD8uZHA20poAOkuTBGHo%3D)
* [阿里云-MapReduce 说明](https://help.aliyun.com/document_detail/27875.html?spm=a2c4g.11186623.2.12.DmSevd)