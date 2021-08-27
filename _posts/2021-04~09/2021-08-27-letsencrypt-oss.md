---
layout: post
title:  "如何设置阿里云 OSS 的免费 SSL 证书"
date:  2021-08-10
tags: [CDN]
---

阿里云 OSS 的 CDN 加速，设置免费的 Let's Encrypt 证书，并利用函数计算 + 定时任务自动续期。


## 基础操作

使用命令行，手动实现。为避免各种环境问题，推荐使用 docker 进行。

获取证书：
* --it  interactive & tty
* --rm remove when exits
* --name docker name
* -v volume

```sh
 docker run -it --rm --name certbot -v "/Users/zhoukeke/letsencrypt:/etc/letsencrypt" -v "/Users/zhoukeke/letsencryptlib:/var/lib/letsencrypt" certbot/certbot certonly --manual
```

certbot 参数参考：https://certbot.eff.org/docs/using.html#manual

完整的 bash 历史

```bash
(base) ➜  ~ docker run -it --rm --name certbot -v "/Users/zhoukeke/letsencrypt:/etc/letsencrypt" -v "/Users/zhoukeke/letsencryptlib:/var/lib/letsencrypt" certbot/certbot certonly --manual
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Please enter the domain name(s) you would like on your certificate (comma and/or
space separated) (Enter 'c' to cancel): xxxxxx.com
Requesting a certificate for xxxxxx.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Create a file containing just this data:

lkTYxxxxxxxxxxxx.1gDxxxxxxx

And make it available on your web server at this URL:

http://xxxxxx.com/.well-known/acme-challenge/lkTYxxxxxxxxxxxx

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/xxxxxx.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/xxxxxx.com/privkey.pem
This certificate expires on 2021-10-13.
These files will be updated when the certificate renews.

NEXT STEPS:
- This certificate will not be renewed automatically. Autorenewal of --manual certificates requires the use of an authentication hook script (--manual-auth-hook) but one was not provided. To renew this certificate, repeat this same certbot command before the certificate's expiry date.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

```

然后在 oss 地址上放相关文件来回应  http-01 challenge

生成完成之后，可以将目录中的 fullchain.pem 和 privkey.pem 上传到 SSL 证书控制台即可。


## NodeJS 获取证书

通过 GreenLock，并自定义 OSS challenge 即可。说实话，这个库的文档写得真是有些不友好。。。

* Let's Encrypt 官方包 https://npmjs.com/greenlock
* 自己简单封装的 oss challenge http://npmjs.com/acme-http-01-oss

```js
'use strict';
const Greenlock = require('greenlock');
const email = 'xxx@xxx.com';

// domain: xxx.1688.com
// ossConfig: { accessKeyId, accessKeySecret, region, bucket }
module.exports = (domain, ossConfig, workdir) =>
  new Promise((resolve, reject) => {

    const greenlock = Greenlock.create({
      configDir: './config',
      packageRoot: workdir,
      packageAgent: 'Greenlock/v1.0',
      maintainerEmail: email,
      // staging: true,
      notify: function (event, details) {
        console.log(event, details);

        if ('error' === event) {
          reject(details)
        }

        if ('cert_issue' === event) {
          resolve();
        }
      },
    });

    greenlock.manager.defaults({
      agreeToTerms: true,
      subscriberEmail: email,
      challenges: {
        'http-01': {
          module: 'acme-http-01-oss',
          ...ossConfig
        },
      },
    });

    greenlock
      .add({
        subject: domain,
        altnames: [domain],
      })
      .then(function (data) {
        console.log('data, ', data);
      })
      .catch(function (e) {
        reject(e);
      });
  });

```

## NodeJS 更新 CDN 证书

通过 OpenAPI https://next.api.aliyun.com/iframe/Cdn/2018-05-10/SetDomainServerCertificate?workbench-no-header=true&tab=DEMO，可以很轻松地集成自动更新。

```js
const Core = require('@alicloud/pop-core');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

// CDN 域名查看：https://cdn.console.aliyun.com/domain/detail/xxxx.com/https
// SSL 证书查看：https://yundun.console.aliyun.com/?p=cas#/certExtend/upload

module.exports = ({ accessKeyId, accessKeySecret, domain, workdir }) =>
  new Promise((resolve, reject) => {
    const client = new Core({
      accessKeyId,
      accessKeySecret,
      // securityToken: '<your-sts-token>', // use STS Token
      endpoint: 'https://cdn.aliyuncs.com',
      apiVersion: '2018-05-10',
    });

    const params = {
      DomainName: domain,
      ServerCertificateStatus: 'on',
      ForceSet: '1',
      PrivateKey: fs.readFileSync(
        path.join(workdir, './config/live/' + domain, './privkey.pem')
      ),
      ServerCertificate: fs.readFileSync(
        path.join(workdir, './config/live/' + domain, './fullchain.pem')
      ),
      CertName: domain + moment().format('_YYYY-MM-DD_HH-mm-ss'),
    };

    const requestOption = {
      method: 'POST',
    };

    client.request('SetDomainServerCertificate', params, requestOption).then(
      result => {
        resolve(result);
      },
      ex => {
        reject(ex);
      }
    );
  });

```


## 函数计算部署并定时触发

这块简单，基本略过。

* 函数计算：https://www.aliyun.com/product/fc
* 定时任务：https://schedulerx2.console.aliyun.com/cn-hangzhou/JobList