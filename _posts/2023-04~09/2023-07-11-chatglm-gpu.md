---
layout: post
title:  "ChatGLM2-6B GPU 驱动"
date:  2023-07-11
tags: [note]
---

  由于 GPU 驱动存在每次重新启动，都需要重新安装的问题，有空予以解决。

# Quick Start

```sh
# 确认显卡状态
$ nvidia-smi

# 查看驱动版本
$ ls -l /usr/src/
total 16
drwxr-xr-x  2 root root 4096 Jul  4 15:03 annobin
drwxr-xr-x. 2 root root 4096 Feb  9  2022 debug
drwxr-xr-x. 4 root root 4096 Jul  4 15:01 kernels
drwxr-xr-x  8 root root 4096 Jul  4 10:52 nvidia-525.105.17

# 使用 dkms 管理驱动
$ yum install dkms

# 安装指定版本驱动（ /usr/src/ 下的驱动版本）
$ sudo dkms install -m nvidia -v 525.105.17

# 确认显卡状态
$ nvidia-smi
```

# History

```sh

[root@iZ8vbgjtg291j3aek7yk6bZ ~]# nvidia-smi
NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver. Make sure that the latest NVIDIA driver is installed and running.

[root@iZ8vbgjtg291j3aek7yk6bZ ~]# uname -r
5.10.134-14.1.al8.x86_64


[root@iZ8vbgjtg291j3aek7yk6bZ ~]# ls -l /usr/src/
total 16
drwxr-xr-x  2 root root 4096 Jul  4 15:03 annobin
drwxr-xr-x. 2 root root 4096 Feb  9  2022 debug
drwxr-xr-x. 4 root root 4096 Jul  4 15:01 kernels
drwxr-xr-x  8 root root 4096 Jul  4 10:52 nvidia-525.105.17



[root@iZ8vbgjtg291j3aek7yk6bZ ~]# yum install dkms
Last metadata expiration check: 0:02:28 ago on Tue 11 Jul 2023 09:06:09 PM CST.
Dependencies resolved.
==========================================================================================================================================================================================================================================================
 Package                                                   Architecture                                                Version                                                            Repository                                                 Size
==========================================================================================================================================================================================================================================================
Installing:
 dkms                                                      noarch                                                      3.0.11-1.el8                                                       epel                                                       90 k

Transaction Summary
==========================================================================================================================================================================================================================================================
Install  1 Package

Total download size: 90 k
Installed size: 192 k
Is this ok [y/N]: y
Downloading Packages:
dkms-3.0.11-1.el8.noarch.rpm                                                                                                                                                                                              386 kB/s |  90 kB     00:00
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                                     384 kB/s |  90 kB     00:00
Extra Packages for Enterprise Linux 8 - x86_64                                                                                                                                                                            1.6 MB/s | 1.6 kB     00:00
Importing GPG key 0x2F86D6A1:
 Userid     : "Fedora EPEL (8) <epel@fedoraproject.org>"
 Fingerprint: 94E2 79EB 8D8F 25B2 1810 ADF1 21EA 45AB 2F86 D6A1
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-8
Is this ok [y/N]: y
Key imported successfully
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                  1/1
  Installing       : dkms-3.0.11-1.el8.noarch                                                                                                                                                                                                         1/1
  Running scriptlet: dkms-3.0.11-1.el8.noarch                                                                                                                                                                                                         1/1
  Verifying        : dkms-3.0.11-1.el8.noarch                                                                                                                                                                                                         1/1

Installed:
  dkms-3.0.11-1.el8.noarch

Complete!


[root@iZ8vbgjtg291j3aek7yk6bZ ~]# sudo dkms install -m nvidia -v 525.105.17
Sign command: /lib/modules/5.10.134-14.1.al8.x86_64/build/scripts/sign-file
Signing key: /var/lib/dkms/mok.key
Public certificate (MOK): /var/lib/dkms/mok.pub
Certificate or key are missing, generating self signed certificate for MOK...
Creating symlink /var/lib/dkms/nvidia/525.105.17/source -> /usr/src/nvidia-525.105.17

Building module:
Cleaning build area...
'make' -j8 NV_EXCLUDE_BUILD_MODULES='' KERNEL_UNAME=5.10.134-14.1.al8.x86_64 modules................
Signing module /var/lib/dkms/nvidia/525.105.17/build/nvidia.ko
Signing module /var/lib/dkms/nvidia/525.105.17/build/nvidia-uvm.ko
Signing module /var/lib/dkms/nvidia/525.105.17/build/nvidia-modeset.ko
Signing module /var/lib/dkms/nvidia/525.105.17/build/nvidia-drm.ko
Signing module /var/lib/dkms/nvidia/525.105.17/build/nvidia-peermem.ko
Cleaning build area...

nvidia.ko:
Running module version sanity check.
 - Original module
   - No original module exists within this kernel
 - Installation
   - Installing to /lib/modules/5.10.134-14.1.al8.x86_64/extra/

nvidia-uvm.ko:
Running module version sanity check.
 - Original module
   - No original module exists within this kernel
 - Installation
   - Installing to /lib/modules/5.10.134-14.1.al8.x86_64/extra/

nvidia-modeset.ko:
Running module version sanity check.
 - Original module
   - No original module exists within this kernel
 - Installation
   - Installing to /lib/modules/5.10.134-14.1.al8.x86_64/extra/

nvidia-drm.ko:
Running module version sanity check.
 - Original module
   - No original module exists within this kernel
 - Installation
   - Installing to /lib/modules/5.10.134-14.1.al8.x86_64/extra/

nvidia-peermem.ko:
Running module version sanity check.
 - Original module
   - No original module exists within this kernel
 - Installation
   - Installing to /lib/modules/5.10.134-14.1.al8.x86_64/extra/
Adding any weak-modules
depmod...

[root@iZ8vbgjtg291j3aek7yk6bZ ~]# nvidia-smi
Tue Jul 11 21:10:47 2023
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 525.105.17   Driver Version: 525.105.17   CUDA Version: 12.0     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  Tesla V100-SXM2...  Off  | 00000000:00:07.0 Off |                    0 |
| N/A   32C    P0    39W / 300W |      0MiB / 16384MiB |      2%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
```

# References

* [CentOS安装NVIDIA驱动记](https://developer.aliyun.com/article/33173)
* [Ubuntu断电/重启显卡驱动消失：“NVIDIA-SMI has failed because it couldn‘t communicate with the NVIDIA driver....“](https://www.cnblogs.com/yancy01/p/17054952.html)
* [How to install Nvidia driver on CentOS 7 Linux](https://www.cyberciti.biz/faq/how-to-install-nvidia-driver-on-centos-7-linux/)

