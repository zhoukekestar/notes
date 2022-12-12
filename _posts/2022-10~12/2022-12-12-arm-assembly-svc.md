---
layout: post
title:  "ARM Assembly HelloWorld on MacOS"
date:  2022-12-11
tags: [note]
---

  在 MacOS M1 Pro (ARM) 上编写一个简单的 Hello World 汇编程序。

* x86 的样例可参考 [x86 Assembly on MacOS](https://zhoukekestar.github.io/notes/2022/12/10/x86-assembly.html)
* arm 的简单样例可参考 [ARM Assembly on MacOS ](https://zhoukekestar.github.io/notes/2022/12/11/arm-assembly.html)


# 真正的 Hello World

  因为常规的 HelloWorld 程序涉及终端输出等系统调用，远比 `1 + 2` 的汇编要复杂，所以放在后面展开，避免陷入局部。

  参考 [apple-m1-assembly-language-hello-world](https://smist08.wordpress.com/2021/01/08/apple-m1-assembly-language-hello-world/)，新建文件 `main.s`，最简约的内容如下：

```assembly
.global _main
.align 2
_main:
	adr	x1, str
	mov	x2, #13

	mov	x16, #4
	svc	0
	mov	x16, #1
	svc	0
str:
	.ascii	"Hello World!\n"
```

  注意，此处为方便起见，已忽略返回值。

# SVC

  参考 [ios-arm64-syscalls](https://stackoverflow.com/questions/56985859/ios-arm64-syscalls)

> The immediate passed to svc is ignored, but the standard library uses svc 0x80.
>
> x16 holds the syscall number
>
> x0 through x8 hold up to 9 arguments*

  从 [ARM SVC](https://developer.arm.com/documentation/dui0473/m/arm-and-thumb-instructions/svc) 文档上看，`svc` 是可以直接 call 具体的 immediate value 的。

  但 Mac 上，无法直接 `svc #4` 或 `svc 0x4`，所以，需要 `x16` 寄存器来转一下，大概应该是位数的问题，mac 支持 64 位的系统命令扩展？


  `svc` 后面的具体的 instruction number 可参考 [what-is-the-interface-for-arm-system-calls-and-where-is-it-defined-in-the-linux](https://stackoverflow.com/questions/12946958/what-is-the-interface-for-arm-system-calls-and-where-is-it-defined-in-the-linux)。

  通过 [Linux ARM](https://syscalls.w3challs.com/?arch=arm_strong) 或 [MacOS BSD System Calls](https://sigsegv.pl/osx-bsd-syscalls/)，可以了解到

```
#	Name	RDI	RSI	RDX	RCX	R8	R9	Stack	Stack	Implementation
0	int nosys	-	-	-	-	-	-	-	-	bsd/kern/subr_xxx.c
1	void exit	int rval	-	-	-	-	-	-	-	bsd/kern/kern_exit.c
2	int fork	-	-	-	-	-	-	-	-	bsd/kern/ker
3	user_ssize_t read	int fd	user_addr_t cbuf	user_size_t nbyte	-	-	-	-	-	bsd/kern/sys_generic.c
4	user_ssize_t write	int fd	user_addr_t cbuf	user_size_t nbyte	-	-	-	-	-	bsd/kern/sys_generic.c
```

* `svc #4` 就是调用系统 `write` 接口，寄存器 0/1/2 分别是 `fd`/`addr`/`size`
* `svc #1` 为调用 `exit` 接口，正常退出并关闭

  所以，`mov x16 #4, svc 0` 的作用就是调用了 `write` 接口，并将寄存器 1 的内容输出，输出的个数由寄存器 2 来确定。

  `mov x16 #1, svc 0` 则为关闭并退出。

# adr

  简单说明一下 adr 的逻辑

```sh
# 执行
(lldb) r
Process 42767 launched: '/xxx/a.out' (arm64)
Process 42767 stopped
* thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    frame #0: 0x0000000100003f90 a.out`main
a.out`main:
->  0x100003f90 <+0>:  adr    x1, #0x18                 ; str
    0x100003f94 <+4>:  mov    x2, #0xd
    0x100003f98 <+8>:  mov    x16, #0x4
    0x100003f9c <+12>: svc    #0
Target 0: (a.out) stopped.

# 下一步
(lldb) n

# 读取 x1 地址
# x1 = 0x3f90 + 0x18 = 0x3fa8
(lldb) re r x1
      x1 = 0x0000000100003fa8  a.out`str

```

# 注释版

```assembly
.global _main
.align 2
_main:
	# str 会被编译成具体的程序相对地址
	# 就像上述 adr 命令中 0x3f90 + 0x18 = 0x3fa8
	adr	x1, str

	# 设置打印长度
	mov	x2, #13

	# 设置系统命令 number
	# 并调用 write 接口
	mov	x16, #4
	svc	0

	# 设置系统命令 number 为 1
	# 并调用 exit 接口
	mov	x16, #1
	svc	0
str:
	.ascii	"Hello World!\n"

```

# 待分析

  gcc 默认编译的 `gcc -s main.c` 的 helloworld，调用的是 `bl _printf`, 代码如下：

```asm
.global _main
.align 2
_main:
	adr	x0, str
	bl	_printf
str:
	.ascii	"Hello World!\n"
```



# 参考

* [ios-arm64-syscalls](https://stackoverflow.com/questions/56985859/ios-arm64-syscalls)
* [ARM SVC](https://developer.arm.com/documentation/dui0473/m/arm-and-thumb-instructions/svc)
