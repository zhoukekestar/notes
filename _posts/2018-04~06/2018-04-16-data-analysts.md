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




## 数据智能产品关系

SLB 做网关，ECS 做应用服务器，RDS 作为实时数据的落盘，RDS 应用数据通过 MaxCompute （ODPS）做离线计算，并将分析数据存入 AnalyticDB 数据库。

![tb1xf9rqpxxxxbfxxxxxxxxxxxx-1371-1016](https://user-images.githubusercontent.com/7157346/39095228-8f1212d4-466f-11e8-91cb-35077d9ea771.png)

![default](https://user-images.githubusercontent.com/7157346/39095272-5949f0bc-4670-11e8-95ee-902ecf23f362.png)



## 图计算应用场景

[《阿里技术参考图册》](https://link.zhihu.com/?target=https%3A//102.alibaba.com/downloadFile.do%3Ffile%3D1523962960197/AliTech101_RD.pdf) 33 - 36

![](https://user-images.githubusercontent.com/7157346/39095183-01014834-466f-11e8-94bf-fd6cb65ad2e7.png)

![](https://user-images.githubusercontent.com/7157346/39095184-01489d4c-466f-11e8-9e5c-f785e2ae3b04.png)

![](https://user-images.githubusercontent.com/7157346/39095185-0192f46e-466f-11e8-891e-053f2bb78468.png)

![](https://user-images.githubusercontent.com/7157346/39095187-01dc0a46-466f-11e8-94e1-568e993a470d.png)



## References

* [MaxCompute](https://help.aliyun.com/document_detail/27800.html?spm=a2c4g.11186623.6.539.0LAFKO)
* [DataWorks](https://help.aliyun.com/document_detail/30256.html?spm=a2c4g.11186623.2.4.IZOqgL)
* [阿里技术-研发篇](http://techforum-img.cn-hangzhou.oss-pub.aliyun-inc.com/1523962960197/AliTech101_RD.pdf?Expires=1524405048&OSSAccessKeyId=LTAIAJ2WBIdlRPlb&Signature=aC46wc6UD8uZHA20poAOkuTBGHo%3D)
* ​