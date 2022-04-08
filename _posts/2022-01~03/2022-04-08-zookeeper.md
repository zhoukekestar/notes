---
layout: post
title: "ZooKeeper"
date: 2022-04-08
tags: [note]
---

> ZooKeeper is a centralized service for maintaining configuration information, naming, providing distributed
synchronization, and providing group services.


## 应用场景

* 数据发布/订阅
* 负载均衡
* 命名服务
* 分布式协调/通知
* 集群管理
* Master 选举
* 分布式锁
* 分布式队列


## 对比

如果场景未应用配置的强一致分发，类比到阿里内部，就是 Diamond，在阿里云售卖产品为 ACM。

<table class="table" id="table-hbx-ktq-m2b">
  <caption></caption>
  <colgroup>
    <col style="width:20%">
    <col style="width:20%">
    <col style="width:20%">
    <col style="width:20%">
    <col style="width:20%">
  </colgroup>
  <thead class="thead" id="thead-0ij-764-ve8">
    <tr id="row-qlv-igx-3m2">
        <th class="entry" id="concept-wbn-3sq-m2b-entry-g3v-l0p-sb6" data-spm-anchor-id="a2c4g.11186623.0.i6.75d53f49RUBsYo">产品</th>
        <th class="entry" id="concept-wbn-3sq-m2b-entry-1pk-g16-6b3">ACM</th>
        <th class="entry" id="concept-wbn-3sq-m2b-entry-2id-zno-1dw">Spring Cloud Config Server</th>
        <th class="entry" id="concept-wbn-3sq-m2b-entry-c2x-zh7-00r">ZooKeeper</th>
        <th class="entry" id="concept-wbn-3sq-m2b-entry-aqy-oyh-ubr" data-spm-anchor-id="a2c4g.11186623.0.i5.75d53f49RUBsYo">ETCD</th>
    </tr>
  </thead>
  <tbody class="tbody" id="tbody-lud-5e7-7yl">
    <tr id="row-m7n-u11-y9y">
        <td class="entry" id="entry-mt5-4j5-v0a">配置修改</td>
        <td class="entry" id="entry-hn2-78b-zd8">直接在 ACM 控制台上进行配置修改</td>
        <td class="entry" id="entry-4fq-7e1-s89">一般在 Git 仓库上进行配置修改</td>
        <td class="entry" id="entry-0ty-203-ygy">通过调用 ZK API 修改</td>
        <td class="entry" id="entry-f6a-2ff-s5a">通过调用 etcd API 修改</td>
    </tr>
    <tr id="row-4ll-v2h-7s7">
        <td class="entry" id="entry-qq9-zb1-27i">配置自动推送</td>
        <td class="entry" id="entry-inj-pu7-qo6">修改过的配置自动推送到监听的客户端</td>
        <td class="entry" id="entry-gw5-2y7-9jr">客户端只能在启动的时候加载</td>
        <td class="entry" id="entry-qc6-iv1-0ao">修改过的配置自动推送到监听的客户端</td>
        <td class="entry" id="entry-b7b-ko3-9nh">修改过的配置自动推送到监听的客户端</td>
    </tr>
    <tr id="row-h8p-xxn-y8b">
        <td class="entry" id="entry-evy-tg1-wlt">API接口</td>
        <td class="entry" id="entry-6bc-vep-f43">基于 RESTful API，同时支持 Java Native 接口，Spring Cloud 接口，和其他语言类接口</td>
        <td class="entry" id="entry-614-ahw-9b9">基于 RESTful API 和 Spring Cloud 规范，同时也支持其他语言客户端</td>
        <td class="entry" id="entry-5yl-no3-6bu">支持 Java 原生接口</td>
        <td class="entry" id="entry-ljy-zuw-ndx">基于 RESTful API 的接口</td>
    </tr>
    <tr id="row-vgp-fda-ndu">
        <td class="entry" id="entry-ydn-i4a-zn3">版本管理</td>
        <td class="entry" id="entry-4mm-a3o-slv">在 ACM 上自动记录各个修改的版本信息</td>
        <td class="entry" id="entry-h08-4rp-nw0">通过 Git 间接管理版本</td>
        <td class="entry" id="entry-acu-970-d0m">不带任何版本控制</td>
        <td class="entry" id="entry-ly3-9fm-ny4">不带任何版本控制</td>
    </tr>
    <tr id="row-ghb-xag-8m0">
        <td class="entry" id="entry-lo5-dkx-xd7">配置推送追踪</td>
        <td class="entry" id="entry-d7p-c6d-981">可查询所有客户端配置推送状态和轨迹</td>
        <td class="entry" id="entry-3da-3il-yte">无法查询配置推送历史</td>
        <td class="entry" id="entry-hqy-zaf-s4h">无法查询配置推送历史</td>
        <td class="entry" id="entry-4a2-akz-1hs">无法查询配置推送历史</td>
    </tr>
  </tbody>
