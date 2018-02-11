---
layout: post
title:  "Process & Thread (进程 & 线程)"
date:   2018-02-09
tags: [learning]
commentIssueId: 74
---



进程和线程的一个简单的例子是工厂的例子. 从 wiki 定义再详细理解下.
* Process
* Thread




## Process

[Wiki 中文](https://zh.wikipedia.org/wiki/%E8%A1%8C%E7%A8%8B)

> **进程**（英语：process），是计算机中已运行[程序](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BC%8F)的实体。进程为曾经是[分时系统](https://zh.wikipedia.org/wiki/%E5%88%86%E6%99%82%E7%B3%BB%E7%B5%B1)的基本运作单位。在面向进程设计的系统（如早期的[UNIX](https://zh.wikipedia.org/wiki/UNIX)，[Linux](https://zh.wikipedia.org/wiki/Linux) 2.4及更早的版本）中，进程是程序的基本执行实体；在面向线程设计的系统（如当代多数操作系统、[Linux](https://zh.wikipedia.org/wiki/Linux)2.6及更新的版本）中，进程本身不是基本运行单位，而是[线程](https://zh.wikipedia.org/wiki/%E5%9F%B7%E8%A1%8C%E7%B7%92)的容器。程序本身只是指令、数据及其组织形式的描述，进程才是程序（那些指令和数据）的真正运行实例。若干进程有可能与同一个程序相关系，且每个进程皆可以同步（循序）或异步（[平行](https://zh.wikipedia.org/wiki/%E5%B9%B3%E8%A1%8C%E8%A8%88%E7%AE%97)）的方式独立运行。现代[计算机系统](https://zh.wikipedia.org/wiki/%E9%9B%BB%E8%85%A6%E7%B3%BB%E7%B5%B1)可在同一段时间内以进程的形式将多个程序加载到内存中，并借由时间共享（或称[时分复用](https://zh.wikipedia.org/wiki/%E6%97%B6%E5%88%86%E5%A4%8D%E7%94%A8)），以在一个[处理器](https://zh.wikipedia.org/wiki/%E8%99%95%E7%90%86%E5%99%A8)上表现出同时（[平行性](https://zh.wikipedia.org/w/index.php?title=%E5%B9%B3%E8%A1%8C%E6%80%A7&action=edit&redlink=1)）运行的感觉。同样的，使用多线程技术（多线程即每一个线程都代表一个进程内的一个独立执行上下文）的操作系统或计算机架构，同样程序的**平行**线程，可在多CPU主机或网络上真正**同时**运行（在不同的CPU上）。

[Wiki 英文](https://en.wikipedia.org/wiki/Process_(computing))

> In computing, a **process** is an [instance](https://en.wikipedia.org/wiki/Instance_(computer_science)) of a [computer program](https://en.wikipedia.org/wiki/Computer_program) that is being executed. It contains the program code and its current activity. Depending on the [operating system](https://en.wikipedia.org/wiki/Operating_system) (OS), a process may be made up of multiple [threads of execution](https://en.wikipedia.org/wiki/Thread_(computing)) that execute instructions [concurrently](https://en.wikipedia.org/wiki/Concurrency_(computer_science)).[[1\]](https://en.wikipedia.org/wiki/Process_(computing)#cite_note-OSC_Chap4-1)[[2\]](https://en.wikipedia.org/wiki/Process_(computing)#cite_note-Vah96-2)



## Thread

[Wiki 中文]()

> **线程**（英语：**thread**）是[操作系统](https://zh.wikipedia.org/wiki/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F)能够进行运算[调度](https://zh.wikipedia.org/wiki/%E8%B0%83%E5%BA%A6)的最小单位。它被包含在[进程](https://zh.wikipedia.org/wiki/%E8%BF%9B%E7%A8%8B)之中，是[进程](https://zh.wikipedia.org/wiki/%E8%BF%9B%E7%A8%8B)中的实际运作单位。一条线程指的是[进程](https://zh.wikipedia.org/wiki/%E8%BF%9B%E7%A8%8B)中一个单一顺序的控制流，一个进程中可以并行多个线程，每条线程并行执行不同的任务。在[Unix System V](https://zh.wikipedia.org/wiki/Unix)及[SunOS](https://zh.wikipedia.org/wiki/SunOS)中也被称为轻量进程（lightweight processes），但轻量进程更多指内核线程（kernel thread），而把用户线程（user thread）称为线程。
>
> 线程是独立调度和分派的基本单位。线程可以操作系统内核调度的内核线程，如[Win32](https://zh.wikipedia.org/wiki/Win32)线程；由用户进程自行调度的用户线程，如Linux平台的POSIX Thread；或者由[内核](https://zh.wikipedia.org/wiki/%E5%86%85%E6%A0%B8)与用户进程，如[Windows 7](https://zh.wikipedia.org/wiki/Windows_7)的线程，进行混合调度。
>
> 同一进程中的多条线程将共享该进程中的全部系统资源，如虚拟地址空间，[文件描述符](https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E6%8F%8F%E8%BF%B0%E7%AC%A6)和[信号处理](https://zh.wikipedia.org/wiki/%E4%BF%A1%E5%8F%B7%E5%A4%84%E7%90%86)等等。但同一进程中的多个线程有各自的[调用栈](https://zh.wikipedia.org/wiki/%E8%B0%83%E7%94%A8%E6%A0%88)（call stack），自己的[寄存器环境](https://zh.wikipedia.org/w/index.php?title=%E5%AF%84%E5%AD%98%E5%99%A8%E7%8E%AF%E5%A2%83&action=edit&redlink=1)（register context），自己的线程本地存储（thread-local storage）。
>
> 一个进程可以有很多线程，每条线程并行执行不同的任务。
>
> 在多核或多CPU，或支持Hyper-threading的CPU上使用多线程程序设计的好处是显而易见，即提高了程序的执行吞吐率。在单CPU单核的计算机上，使用多线程技术，也可以把进程中负责IO处理、人机交互而常被阻塞的部分与密集计算的部分分开来执行，编写专门的workhorse线程执行密集计算，从而提高了程序的执行效率。

[Wiki 英文](https://en.wikipedia.org/wiki/Thread_(computing))

> In [computer science](https://en.wikipedia.org/wiki/Computer_science), a **thread** of execution is the smallest sequence of programmed instructions that can be managed independently by a [scheduler](https://en.wikipedia.org/wiki/Scheduling_(computing)), which is typically a part of the [operating system](https://en.wikipedia.org/wiki/Operating_system).[[1\]](https://en.wikipedia.org/wiki/Thread_(computing)#cite_note-1) The implementation of threads and [processes](https://en.wikipedia.org/wiki/Process_(computing)) differs between operating systems, but in most cases a thread is a component of a process. Multiple threads can exist within one process, executing [concurrently](https://en.wikipedia.org/wiki/Concurrent_computation) and sharing resources such as [memory](https://en.wikipedia.org/wiki/Shared_memory_(interprocess_communication)), while different processes do not share these resources. In particular, the threads of a process share its executable code and the values of its variables at any given time.



## Reference

* [进程与线程的一个简单解释](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)