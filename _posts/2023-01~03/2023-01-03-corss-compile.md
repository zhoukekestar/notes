---
layout: post
title:  "交叉编译"
date:  2023-01-03
tags: [note, system]
---

  本文简单说明在 ARM M1 的 Mac 电脑上，使用 GCC 工具交叉编译文件到 i386 或 x86-64 的目标机器上。

  Cross compile source C file to i386 (or x86-64) targeted machine on ARM M1 Mac by GCC.

  > 最终目的是来分析一下 80386 指令集的实现方式（即 copy/v86 的源码），所以需要 16 位的机器码来看，最终选取 docker i386/gcc 来实现交叉编译。


# 说明

  因为目前很多机器都是 64 位，且有些环境是 x86 有些是 arm，会涉及到交叉编译，所以，为了统一构建环境，使用 docker 来构建，毕竟踩了几天的坑，只有此方式比较方便。

### 机器上的交叉编译

  比如，在 mac 上，使用 `x86_64-elf-gcc` 来编译，能编译成汇编，但 link 会出问题

> 在 x86 的 intel mac 上，也是一样的。

```sh
# 安装交叉编译器
$ brew install x86_64-elf-gcc

# 简单的源码
$ cat add.c
int main() {
  int a = 1;
  int b = 2;
  int c = a + b;
  return c;
}%

# 编译为汇编
$ x86_64-elf-gcc -m32 ./add.c -S

# 查看汇编，是能正常编译出来的
$ cat add.s
        .file   "add.c"
        .text
        .globl  main
        .type   main, @function
main:
        pushl   %ebp
        movl    %esp, %ebp
        subl    $16, %esp
        movl    $1, -4(%ebp)
        movl    $2, -8(%ebp)
        movl    -4(%ebp), %edx
        movl    -8(%ebp), %eax
        addl    %edx, %eax
        movl    %eax, -12(%ebp)
        movl    -12(%ebp), %eax
        leave
        ret
        .size   main, .-main
        .ident  "GCC: (GNU) 12.2.0"


# 无法正常 link
# 此类、或类似的问题，搞了很久就搞不定，所以，用 docker 来搞了
$ x86_64-elf-gcc -m32 ./add.c
/opt/homebrew/opt/x86_64-elf-binutils/bin/x86_64-elf-ld: cannot find crt0.o: No such file or directory
/opt/homebrew/opt/x86_64-elf-binutils/bin/x86_64-elf-ld: cannot find -lc: No such file or directory
collect2: error: ld returned 1 exit status

# 正常构建不指定目标代码也不行
$ x86_64-elf-gcc  ./add.c
/opt/homebrew/opt/x86_64-elf-binutils/bin/x86_64-elf-ld: cannot find crt0.o: No such file or directory
/opt/homebrew/opt/x86_64-elf-binutils/bin/x86_64-elf-ld: cannot find -lc: No such file or directory
collect2: error: ld returned 1 exit status

# 查了较多资料，不指定标准库，以及重新指定 entry，是能正常编译的
$ x86_64-elf-gcc -nostdlib --entry main ./add.c
$  objdump -S a.out

a.out:  file format elf64-x86-64

Disassembly of section .text:

0000000000400078 <main>:
  400078: 55                            pushq   %rbp
  400079: 48 89 e5                      movq    %rsp, %rbp
  40007c: c7 45 fc 01 00 00 00          movl    $1, -4(%rbp)
  400083: c7 45 f8 02 00 00 00          movl    $2, -8(%rbp)
  40008a: 8b 55 fc                      movl    -4(%rbp), %edx
  40008d: 8b 45 f8                      movl    -8(%rbp), %eax
  400090: 01 d0                         addl    %edx, %eax
  400092: 89 45 f4                      movl    %eax, -12(%rbp)
  400095: 8b 45 f4                      movl    -12(%rbp), %eax
  400098: 5d                            popq    %rbp
  400099: c3                            retq
```


# Steps