</table>

## Quick Start

参考 [start](https://zookeeper.apache.org/doc/r3.3.3/zookeeperStarted.html) 文档。

* 添加 `zoo.cfg` 文件，内容如下：
```
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/Users/zhoukeke/Downloads/apache-zookeeper-3.8.0-bin/tmp/zookeeper
clientPort=2181
```

* 启动 `bin/zkServer.sh start`

```
# bin/zkServer.sh start
ZooKeeper JMX enabled by default
Using config: /Users/zhoukeke/Downloads/apache-zookeeper-3.8.0-bin/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
```

* 连接 `bin/zkCli.sh -server 127.0.0.1:2181`

```
$bin/zkCli.sh -server 127.0.0.1:2181
Connecting to 127.0.0.1:2181
2022-04-08 15:08:56,133 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:zookeeper.version=3.8.0-5a02a05eddb59aee6ac762f7ea82e92a68eb9c0f, built on 2022-02-25 08:49 UTC
2022-04-08 15:08:56,134 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:host.name=localhost
2022-04-08 15:08:56,134 [myid:] - INFO  [main:o.a.z.Environment@98] - Client environment:java.version=17.0.2
2022-04-08 15:08:56,134 [myid:] - INFO  [main:o.a.z.Environment@98]
...
[zk: 127.0.0.1:2181(CONNECTED) 0] help
[zk: 127.0.0.1:2181(CONNECTED) 3] create /zk_pipe_test "hello zk_pipe_test"
Created /zk_pipe_test
[zk: 127.0.0.1:2181(CONNECTED) 4] get /zk_pipe_test
hello zk_pipe_test
[zk: 127.0.0.1:2181(CONNECTED) 6] ls /
[zk_pipe_test, zookeeper]
```

## Java Example

#### Dependencies

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.zookeeper</groupId>
        <artifactId>zookeeper</artifactId>
        <version>3.4.8</version>
    </dependency>
</dependencies>
```
#### Code

```java
package com.demo.zookeeper;

import java.io.IOException;

import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;

public class Main implements Watcher {

	public static void main(String[] args) throws IOException, KeeperException, InterruptedException {
		ZooKeeper zk = new ZooKeeper("127.0.0.1:2181", 3000, new Main());

		byte[] bytes = zk.getData("/zk_pipe_test", false, null);

		System.out.println(new String(bytes));
	}

	public void process(WatchedEvent event) {
		// TODO Auto-generated method stub
		System.out.println(event);
	}
}
```

#### output

```
log4j:WARN No appenders could be found for logger (org.apache.zookeeper.ZooKeeper).
log4j:WARN Please initialize the log4j system properly.
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
WatchedEvent state:SyncConnected type:None path:null
hello zk_pipe_test

```

## One More Thing

Paxos, 分布式一致性算法， https://zhuanlan.zhihu.com/p/31780743

## References

* [Paxos](https://en.wikipedia.org/wiki/Paxos_%28computer_science%29)
* [zookeeper](https://zookeeper.apache.org/index.html)
* [ACM](https://help.aliyun.com/document_detail/59957.html)
* [应用场景](https://zhuanlan.zhihu.com/p/59669985)
* [start](https://zookeeper.apache.org/doc/r3.3.3/zookeeperStarted.html)
* https://zookeeper.apache.org/doc/r3.3.3/javaExample.html#ch_Introduction
* https://ihong5.wordpress.com/2014/05/27/maven-how-to-connect-to-a-zookeeper-in-java/