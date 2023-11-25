---
layout: post
title:  "OS 小记"
date:  2023-11-25
tags: [note, cs]
---


# OS

  操作系统旨在管理计算机硬件（CPU、内存）和软件（进程、文件）资源，并为上层的应用程序提供公共服务的系统软件。<sup>Operating_system</sup>


# RTOS vs GPOS

  实时操作系统与通用操作系统的核心区别在于对任务的管理，实时操作系统能保证（排除 GPOS 的随机性）高优先级任务的执行。

  在 RTOS 中涉及互斥资源时，会使用优先级倒置的方式，比如：低优先级的 Task2 控制资源的时候，优先等待资源执行并释放，随后才可接管并以高优先级执行直到结束<sup>RTOS</sup>。

  ![](https://github.com/zhoukekestar/notes/assets/7157346/0f93eea8-dc8b-4f6f-bfbe-b2e845de363e)

  和 GPOS 的区别如下所示<sup>RTOS vs GPOS</sup>：

  ![](https://predictabledesigns.com/wp-content/uploads/2020/06/https-lh3-googleusercontent-com-igu3daaovfjeobjf.png)

* GPOS 中，高优先级执行并等待低优先级的资源解锁，随后在新的时间分片上获取资源并执行
* RTOS 中，高优先级任务始终先执行，执行至需要资源时，倒置资源依赖，并等待解锁后立即接管，并执行至结束

  RTOS 的核心在于高优先级的任务始终是能最快速处理，是抢占式的，优先级是任务执行的主要因素，以此能够获取更为确定、可预期的执行顺序和结果。<sup>Summary of comparison</sup>
  这在嵌入式系统的专有领域，有较为合适的场景，比如：火箭、医疗等领域。



# LiteOS

* [LiteOS](https://gitee.com/LiteOS/LiteOS/tree/master)
* [LiteOS for OpenHarmony](https://gitee.com/openharmony/kernel_liteos_m)




# References

* [LiteOS](https://en.wikipedia.org/wiki/LiteOS)
* [RTOS](https://predictabledesigns.com/introduction-to-real-time-operating-systems-rtos-for-use-in-embedded-systems/)
* [RTOS vs GPOS](https://es.cs.rptu.de/publications/datarsg/Neuh22.pdf)
* [Summary of comparison](https://www.slideshare.net/coolmirza143/introduction-to-realtime-operating-systems)
* [Operating_system](https://en.wikipedia.org/wiki/Operating_system)
