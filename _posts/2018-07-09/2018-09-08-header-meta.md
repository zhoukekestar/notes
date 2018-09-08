---
layout: post
title:  "编码问题 UTF-8 & GBK"
date:   2018-09-08
tags: [js]
commentIssueId: 94
---

记一次奇怪的编码问题。
* Meta Element vs Response Header
* Meta 的作用？
* 一个细节
* 细节对编码的影响



## Meta Element vs Response Header

一个 GBK 编码页面，使用 meta 指定页面编码和使用 response header 指定页面编码。哪个优先级比较高？



#### Case 1

Header 为 utf-8
Meta 为 gbk

```sh
$  curl -i  http://127.0.0.1:3000/utf-1
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html;charset=utf-8
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Sat, 08 Sep 2018 03:53:26 GMT
ETag: W/"129-165b7502163"
Content-Length: 297
Date: Sat, 08 Sep 2018 03:54:25 GMT
Connection: keep-alive

<html>
<meta charset="gbk">
<p>
中文（使用 encodeURIComponent ）：
<script>
  document.write(encodeURIComponent('中文'));
</script>
</p>
<p>页面跳转（使用 a 标签）：
<a href='/?p=中文'>
<script>
  document.write(document.querySelector('a').href);
</script>
</a>
</p>
</html>
```

