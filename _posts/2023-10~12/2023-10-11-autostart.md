---
layout: post
title:  "Linux 自启动"
date:  2023-10-11
tags: [note]
---

  由于部分 LLM 需要自启动执行，故简要记录一下。

# 命令

```sh
$ touch /root/autostart.sh
$ chmod +x /etc/rc.d/rc.local
$ echo "bash /root/autostart.sh" >> /etc/rc.d/rc.local
```

* `.bashrc` 只会在 terminal 登录后执行，未登录的时候，并不会执行，所以需要放在 `/etc/rc.d/rc.local` 中

# autostart.sh

```sh
#!/bin/bash

now=$(date +"%I:%M:%S")
echo "autostart.sh at $now" >> ~/log

sleep 3

echo "current GPU status:" >> ~/log
nvidia-smi >> ~/log

sleep 3

now=$(date +"%I:%M:%S")
echo "autostart.sh end $now" >> ~/log
```

# CreateInstance

```js
// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import Ecs20140526, * as $Ecs20140526 from '@alicloud/ecs20140526';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';


export default class Client {

  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId, accessKeySecret) {
    let config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId: accessKeyId,
      // 必填，您的 AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // Endpoint 请参考 https://api.aliyun.com/product/Ecs
    config.endpoint = `ecs.cn-zhangjiakou.aliyuncs.com`;
    return new Ecs20140526.default(config);
  }

  static async main() {
    // 请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID 和 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例使用环境变量获取 AccessKey 的方式进行调用，仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
    let client = Client.createClient(process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'], process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET']);
    let runInstancesRequest = new $Ecs20140526.RunInstancesRequest({
      regionId: "cn-zhangjiakou",
      imageId: "m-xxxx",
      instanceType: "ecs.gn6v-c8g1.2xlarge",

      // VPS 机器，必须制定，否则无法使用 gpu 服务器
      vSwitchId: "vsw-xxx",
      // 安全组
      securityGroupId: "sg-xxx",
      // 按量付费
      instanceChargeType: "PostPaid",
      // 实例名称
      instanceName: "ChatGLM",
      // 密码，必须字母、数字、符号
      password: "xxx",
    });
    let runtime = new $Util.RuntimeOptions({ });
    try {
      // 复制代码运行请自行打印 API 的返回值
      const res = await client.runInstancesWithOptions(runInstancesRequest, runtime);
      console.log(JSON.stringify(res, null, 2));
    } catch (error) {
      console.error(error)
      // 如有需要，请打印 error
      // Util.assertAsString(error.message);
    }
  }

}

Client.main(process.argv.slice(2));
```

# References

* https://operavps.com/docs/run-command-after-boot-in-linux/
* https://www.cyberciti.biz/faq/how-to-read-time-in-shell-script/
* https://next.api.aliyun.com/api/Ecs/2014-05-26/RunInstances?params={%22RegionId%22:%22cn-zhangjiakou%22}

