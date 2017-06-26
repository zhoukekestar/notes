---
layout: post
title:  "HTTP Notes"
date:   2017-06-26
tags: [http]
commentIssueId: 27
---

* HTTP 协议步骤，Anatomy of an HTTP Transaction（剖析HTTP传输协议）。主要有
  * DNS查询
  * 建立连接
  * 发送请求
  * 等待返回
  * 加载数据
* HTTP 2.0
* HTTP协议
  * methods
  * headers
  * status code
* TCP/IP 结构详解

参考和图片来源: [Anatomy of an HTTP Transaction](http://blog.catchpoint.com/2010/09/17/anatomyhttp/)

### 简单的HTTP请求
客户端发送一次简单HTTP请求

![simplehttp1](https://user-images.githubusercontent.com/7157346/27522691-9a63ef24-5a5a-11e7-9c38-4b398d57a15b.png)
1. `DNS查询`: 客户端根据请求解析域名
  * a. 客户端向`ISP`（Internet服务提供商，比如：电信，联通等）提供的DNS服务器发送查询请求
  * b. DNS服务器返回域名的ip地址
2. `连接`：客户端根据 IP 地址和服务器建立 TCP 链接
  * a. 客户端发送 SYN 包
  * b. 服务器发送 SYN-ACK 包
  * c. 客户端响应 ACK 包，通过TCP的三次握手，连接建立。
  > 三次握手的样例参考：[tcp-three-way-handshake](http://www.omnisecu.com/tcpip/tcp-three-way-handshake.php)

3. `发送`：客户端发送HTTP请求至服务器
4. `等待`：客户端等待服务器响应请求
5. `加载`：客户端加载请求内容
  * a. 服务器发送第二段TCP（PSH）
  * b. 客户端发送 ACK （客户端每收到两段TCP后发送ACK）
  * c. 服务器发送第三段TCP段
6. 客户端发送 FIN 包，关闭TCP连接


### 连续的HTTP请求

每个请求都重新建立 `TCP` 连接，`HTTP 1.0` 为该种方式。

![serialhttp1](https://user-images.githubusercontent.com/7157346/27522692-9a8ba500-5a5a-11e7-8a99-edc1bdb977b2.png)

Request 1：

和单次请求相同

Request 2:
* 6： `3路握手`建立`TCP`连接
* 7： 发送请求
* 8： 等待返回
* 9： 加载数据

请求1省略了TCP关闭操作

请求2省略了DNS查询

### 保持连接的HTTP请求

`HTTP 1.1` 为该种方式，如果 `HTTP 1.0` 也想使用该特性的，需要加 `Keep-Alive` 头。

![persistent1](https://user-images.githubusercontent.com/7157346/27522693-9ab04b8a-5a5a-11e7-80bb-70d5b119c4a0.png)

和连续请求的区别是，第二次请求不需要重新建立 `TCP` 连接。

### 平行HTTP请求
![parallelconnections1](https://user-images.githubusercontent.com/7157346/27522694-9ab11f9c-5a5a-11e7-8bb4-4b66f0a932ea.png)

当请求完网页后，网页内剩余的资源和网页内其他网站的资源，会平行下载。图中，加载完`hostname.com`网页后，发现还有`adserver.com`的资源，所以，`Request 2` 和 `Request 4`是平行加载资源的。

浏览器会根据域名，平行发送请求。所以，仅支持`HTTP 1.1` 的浏览器，可以分域名，比如：图片域名，静态资源域名等，来加快网页的加载。

### 不同浏览器默认设置
不同浏览器下，对同一个域名并发数的限制。

![browser2](https://user-images.githubusercontent.com/7157346/27522762-0c25d348-5a5b-11e7-962f-8dbcdb1ff956.png)

## HTTP 2.0
`HTTP/2`的目标包括异步连接复用，头压缩和请求反馈管线化。

主要的特点有：
* HTTP Headers 的压缩
* Server Push
* Pipelining of requests, [请求管线化](https://zh.wikipedia.org/wiki/HTTP%E7%AE%A1%E7%B7%9A%E5%8C%96)，即将多个HTTP批量提交的技术。
* 解决了[队头阻塞](https://zh.wikipedia.org/wiki/%E9%98%9F%E5%A4%B4%E9%98%BB%E5%A1%9E)的问题
* 多路复用，即在一个TCP连接上，请求多个HTTP

## HTTP其他
* [HTTP methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
  * `GET`，请求指定资源数据
  * `POST`，向指定资源提交数据
  * `DELETE`，删除指定资源
  * `PUT`，修改指定资源
  * `HEAD`，获取指定资源元数据，与GET不同的是，不需要返回数据内容
  * `OPTIONS`，请求查看指定资源的HTTP请求方法或权限。比如，跨域AJAX中，会先发送OPTIONS请求，再发送其他请求。
  * `CONNECT`，请求建立管道通讯，通常是客户端和代理服务器之间。
  * `TRACE`，回显服务器收到的请求，主要用于测试或诊断。
  * `PATCH`，修改局部指定资源。和PUT方法的区别是，PUT需要提交指定资源的全部数据。

* [HTTP status codes](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)
  * 1xx, 临时响应，需要继续处理
    * `101 Switching Protocols`, 切换HTTP协议版本，比如从`HTTP 1.1`切换到`HTTP 2.0`，或切换到 `Web Socket`
  * 2xx, 成功，请求已被服务器接受，理解
    * `200 OK`, 请求成功，正常返回
    * `201 Created`, 请求已被实现，通常是客户端POST数据之后返回，表示数据已经被创建了。
  * 3xx, 重定向
    * `301 Moved Permanently`, 请求资源被永久移到新位置
    * `302 Found`, 请求资源被临时重定向
    * `304 Not Modified`, 资源未被修改，使用缓存
  * 4xx, 客户端错误
    * `400 Bad Request`, 明显的客户端请求错误，客户端格式错误等。
    * `403 Forbidden`, 用户权限不够，拒绝执行，比如在用户未登陆的情况下，请求用户的私人保护信息时，返回403，代表用户需要登陆授权才能继续执行。
    * `404 Not Found`, 用户请求的资源没有被找到，比如，某些资源被删除了之后，用户继续请求会返回404。
    * `405 Method Not Allowed`, 用户请求方法不对，比如，需要POST的接口，用户使用了GET请求，返回405错误。
  * 5xx, 服务器错误
    * `500 Internal Server Error`，服务未知错误，比如JAVA后台抛出异常没有处理等。
    * `502 Bad Gateway`，网关（比如：Nginx）收到上游服务器（比如：Tomcat, NodeJS）的无效响应
    * `503 Service Unavailable`，由于服务器维护或过载（请求太多导致没有响应），服务器无法请求请求。
    * `504 Gateway Timeout`，网关在一定时间内没有收到上游服务器的响应（比如：数据库查询太慢），返回此错误。
* HTTP URIs，[统一资源定位符](https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%AE%9A%E4%BD%8D%E7%AC%A6)
  > 统一资源定位符的标准格式如下：<br>
    协议类型:[//服务器地址[:端口号]][/路径]文件名[?查询][#片段]

  以`http://zh.wikipedia.org:80/w/index.php?title=Special:%E9%9A%8F%E6%9C%BA%E9%A1%B5%E9%9D%A2&printable=yes` 为例, 其中：
    * `http`，是协议；
    * `zh.wikipedia.org`，是服务器；
    * `80`，是服务器上的网络端口号；
    * `/w/index.php`，是路径；
    * `?title=Special:%E9%9A%8F%E6%9C%BA%E9%A1%B5%E9%9D%A2&printable=yes`，是查询，其中`title`是`Special...`这串，`printable`是`yes`。
* HTTP header fields, [HTTP头字段列表](https://zh.wikipedia.org/wiki/HTTP%E5%A4%B4%E5%AD%97%E6%AE%B5%E5%88%97%E8%A1%A8)
  * `Accept`, 表示客户端能接受的返回类型，比如：`Accept: application/json`表示，浏览器能够接受服务器返回JSON数据
  * `Cookie`, 设置和获取浏览器Cookie
  * `Host`，服务器的域名
  * `Origin`，浏览网页的上一级地址，比如，通过百度搜索进入在百度百科，百度百科中的请求，就会在该字段设上百度搜索结果页的链接。
  * `User-Agent`，浏览器的身份标识字符串，比如，通过该字段，可以知道你用什么浏览器，版本号是多少，是什么系统等等。


## TCP/IP 包详解
信息来源自：[传输控制协议](https://zh.wikipedia.org/wiki/%E4%BC%A0%E8%BE%93%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE)，[Transmission_Control_Protocol](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)。
> 注意！不用仔细看每个字节代表的意义，直接看HTTP发送流程，在涉及到TCP内容时，再回到这里查询某些字节的含义。

![qq 20170626111356](https://user-images.githubusercontent.com/7157346/27523673-55346364-5a61-11e7-8c0e-a782cd4ef07a.png)

* `Source port`, 来源连接端口（16位）－辨识传送连接端口（0 ~ 65535）
* `Destination port`, 目的连接端口（16位）－辨识接收连接端口
* `Sequence number`, 序列号（seq，32位）
  * 如果含有同步化旗标（SYN），则此为最初的序列号；第一个资料位元的序列码为本序列号加一。
  * 如果没有同步化旗标（SYN），则此为第一个资料位元的序列码。
* `ACK`, 确认号（ack，32位）—期望收到的数据的开始序列号。也即已经收到的数据的字节长度加1。
* `Data offset`, 报头偏移量（4位）—以4字节为单位计算出的数据段开始地址的偏移值。
* `Reserved`, 保留—须置0
* 标志符
  * URG—为1表示高优先级数据包，紧急指标字段有效。
  * ACK—为1表示确认号字段有效
  * PSH—为1表示是带有PUSH标志的数据，指示接收方应该尽快将这个报文段交给应用层而不用等待缓冲区装满。
  * RST—为1表示出现严重差错。可能需要重现建立TCP连接。还可以用于拒绝非法的报文段和拒绝连接请求。
  * SYN—为1表示这是连接请求或是连接接受请求，用于建立连接和使顺序号同步
  * FIN—为1表示发送方没有数据要传输了，要求释放连接。
* `Window Size`, 窗口（16位）—表示从确认号开始，本报文的接受方可以接收的字节数，即接收窗口大小。用于流量控制。
* `Checksum`, 校验和（16位）—对整个的TCP报文段，包括TCP头部和TCP数据，以16位字进行计算所得。这是一个强制性的字段。
* `Urgent pointer`, 紧急指标（16位）—本报文段中的紧急数据的最后一个字节的序号。
* `Options`, 选项字段—最多40字节。每个选项的开始是1字节的kind字段，说明选项的类型。
  * 0：选项表结束（1字节）
  * 1：无操作（1字节）用于选项字段之间的字边界对齐。
  * 2：最大报文段长度（4字节，Maximum Segment Size，MSS）通常在建立连接而设置SYN标志的数据包中指明这个选项，指明本端所能接收的最大长度的报文段。通常将MSS设置为（MTU-40）字节，携带TCP报文段的IP数据报的长度就不会超过MTU，从而避免本机发生IP分片。只能出现在同步报文段中，否则将被忽略。
  * 3：窗口扩大因子（4字节，wscale），取值0-14。用来把TCP的窗口的值左移的位数。只能出现在同步报文段中，否则将被忽略。这是因为现在的TCP接收数据缓冲区（接收窗口）的长度通常大于65535字节。
  * 4：sackOK—发送端支持并同意使用SACK选项。
  * 5：SACK实际工作的选项。
  * 8：时间戳（10字节，TCP Timestamps Option，TSopt）
    * 发送端的时间戳（Timestamp Value field，TSval，4字节）
    * 时间戳回显应答（Timestamp Echo Reply field，TSecr，4字节）
