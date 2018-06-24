---
layout: post
title:  "meta & png 小探索"
date:   2018-06-24
tags: [notes]
commentIssueId: 87
---

从查看文件 meta 引发的文件格式的小探索。
* 查看文件 meta 信息
* vi 多余字节
* 修改 meta
* PNG 字节简析

  

### 查看文件 meta 信息
```bash
$ vi temp
Hello World!
$ stat temp
  File: "temp"
  Size: 13           FileType: Regular File
  Mode: (0644/-rw-r--r--)         Uid: (  501/zhoukeke)  Gid: (   20/   staff)
Device: 1,4   Inode: 8595616806    Links: 1
Access: Sun Jun 24 14:00:10 2018
Modify: Sun Jun 24 14:00:10 2018
Change: Sun Jun 24 14:00:10 2018
```

### Vi 多余字节

`Hello World!` 12 字符成 13 之谜

```bash
$ cat temp
Hello World!
$ vi temp
:%!xxd // 进入二进制文件编辑
:set binary noeol // 手动删除换行符后设置，可以设置不自动添加换行符 0x0A
:%!xxd -r // 恢复文本编辑
:wq
$ cat temp
Hello World!%
$ stat -x temp
  File: "temp"
  Size: 12           FileType: Regular File
  Mode: (0644/-rw-r--r--)         Uid: (  501/zhoukeke)  Gid: (   20/   staff)
Device: 1,4   Inode: 8595617409    Links: 1
Access: Sun Jun 24 14:05:25 2018
Modify: Sun Jun 24 14:03:57 2018
Change: Sun Jun 24 14:03:57 2018
```

### 修改文件 meta 

```bash
$ node touch -t 200001010101 temp
$ stat -x temp
  File: "temp"
  Size: 12           FileType: Regular File
  Mode: (0644/-rw-r--r--)         Uid: (  501/zhoukeke)  Gid: (   20/   staff)
Device: 1,4   Inode: 8595617409    Links: 1
Access: Sat Jan  1 01:01:00 2000
Modify: Sat Jan  1 01:01:00 2000
Change: Sun Jun 24 14:06:19 2018

```



### meta 信息简析

```bash
$ stat -x temp
  File: "temp"
  Size: 12           FileType: Regular File
  Mode: (0644/-rw-r--r--)         Uid: (  501/zhoukeke)  Gid: (   20/   staff)
Device: 1,4   Inode: 8595617409    Links: 1
Access: Sat Jan  1 01:01:00 2000
Modify: Sat Jan  1 01:01:00 2000
Change: Sun Jun 24 14:06:19 2018
$ stat  temp
16777220 8595617409 -rw-r--r-- 1 zhoukeke staff 0 12 "Jan  1 01:01:00 2000" "Jan  1 01:01:00 2000" "Jun 24 14:06:19 2018" "Jan  1 01:01:00 2000" 4194304 8 0 temp
$ stat -r temp
16777220 8595617409 0100644 1 501 20 0 12 946659660 946659660 1529820379 946659660 4194304 8 0 temp
# 直接读取 inode 信息，关于 inode：http://www.ruanyifeng.com/blog/2011/12/inode.html
$ ls -i temp
8595617409 temp

```

##### 从 inode 引申 Hard & Soft Link