![](https://user-images.githubusercontent.com/7157346/45250079-c187cb80-b35e-11e8-8c71-e8e82c840c4e.png)


#### Case 2
Header 为 gbk
Meta 为 utf-8
```sh
$ curl -i  http://127.0.0.1:3000/utf-2
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html;charset=gbk
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Sat, 08 Sep 2018 03:53:44 GMT
ETag: W/"12b-165b750666a"
Content-Length: 299
Date: Sat, 08 Sep 2018 03:54:31 GMT
Connection: keep-alive

<html>
<meta charset="utf-8">
<p>
中文（使用 encodeURIComponent ）：
<script>
  document.write(encodeURIComponent('中文'));
</script>
</p>
<p>页面跳转（使用 a 标签）：
<a href='/?p=中文'>
<script>
  document.write(document.querySelector('a').href);
</script>
</a>
</p>
</html>
```

![](https://user-images.githubusercontent.com/7157346/45250078-bf257180-b35e-11e8-92a5-c36f67f2b750.png)

#### 结论

Response Header 编码优先级高于 meta 信息



## Meta 的作用？

既然 response header 优先级比较高，那要使 meta 生效，需要先设置 content-type 为空，然后再用 meta 指定编码，验证一下



#### 不设置 header，指定 meta 编码为 utf-8

> 注意 response header 中没有 content-type 了
> 由于 shell 编码是采用 utf-8 的，所有在终端中会显示乱码
> 能看清 meta 信息即可


```sh
$ curl -i http://127.0.0.1:3000/gbk-1
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: null
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Sat, 08 Sep 2018 04:05:23 GMT
ETag: W/"115-165b75b105c"
Content-Length: 277
Date: Sat, 08 Sep 2018 04:06:51 GMT
Connection: keep-alive

<html>
<meta charset="utf-8">
<p>
</p>
</html>
```

浏览器效果：
![](https://user-images.githubusercontent.com/7157346/45250160-1c6df280-b360-11e8-8dfe-7df94d108a06.png)



#### 不设置 header，指定 meta 编码为 gbk

```sh
$ curl -i http://127.0.0.1:3000/gbk-2
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: null
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Sat, 08 Sep 2018 04:05:27 GMT
ETag: W/"113-165b75b22f9"
Content-Length: 275
Date: Sat, 08 Sep 2018 04:07:03 GMT
Connection: keep-alive

<html>
<meta charset="gbk">
<p>
</p>
</html>
```

效果
![](https://user-images.githubusercontent.com/7157346/45250161-1c6df280-b360-11e8-89f0-29177b9744ad.png)



#### 结论

在未指定 content-type header 的情况下，可以使用 meta 标签指定页面编码




## 一个细节

我们把能正常编码的页面放一起看

#### utf-1 页面
![](https://user-images.githubusercontent.com/7157346/45250079-c187cb80-b35e-11e8-8c71-e8e82c840c4e.png)

#### gbk-2 页面
![](https://user-images.githubusercontent.com/7157346/45250161-1c6df280-b360-11e8-89f0-29177b9744ad.png)


#### 现象
我们发现，不管是 GBK 页面还是 UTF 页面，使用 `encodeURIComponent('中文')` 后的编码都为 `%E4%B8%AD%E6%96%87` 。也就是说无论页面编码，`encodeURIComponent` 都使用 UTF 进行编码。

但使用 a 标签，将中文字符放在 HTML 代码中，或在 js 中直接使用 `location.href = '/?p=中文'` 进行跳转，该编码格式会与页面编码有关。如上图中，UTF 页面会将中文编码成 `%E4%B8%AD%E6%96%87`, GBK 页面会将中文编码成 `%D6%D0%CE%C4`，这里面坑就比较大了。



## 编码细节的影响

### Nodejs
在 nodejs 中，使用 express 框架，分别请求 `http://127.0.0.1:3000/?p=%D6%D0%CE%C4` 和 `http://127.0.0.1:3000/?p=%E4%B8%AD%E6%96%87` ，使用 `req.query.xxx` 获取 url 参数时，会分别返回 `%D6%D0%CE%C4` 和 `中文`，这点也比较好，默认会使用 utf-8 解码，不行的返回原编码。

使用 GBK to UTF 的编码解决即可。

### Java Servlet

> 不像 Nodejs，Java 编码不正确设置，会乱码

```java
@WebServlet("/GBK")
public class GBK extends HttpServlet {

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 设置为 GBK 编码
		request.setCharacterEncoding("GBK");

		String name =request.getParameter("name");

		response.setContentType("text/html; charset=utf-8");
		response.getWriter().append("Hello " + name);
	}
}
```

```sh
~ curl -i http://localhost:8080/servlet/GBK\?name\=%D6%D0%CE%C4
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Type: text/html;charset=utf-8
Content-Length: 12
Date: Sat, 08 Sep 2018 06:47:52 GMT

Hello 中文%
```

⚠️ 其中需要注意的是，URL 中由于是 GBK 编码，实际处理过程中：
* [processParameters(MessageBytes data, java.lang.String encoding) ](https://tomcat.apache.org/tomcat-5.5-doc/catalina/docs/api/org/apache/tomcat/util/http/Parameters.html#processParameters) 中的 encoding ，是
[org.apache.catalina.connector.Request](https://tomcat.apache.org/tomcat-5.5-doc/catalina/docs/api/org/apache/catalina/connector/Request.html):parseParameters 方法设置的，相关代码如下：
```java
// 从 connector 中拿到配置项
boolean useBodyEncodingForURI = connector.getUseBodyEncodingForURI();
if (enc != null) {
    parameters.setEncoding(enc);
    // 配置了 bodyencodingforuri 才对 uri 进行制定编码 decode
    if (useBodyEncodingForURI) {
        parameters.setQueryStringEncoding(enc);
    }
} else {
    parameters.setEncoding
        (org.apache.coyote.Constants.DEFAULT_CHARACTER_ENCODING);
    if (useBodyEncodingForURI) {
        parameters.setQueryStringEncoding
            (org.apache.coyote.Constants.DEFAULT_CHARACTER_ENCODING);
    }
}
// 处理 query 参数
parameters.handleQueryParameters();
```
* 而 useBodyEncodingForURI 需要容器侧设置，如：tomcat 中的 server.xml
  ```xml
  <Connector useBodyEncodingForURI="true"/>
  ```


## References
* [Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)
* [所有编码格式](http://www.iana.org/assignments/character-sets/character-sets.xhtml)
* [相关源码](https://github.com/zhoukekestar/drafts/tree/master/2018-07~12/2018-09-07-express-charset)