* `docker pull i386/gcc` 来拉取 i386 的 gcc 版本
* 参考 [Docker: Copying files from Docker container to host](https://stackoverflow.com/questions/22049212/docker-copying-files-from-docker-container-to-host) 来将需要构建的文件放入 docker 容器中。
  * `$ docker cp containerId:/source/hello.c ./hello.c`
  * `$ docker cp ./helloc containerId:/dest`
* `docker run -it i386/gcc` 运行容器
  * `docker run -it --name=gcc -v "$PWD:/home" i386/gcc` 或将当前目录直接挂接上去
* `# echo "int main() { int a = 1; int b = 2; int c = a + b; return c; }" > hello.c` 添加测试代码
* `gcc -mtune=i386 -m16 hello.c`
  * 用于交叉编译 i386 的 16 位程序，主要是为了和 [Opcode Table](https://pdos.csail.mit.edu/6.828/2018/readings/i386/appa.htm) 对应起来，32 位有 `movl` 等指令，无法较好的对应。
* 参考 [How to disassemble a binary executable in Linux to get the assembly code?](https://stackoverflow.com/questions/5125896/how-to-disassemble-a-binary-executable-in-linux-to-get-the-assembly-code), [How to disassemble one single function using objdump?](https://stackoverflow.com/questions/22769246/how-to-disassemble-one-single-function-using-objdump) 将二进制文件反编译为汇编代码，并仅选取 `main` 函数
  * `objdump -S a.out  | awk -F"\n" -v RS="\n\n" '$1 ~ /main/'`


# Code Example


### 16 位机器汇编样例

```sh
# 源码
$ cat hello.c
int main() { int a = 1; int b = 2; int c = a + b; return c; }

# 编译
$ gcc -mtune=i386 -m16 hello.c

# 查看二进制与汇编
$ objdump -S a.out  | awk -F"\n" -v RS="\n\n" '$1 ~ /main/'
080482a0 <__libc_start_main@plt>:
 80482a0:       ff 25 64 96 04 08       jmp    *0x8049664
 80482a6:       68 08 00 00 00          push   $0x8
 80482ab:       e9 d0 ff ff ff          jmp    8048280 <_init+0x2c>
080483ab <main>:
 80483ab:       66 55                   push   %bp
 80483ad:       66 89 e5                mov    %sp,%bp
 80483b0:       66 83 ec 10             sub    $0x10,%sp
 80483b4:       67 66 c7 45 fc 01 00    movw   $0x1,-0x4(%di)
 80483bb:       00 00                   add    %al,(%eax)
 80483bd:       67 66 c7 45 f8 02 00    movw   $0x2,-0x8(%di)
 80483c4:       00 00                   add    %al,(%eax)
 80483c6:       67 66 8b 55 fc          mov    -0x4(%di),%dx
 80483cb:       67 66 8b 45 f8          mov    -0x8(%di),%ax
 80483d0:       66 01 d0                add    %dx,%ax
 80483d3:       67 66 89 45 f4          mov    %ax,-0xc(%di)
 80483d8:       67 66 8b 45 f4          mov    -0xc(%di),%ax
 80483dd:       66 c9                   leavew
 80483df:       66 c3                   retw
 80483e1:       66 90                   xchg   %ax,%ax
 80483e3:       66 90                   xchg   %ax,%ax
 80483e5:       66 90                   xchg   %ax,%ax
 80483e7:       66 90                   xchg   %ax,%ax
 80483e9:       66 90                   xchg   %ax,%ax
 80483eb:       66 90                   xchg   %ax,%ax
 80483ed:       66 90                   xchg   %ax,%ax
 80483ef:       90                      nop
```

### 32 位机器汇编样例

```sh
# 源码
$ cat hello.c
int main() { int a = 1; int b = 2; int c = a + b; return c; }

# 编译
$ gcc -m32 hello.c

# 查看二进制与汇编
$ objdump -S a.out  | awk -F"\n" -v RS="\n\n" '$1 ~ /main/'
080482a0 <__libc_start_main@plt>:
 80482a0:       ff 25 44 96 04 08       jmp    *0x8049644
 80482a6:       68 08 00 00 00          push   $0x8
 80482ab:       e9 d0 ff ff ff          jmp    8048280 <_init+0x2c>
080483ab <main>:
 80483ab:       55                      push   %ebp
 80483ac:       89 e5                   mov    %esp,%ebp
 80483ae:       83 ec 10                sub    $0x10,%esp
 80483b1:       c7 45 fc 01 00 00 00    movl   $0x1,-0x4(%ebp)
 80483b8:       c7 45 f8 02 00 00 00    movl   $0x2,-0x8(%ebp)
 80483bf:       8b 55 fc                mov    -0x4(%ebp),%edx
 80483c2:       8b 45 f8                mov    -0x8(%ebp),%eax
 80483c5:       01 d0                   add    %edx,%eax
 80483c7:       89 45 f4                mov    %eax,-0xc(%ebp)
 80483ca:       8b 45 f4                mov    -0xc(%ebp),%eax
 80483cd:       c9                      leave
 80483ce:       c3                      ret
 80483cf:       90                      nop
```