![image](https://user-images.githubusercontent.com/7157346/41817509-0b7ecc5a-77cf-11e8-9f8d-993de1b8f7cf.png)

##### 遗留问题

stat 结果中 `16777220`, `4194304` 代表的是什么意思？目前有用的信息就下面一个：

```js
// https://superuser.com/questions/1238916/stats-on-file-creation-in-osx
{
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 252423193,
  size: 0,
  blocks: 0,
  atimeMs: 1502219299000,
  mtimeMs: 1502219299000,
  ctimeMs: 1502219299000,
  birthtimeMs: 1502219299000,
  atime: 2017-08-08T19:08:19.000Z,
  mtime: 2017-08-08T19:08:19.000Z,
  ctime: 2017-08-08T19:08:19.000Z,
  birthtime: 2017-08-08T19:08:19.000Z 
}
```

找到以下 stat 源码：

```c
// https://elixir.bootlin.com/linux/latest/source/fs/stat.c
void generic_fillattr(struct inode *inode, struct kstat *stat)
{
	stat->dev = inode->i_sb->s_dev;
	stat->ino = inode->i_ino;
	stat->mode = inode->i_mode;
	stat->nlink = inode->i_nlink;
	stat->uid = inode->i_uid;
	stat->gid = inode->i_gid;
	stat->rdev = inode->i_rdev;
	stat->size = i_size_read(inode);
	stat->atime = inode->i_atime;
	stat->mtime = inode->i_mtime;
	stat->ctime = inode->i_ctime;
	stat->blksize = i_blocksize(inode);
	stat->blocks = inode->i_blocks;

	if (IS_NOATIME(inode))
		stat->result_mask &= ~STATX_ATIME;
	if (IS_AUTOMOUNT(inode))
		stat->attributes |= STATX_ATTR_AUTOMOUNT;
}

// https://opensource.apple.com/source/xnu/xnu-201.5/bsd/sys/stat.h.auto.html
struct ostat {
	u_int16_t st_dev;		/* inode's device */
	ino_t	  st_ino;		/* inode's number */
	mode_t	  st_mode;		/* inode protection mode */
	nlink_t	  st_nlink;		/* number of hard links */
	u_int16_t st_uid;		/* user ID of the file's owner */
	u_int16_t st_gid;		/* group ID of the file's group */
	u_int16_t st_rdev;		/* device type */
	int32_t	  st_size;		/* file size, in bytes */
	struct	timespec st_atimespec;	/* time of last access */
	struct	timespec st_mtimespec;	/* time of last data modification */
	struct	timespec st_ctimespec;	/* time of last file status change */
	int32_t	  st_blksize;		/* optimal blocksize for I/O */
	int32_t	  st_blocks;		/* blocks allocated for file */
	u_int32_t st_flags;		/* user defined flags for file */
	u_int32_t st_gen;		/* file generation number */
};
```

初步结论

```bash
$ stat  temp
16777220 8595617409 -rw-r--r--  1   zhoukeke staff  0     12 
# devid  inode      mode      nlink   uid     gid  rdev filesize

"Jan  1 01:01:00 2000" "Jan  1 01:01:00 2000" "Jun 24 14:06:19 2018" "Jan  1 01:01:00 2000" 
# atime                 mtime                  ctime                 birthtime

  4194304      8     0           temp
# blocksize blocks unkonw/flags filename

# 默认 512B 也就是 0.5K 的扇区，占用的 8 blocks，也就是 blocksize 为 4k，占用磁盘空间为 4k

$ df
Filesystem    512-blocks      Used Available Capacity iused               ifree %iused  Mounted on
/dev/disk1s1   489825072 389843232  86072640    82% 4274479 9223372036850501328    0%   /
devfs                378       378         0   100%     654                   0  100%   /dev
/dev/disk1s4   489825072  12582976  86072640    13%       6 9223372036854775801    0%   /private/var/vm
map -hosts             0         0         0   100%       0                   0  100%   /net
map auto_home          0         0         0   100%       0                   0  100%   /home

## device id 为 16777220 的，突然发现这个数字的二进制为 1000000000000000000000100
## 和格式化后为 Device: 1,4 有个很好的默契
## 所以 deviceid 为 16777220 就是 disk1s4
$ ls -al /dev/disk*
brw-r-----  1 root  operator    1,   0 Jun  6 11:36 /dev/disk0
brw-r-----  1 root  operator    1,   1 Jun  6 11:36 /dev/disk0s1
brw-r-----  1 root  operator    1,   2 Jun  6 11:36 /dev/disk0s2
brw-r-----  1 root  operator    1,   3 Jun  6 11:36 /dev/disk1
brw-r-----  1 root  operator    1,   4 Jun  6 11:36 /dev/disk1s1
brw-r-----  1 root  operator    1,   7 Jun  6 11:36 /dev/disk1s2
brw-r-----  1 root  operator    1,   6 Jun  6 11:36 /dev/disk1s3
brw-r-----  1 root  operator    1,   5 Jun  6 11:36 /dev/disk1s4
```

如果对二进制足够敏感的话，不至于需要这么久才得出结论

```js
4194304 = 4 << 20, 4K
16777220 = (1 << 24) | (1 << 2), device 1, 4
```





### PNG 图片简析

原版

```bash
00000000: 8950 4e47 0d0a 1a0a 0000 000d 4948 4452  .PNG........IHDR
00000010: 0000 0001 0000 0001 0806 0000 001f 15c4  ................
00000020: 8900 0000 0d49 4441 5408 9963 f8af 6af0  .....IDAT..c..j.
00000030: 0700 05cc 0251 a153 7e97 0000 0000 4945  .....Q.S~.....IE
00000040: 4e44 ae42 6082 0a                        ND.B`..
```



解析版本

```bash
00000000: 8950 4e47 0d0a 1a0a   0000            000d     4948       4452  .PNG........IHDR
          |---PNG-HEADER----|   |--chunk 长度(13)---|    |-chunk header-|

00000010: 0000    0001  0000    0001  0806         0000  001f 15c4        ................
          |-4B 的宽度-|  |-4B 的长度|  |-5B 属性共 13B--| |-4B的 CRC 校验和

00000020: 8900 0000      0d49 4441 5408 9963 f8af 6af0                    .....IDAT..c..j.
          -||-数据长度为 13||--IDAT--||-----DATA--BODY-        

00000030: 0700 05cc 0251  a153         7e97 0000 0000 4945                .....Q.S~.....IE
          --13B 数据----| |-4B CRC 校验和--| |-------END---

 
00000040: 4e44 ae42 6082                                                  ND.B`.
          -------------|
```

CRC 校验验证

```js
var bufferCrc32 = require("buffer-crc32")

var buf = Buffer.from([0x49,0x48,0x44,0x52,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x01,0x08,0x06,0x00,0x00,0x00,]);
console.log(bufferCrc32(buf)) // Buffer <1F, 15, C4, 89>

// 在线 CRC http://www.tahapaksu.com/crc/
// 4948445200000001000000010806000000 => 0x1F15C489
// 49444154089963f8af6af0070005cc0251 => 0xA1537E97
```





### References

* [How to Change a File’s Last Modified and Creation Dates on Mac OS X](https://hackernoon.com/how-to-change-a-file-s-last-modified-and-creation-dates-on-mac-os-x-494f8f76cdf4)
* [Output of stat on OSX](https://unix.stackexchange.com/questions/175325/output-of-stat-on-osx)
* [Why do I need vim in binary mode for 'noeol' to work?](https://stackoverflow.com/questions/16222530/why-do-i-need-vim-in-binary-mode-for-noeol-to-work)
* [os_x_edit_metadata](https://tinyapps.org/blog/mac/201011300700_os_x_edit_metadata.html)
* [理解 inode](http://www.ruanyifeng.com/blog/2011/12/inode.html), [linux node 详解](https://blog.csdn.net/fuming0210sc/article/details/78699050)
* [stats-on-file-creation-in-osx](https://superuser.com/questions/1238916/stats-on-file-creation-in-osx)
* [理解 Linux 的硬链接与软链接](https://www.ibm.com/developerworks/cn/linux/l-cn-hardandsymb-links/index.html)