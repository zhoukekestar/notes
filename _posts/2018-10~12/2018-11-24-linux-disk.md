---
layout: post
title:  "Linux Disk 日志清理"
date:  2018-12-08
tags: [note]
commentIssueId: 97
---



查询磁盘使用率

* `df -h` disk file system -- human readable
* `du -sh /path/to/file` disk usage -- summary -- human readable

* `sudo -u admin cat /dev/null > /home/admin/logs` 清理 log，避免无法释放文件句柄导致错误

  * 无权限的，使用 `sudo -u admin chmod 777 xxx.log` 予以解决
