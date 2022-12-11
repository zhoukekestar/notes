---
layout: post
title:  "ARM Assembly on MacOS"
date:  2022-12-11
tags: [note]
---

  在 MacOS M1 Pro (ARM) 上编写一个简单的 Hello World 汇编程序。

  x86 的样例可参考 [x86 Assembly on MacOS](https://zhoukekestar.github.io/notes/2022/12/10/x86-assembly.html)

# CPU 指令集架构

  通过 `uname -a` 来查看 CPU 指令集架构，[常见的](https://en.wikipedia.org/wiki/Instruction_set_architecture) 有：
  * [X86](https://en.wikipedia.org/wiki/X86)
  * [ARM](https://en.wikipedia.org/wiki/ARM_architecture_family)
  * [RISC-V](https://en.wikipedia.org/wiki/RISC-V)

```sh
$ uname -a
Darwin Pipe-Macbook 21.6.0 Darwin Kernel Version 21.6.0: Mon Aug 22 20:19:52 PDT 2022; root:xnu-8020.140.49~2/RELEASE_ARM64_T6000 arm64

$ uname -p
arm
```


# 编写最简单的 ARM 汇编

  参考 [apple-m1-assembly-language-hello-world](https://smist08.wordpress.com/2021/01/08/apple-m1-assembly-language-hello-world/) 以及 [基本的 ARM 指令含义](https://wiki.cdot.senecacollege.ca/wiki/AArch64_Register_and_Instruction_Quick_Start)

  新建 `main.s` 文件，并编写以下内容

```assembly
.global _main
_main:
	mov	x0, #1
	mov	x1, #2
	add	x0, x0, x1
	ret
```

  关于 r0、x0、w0 寄存器的区别：

> The aarch64 registers are named:
>
> r0 through r30 - to refer generally to the registers
>
> x0 through x30 - for 64-bit-wide access (same registers)
>
> w0 through w30 - for 32-bit-wide access (same registers - upper 32 bits are either cleared on load or sign-extended (set to the value of the most significant bit of the loaded value)).

  带注释版本

```assembly
.global _main
// 主入口
_main:
	// 对寄存器0 赋值 1
	mov	x1, #1

	// 对寄存器1 赋值 2
	mov	x2, #2

	// 对寄存器 1 和 寄存器 2 进行相加
	// 并赋值给寄存器 0
	add	x0, x1, x2

	// 返回值
	ret
```

  将以上汇编代码编译之后，可以得到以下内容：

```sh
// 编译代码
$ gcc main.s

// 执行代码
$ ./a.out

// 查看程序输出，应该会输出 3
$ echo $?
3
```

# 调试程序

### LLDB 调试技巧

  参考 [x86 Assembly on MacOS](https://zhoukekestar.github.io/notes/2022/12/10/x86-assembly.html)，不再重复。

### 调试程序

  通过以下命令开始调试程序：

```sh
# 开始调试程序
$ lldb a.out
(lldb) target create "a.out"
Current executable set to '/xxx/a.out' (arm64).

# 设置 main 为断点
(lldb) b main
Breakpoint 1: where = a.out`main, address = 0x0000000100003fa8

# 运行程序
(lldb) r
Process 19910 launched: '/xxx/a.out' (arm64)
Process 19910 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    frame #0: 0x0000000100003fa8 a.out`main
a.out`main:
->  0x100003fa8 <+0>:  mov    x1, #0x1
    0x100003fac <+4>:  mov    x2, #0x2
    0x100003fb0 <+8>:  add    x0, x1, x2
    0x100003fb4 <+12>: ret
Target 0: (a.out) stopped.
```

  可以看到最终的执行代码中，以上汇编代码被编译成了

```
0x100003fa8 <+0>:  mov    x1, #0x1
0x100003fac <+4>:  mov    x2, #0x2
0x100003fb0 <+8>:  add    x0, x1, x2
0x100003fb4 <+12>: ret
```

```sh
# 下一步
(lldb) n
Process 19910 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = instruction step over
    frame #0: 0x0000000100003fb0 a.out`main + 8
a.out`main:
->  0x100003fb0 <+8>:  add    x0, x1, x2
    0x100003fb4 <+12>: ret
    0x100003fb8:       udf    #0x1
    0x100003fbc:       udf    #0x1c
Target 0: (a.out) stopped.


# 执行完赋值之后，查看一下寄存器的状态
# 可以看到 x1 为 1，x2 为 2，符合预期
(lldb) re r
General Purpose Registers:
        x0 = 0x0000000000000001
        x1 = 0x0000000000000001
        x2 = 0x0000000000000002

# 下一步，执行加法逻辑
(lldb) n
Process 19910 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = instruction step over
    frame #0: 0x0000000100003fb4 a.out`main + 12
a.out`main:
->  0x100003fb4 <+12>: ret
    0x100003fb8:       udf    #0x1
    0x100003fbc:       udf    #0x1c
    0x100003fc0:       udf    #0x0
Target 0: (a.out) stopped.

# 执行完加法逻辑后，x0 为 3
(lldb) re r
General Purpose Registers:
        x0 = 0x0000000000000003
        x1 = 0x0000000000000001
        x2 = 0x0000000000000002

# 执行完成所有程序
# 可以看到最终的返回状态为 3，符合预期
(lldb) thread continue
Resuming thread 0x1817033 in process 19910
Process 19910 resuming
Process 19910 exited with status = 3 (0x00000003)
```


# 操作指令

  确认 main 函数入口地址：

```sh
$ nm a.out
0000000100000000 T __mh_execute_header
0000000100003fa8 T _main
```

  通过查看 `a.out` 的二进制代码：

```sh
$ xxd -s 0x3fa8 -l 20 -c 4 a.out
00003fa8: 2100 80d2  !...
00003fac: 4200 80d2  B...
00003fb0: 2000 028b   ...
00003fb4: c003 5fd6  .._.
00003fb8: 0100 0000  ....
...
```

  可以看到，最终的二进制码如下：

```
|-----  运行时代码 ------------------|   |- 二进制-|   |------ 前 32 位的二进制指令 --------|
0x100003fa8 <+0>:  mov    x1, #0x1      2100 80d2   00100001 00000000 10000000 11010010
0x100003fac <+4>:  mov    x2, #0x2      4200 80d2   01000010 00000000 10000000 11010010
0x100003fb0 <+8>:  add    x0, x1, x2    2000 028b   00100000 00000000 00000010 10001011
0x100003fb4 <+12>: ret                  c003 5fd6   11000000 00000011 01011111 11010110
```

  然后 ARM 的二进制源码是从右往左读的（这块我看了很久才意识到的），也就是按每个字节（8 bit），需要做个反转，即得到如下代码：

```
|-----  运行时代码 ------------------|   |- 二进制-|   |------ 前 32 位的二进制指令 --------|
0x100003fa8 <+0>:  mov    x1, #0x1      d280 0021   11010010 10000000 00000000 00100001
0x100003fac <+4>:  mov    x2, #0x2      d280 0042   11010010 10000000 00000000 01000010
0x100003fb0 <+8>:  add    x0, x1, x2    8b02 0020   10001011 00000010 00000000 00100000
0x100003fb4 <+12>: ret                  d65f 03c0   11010110 01011111 00000011 11000000
```

  然后参考 [MOV](https://developer.arm.com/documentation/ddi0602/2022-06/Base-Instructions/MOV--wide-immediate---Move--wide-immediate---an-alias-of-MOVZ-) [ADD](https://developer.arm.com/documentation/ddi0602/2022-06/Base-Instructions/ADD--shifted-register---Add--shifted-register--) [RET](https://developer.arm.com/documentation/ddi0602/2022-06/Base-Instructions/RET--Return-from-subroutine-)


### MOV

  从操作指令上看，可以确定具体的操作为 [MOV (wide immediate)](https://developer.arm.com/documentation/ddi0602/2022-06/Base-Instructions/MOV--wide-immediate---Move--wide-immediate---an-alias-of-MOVZ-) 因为是 64 位（wide）的数值（immediate）


<table class="c-table is-sticky is-striped">
  <thead>
    <tr>
      <td>31</td>
      <td>30</td>
      <td>29</td>
      <td>28</td>
      <td>27</td>
      <td>26</td>
      <td>25</td>
      <td>24</td>
      <td>23</td>
      <td>22</td>
      <td>21</td>
      <td>20</td>
      <td>19</td>
      <td>18</td>
      <td>17</td>
      <td>16</td>
      <td>15</td>
      <td>14</td>
      <td>13</td>
      <td>12</td>
      <td>11</td>
      <td>10</td>
      <td>9</td>
      <td>8</td>
      <td>7</td>
      <td>6</td>
      <td>5</td>
      <td>4</td>
      <td>3</td>
      <td>2</td>
      <td>1</td>
      <td>0</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>sf</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td colspan="2">hw</td>
      <td colspan="16">imm16</td>
      <td colspan="5">Rd</td>
    </tr>
    <tr>
      <td>1(64位系统)</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td colspan="2">00</td>
      <td colspan="16">00000 00000000 001（16 bit 的数值）</td>
      <td colspan="5">00001 （寄存器1）</td>
    </tr>
    <tr>
      <td></td>
      <td colspan="2">opc</td>
      <td colspan="6"></td>
      <td colspan="2"></td>
      <td colspan="16"></td>
      <td colspan="5"></td>
    </tr>
  </tbody>
</table>

  所以，最终的 32 位二进制为 `1/1010010 1/00/00000 00000000 001/00001`，十六进制为 `d280 0021`，即汇编的 `mov x1, #0x1`，将数值 `1` 存到 寄存器1 中。

  `1/1010010 1/00/00000 00000000 010/00010` 同理，十六进制为 `d280 0042`，即汇编的 `mov x2, #0x2`，将数值 `2` 存到 寄存器2 中。


### ADD

  读懂了 MOV 之后，[ADD](https://developer.arm.com/documentation/ddi0602/2022-06/Base-Instructions/ADD--shifted-register---Add--shifted-register--) 也就比较容易看到。

  [ADD 指令的含义](https://wiki.cdot.senecacollege.ca/wiki/AArch64_Register_and_Instruction_Quick_Start) 是：

  > add r0,r1,r2      // load r0 with r1+r2


  <table class="c-table is-sticky is-striped">
  <thead>
    <tr>
      <td>31</td>
      <td>30</td>
      <td>29</td>
      <td>28</td>
      <td>27</td>
      <td>26</td>
      <td>25</td>
      <td>24</td>
      <td>23</td>
      <td>22</td>
      <td>21</td>
      <td>20</td>
      <td>19</td>
      <td>18</td>
      <td>17</td>
      <td>16</td>
      <td>15</td>
      <td>14</td>
      <td>13</td>
      <td>12</td>
      <td>11</td>
      <td>10</td>
      <td>9</td>
      <td>8</td>
      <td>7</td>
      <td>6</td>
      <td>5</td>
      <td>4</td>
      <td>3</td>
      <td>2</td>
      <td>1</td>
      <td>0</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>sf</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td colspan="2">shift</td>
      <td>0</td>
      <td colspan="5">Rm</td>
      <td colspan="6">imm6</td>
      <td colspan="5">Rn</td>
      <td colspan="5">Rd</td>
    </tr>
    <tr>
      <td>1(64位系统)</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td colspan="2">00</td>
      <td>0</td>
      <td colspan="5">00010(寄存器2)</td>
      <td colspan="6">000000(数值0)</td>
      <td colspan="5">00001(寄存器1)</td>
      <td colspan="5">00000(寄存器0)</td>
    </tr>
    <tr>
      <td></td>
      <td>op</td>
      <td>S</td>
      <td colspan="5"></td>
      <td colspan="2"></td>
      <td></td>
      <td colspan="5"></td>
      <td colspan="6"></td>
      <td colspan="5"></td>
      <td colspan="5"></td>
    </tr>
  </tbody>
</table>

  二进制 `1/0001011 00/0/00010 000000/00 001/00000` 的十六进制为 `8b02 0020`，即汇编的 `add x0, x1, x2`，将寄存器 1 和寄存器 2 相加，并赋值给寄存器 0。


### RET

  [RET](https://developer.arm.com/documentation/ddi0602/2022-06/Base-Instructions/RET--Return-from-subroutine-) 就当做个巩固练习吧。

  <table class="c-table is-sticky is-striped">
  <thead>
    <tr>
      <td>31</td>
      <td>30</td>
      <td>29</td>
      <td>28</td>
      <td>27</td>
      <td>26</td>
      <td>25</td>
      <td>24</td>
      <td>23</td>
      <td>22</td>
      <td>21</td>
      <td>20</td>
      <td>19</td>
      <td>18</td>
      <td>17</td>
      <td>16</td>
      <td>15</td>
      <td>14</td>
      <td>13</td>
      <td>12</td>
      <td>11</td>
      <td>10</td>
      <td>9</td>
      <td>8</td>
      <td>7</td>
      <td>6</td>
      <td>5</td>
      <td>4</td>
      <td>3</td>
      <td>2</td>
      <td>1</td>
      <td>0</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td colspan="5">Rn</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tbody>
    <tr>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>0(1Byte)</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1(1Byte)</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td colspan="5">011 110</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td colspan="7"></td>
      <td>Z</td>
      <td></td>
      <td colspan="2">op</td>
      <td colspan="5"></td>
      <td colspan="4"></td>
      <td>A</td>
      <td>M</td>
      <td colspan="5"></td>
      <td colspan="5">Rm</td>
    </tr>
  </tbody>
</table>

  二进制 `11010110 01011111 00000/011 110/00000` 的十六进制为 `d65f 03c0`（其中 rn 的含义可以参考其他资料查看，我没继续查了。。。），即汇编 `ret` 命令。


# 真正的 Hello World

  因为常规的 HelloWorld 程序涉及终端输出等系统调用，远比 `1 + 2` 的汇编要复杂，所以放在后面展开，避免陷入局部。

  参考 [apple-m1-assembly-language-hello-world](https://smist08.wordpress.com/2021/01/08/apple-m1-assembly-language-hello-world/)，新建文件 `main.s`，内容如下：

```assembly
.global _main
.align 2
_main:
	mov	x0, #1
	adr	x1, str
	mov	x2, #13
	mov	x16, #4
	svc	0

	mov	x0, #0
	mov	x16, #1
	svc	0

str:
	.ascii	"Hello World!\n"
```

# 参考

* [apple-m1-assembly-language-hello-world](https://smist08.wordpress.com/2021/01/08/apple-m1-assembly-language-hello-world/)
* [基本的 ARM 指令含义](https://wiki.cdot.senecacollege.ca/wiki/AArch64_Register_and_Instruction_Quick_Start)
* [using-lldb-for-reverse-engineering/](https://rderik.com/blog/using-lldb-for-reverse-engineering/)
* [MOV](https://developer.arm.com/documentation/ddi0602/2022-06/Base-Instructions/MOV--wide-immediate---Move--wide-immediate---an-alias-of-MOVZ-)
* [ADD](https://developer.arm.com/documentation/ddi0602/2022-06/Base-Instructions/ADD--shifted-register---Add--shifted-register--)
* [RET](https://developer.arm.com/documentation/ddi0602/2022-06/Base-Instructions/RET--Return-from-subroutine-)
