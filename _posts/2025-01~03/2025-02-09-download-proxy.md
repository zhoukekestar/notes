---
layout: post
title:  "一种下载加速的代理方式"
date:  2025-02-09
tags: [proxy]
---

  由于下载 github 中 release 包的时候，或下载其他 jar、rust、docker 依赖的时候，速度往往只有 100KB 不到，所以，探讨一种下载海外资源的加速方式。

# 基本思路


  使用海外的函数计算服务，将文件快速下载到指定的存储系统，这里典型的搭配是：

* AWS 方案：Lambda + S3
  * 此方案有个好处是 Lambda 可以返回 HTML 页面，阿里云 FC 由于备案审核等问题，无法显示页面，会被强制下载。
* Aliyun 方案：FC + OSS


# AWS 方案

  AWS 方案在开源社区比较多，所以有较为成熟的库：`smart_open`，相关代码如下：

```python
import json
from smart_open import open

html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello from Lambda</title>
</head>
<body>
    <form>
        <input name="key" value="2025HH4B4WVC52WNSCGW" />
        <input name="url" />
        <input type="submit" />
    </form>
</body>
</html>
"""

def lambda_handler(event, context):

    # 获取查询字符串参数
    query_params = event.get('queryStringParameters', {})

    # 获取特定的参数值
    key = query_params.get('key')
    url = query_params.get('url')

    # 此处的 key 是为了避免陌生人的攻击
    defkey = "xxx"

    if defkey == key:

        if url == "":
             return {
                'statusCode': 200,
                "headers": {
                    "Content-Type": "text/html"  # 设置 Content-Type 为 text/html
                },
                'body': html_content,
            }
        else:
            ########################################
            # 核心代码就两句，请求 URL 内容，然后写入 S3
            ########################################
            with open(url, 'rb') as fin:
                with open('s3://$keyid:$secret@$bucket/$path', 'wb') as fout:
                    fout.write(fin.read())
                    # for line in fin:
                    #     fout.write(line)
    else:
        return {
            'statusCode': 200,
            'body': json.dumps('KEY ERROR!')
        }

    return {
        'statusCode': 200,
        'body': json.dumps('download from https://xxx.amazonaws.com/download!')
    }
```

需要注意的是，依赖要安装在当前目录，并和上诉代码一起打包上传

* `pip3 install smart_open -t ./`
* `zip -r lambda.zip .`

参考 [](https://stackoverflow.com/questions/48912253/aws-lambda-unable-to-import-module-lambda-function-no-module-named-requests)


> 后续发现 S3 的下载速度也不快，所以，又尝试了阿里云方案


# 阿里云方案

  阿里云方案与 AWS 类似，只是换了 OSS，相关依赖也需要本地安装，并打包一起上传。

```js
// index.mjs
import OSSClient from 'ali-oss'
import stream from 'node:stream'

export const handler = async (event, context) => {
  console.log(event.toString())

  const query = JSON.parse(event.toString()).queryParameters;

  console.log('query', query)
  if (!query || !query.key || query.key != process.env.key) {
    return {
      message: 'key is required!'
    }
  }

  if (!query.url) {
    return {
      message: 'url is required!'
    }
  }

  var ossClient = new OSSClient({
    accessKeyId: process.env.accessKeyId,
    accessKeySecret: process.env.accessKeySecret,
    region: 'oss-ap-southeast-1',
    bucket: 'fc-download-proxy',
    // 设置secure为true，使用HTTPS，避免生成的下载链接被浏览器拦截
    secure: true,
    authorizationV4: true
  })

  try {
    const fileName = "download";

    // 下载并上传 oss
    const response = await fetch(
      query.url
    )
    const rs = stream.Readable.fromWeb(response.body)
    let result = await ossClient.putStream(fileName, rs)


    // OSS 是私有的，所以需要返回临时授权地址
    let downloadUrl = await ossClient.signatureUrlV4('GET', 3600, {
        headers: {} // 请根据实际发送的请求头设置此处的请求头
    }, fileName);

    return {
      downloadUrl
    }

  } catch (error) {
    return {
      message: 'error',
      error,
    }
  }
}
```


# References

* [相关仓库](https://github.com/zhoukekestar/download-accelerator)
