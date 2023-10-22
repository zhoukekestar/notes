---
layout: post
title:  "Cloudflare Worker"
date:  2023-10-22
tags: [note, proxy]
---

  本文简要记录一下使用 Cloudflare Worker.


# 正确解析 IP

  由于 `*.workers.dev` 的域名在国内是被污染的，所以需要自行制定 IP 来解析。比如：`worker-plain-unit-ff9d.zhoukekestar.workers.dev` 正常在国内访问不了。

  解析域名，使用 DNS Checker 或 多点 ping 工具来正确解析上述域名。

* [https://dnschecker.org/](https://dnschecker.org/#A/worker-plain-unit-ff9d.zhoukekestar.workers.dev)
* [https://tcping8.com/ping/](https://tcping8.com/ping/)


# 找到最快 IP

  将上述能正确解析出的 IP，复制到本地，并使用命令行测试真实本地速度：

```bash
ping 172.67.145.125 -c 5 | grep "ping statistics" -A 2 >> ping.txt
echo "\n\n" >> ping.txt

ping 172.67.145.125 -c 5 | grep "ping statistics" -A 2 >> ping.txt
echo "\n\n" >> ping.txt

... 其他更多 IP
```

> 替换上述 IP 地址，本地 ping 5 次，然后把统计结果的后面几行放到 ping.txt 文件中。

最终的结果文件如下：

```txt
--- 104.21.65.129 ping statistics ---
5 packets transmitted, 5 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 221.213/230.706/249.237/11.201 ms

--- 172.67.145.125 ping statistics ---
5 packets transmitted, 5 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 219.184/233.213/275.194/21.391 ms
```

  最终测试结果，网络基本差不多，所以我选择了一个相对较小延迟的 IP


# 绑定 IP

```bash
$ vi /etc/hosts
```

  添加如下（前面的 IP 地址为自己测试出来最快的 IP）：

```bash
104.21.65.129 worker-plain-unit-ff9d.zhoukekestar.workers.dev
```

  或使用其他修改 hosts 文件的工具，比如：switchhosts

# 访问 Cloudflare Worker

  正常绑定 IP 后，即可访问（https 无法访问）

```bash
$ curl https://worker-plain-unit-ff9d.zhoukekestar.workers.dev
curl: (35) Recv failure: Connection reset by peer

$ curl http://worker-plain-unit-ff9d.zhoukekestar.workers.dev
Hello World!%
```

  或自行添加自定义 IP 进行测试：

```bash
$ curl -v http://worker-plain-unit-ff9d.zhoukekestar.workers.dev --resolve worker-plain-unit-ff9d.zhoukekestar.workers.dev:80:188.114.97.1
* Added worker-plain-unit-ff9d.zhoukekestar.workers.dev:80:188.114.97.1 to DNS cache
* Hostname worker-plain-unit-ff9d.zhoukekestar.workers.dev was found in DNS cache
*   Trying 188.114.97.1:80...
* Connected to worker-plain-unit-ff9d.zhoukekestar.workers.dev (188.114.97.1) port 80 (#0)
> GET / HTTP/1.1
> Host: worker-plain-unit-ff9d.zhoukekestar.workers.dev
> User-Agent: curl/7.87.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Sun, 22 Oct 2023 09:46:05 GMT
< Content-Type: text/plain;charset=UTF-8
< Content-Length: 12
< Connection: keep-alive
< Report-To: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=fBxJFdvmCcFVs6rtq%2BV69NsR7j7lRXtuD8qO1iMI4hjyX9LOx6EGLTCm42aACYQhJiMMUYLFbMBoqgm69oCF9LyHiJ2a68H1DvSxth1B0IcGWL4V6ByAgVfmiMM7HrS58Nn%2B49uR9JWEPX5dTW%2FwjlJ6zYxEMfh%2B6GEKtw533Fk%2F%2Fg%3D%3D"}],"group":"cf-nel","max_age":604800}
< NEL: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
< Server: cloudflare
< CF-RAY: 81a0cfa8cfc152a6-LHR
< alt-svc: h3=":443"; ma=86400
<
* Connection #0 to host worker-plain-unit-ff9d.zhoukekestar.workers.dev left intact
Hello World!%
```


# References

* [cloudflare](https://dash.cloudflare.com/)
* [https://github.com/zizifn/edgetunnel](https://github.com/zizifn/edgetunnel)
* [uuid](https://www.uuid.online/)
