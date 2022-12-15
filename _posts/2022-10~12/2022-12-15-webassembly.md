---
layout: post
title:  "WebAssembly HelloWorld"
date:  2022-12-15
tags: [note]
---

  了解一下 WebAssembly 的原理。
* x86 assembly 可查看 [x86 Assembly on MacOS](https://zhoukekestar.github.io/notes/2022/12/10/x86-assembly.html)
* arm64 assembly 可查看 [ARM Assembly on MacOS](https://zhoukekestar.github.io/notes/2022/12/11/arm-assembly.html) 和 [ARM Assembly HelloWorld on MacOS](https://zhoukekestar.github.io/notes/2022/12/11/arm-assembly-svc.html)


# 环境准备

* 安装 [emscripten](https://emscripten.org/docs/getting_started/downloads.html)
  * Mac 可直接通过 [brew](https://formulae.brew.sh/formula/emscripten) 来安装：`brew install emscripten`
* 安装 [wabt](https://github.com/webassembly/wabt) The WebAssembly Binary Toolkit
  * Mac 可直接使用 `brew install wabt` 来安装。

# Quick Start

  新建 `mian.c` 文件

```c
#include<stdio.h>

int main() {
  printf("hello world\n");
}

```

  Run it by NodeJS

```sh
# compile c-lang
$ emcc main.c

# run code by NodeJS
$ node a.out.js
hello, world!
```

  Run it by Browser

```sh
# compile it & default html page
$ emcc main.c -O3 -o main.html

# start a static http server
$ npx serve .

# open it
$ open http://localhost:5000/main.html
```

# 最简单的 a + b 实现

  参考：https://depth-first.com/articles/2019/10/16/compiling-c-to-webassembly-and-running-it-without-emscripten/

  新建 `main.c`

```c
int add (int first, int second)
{
  return first + second;
}
```

  新建 `main.html`

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <script type="module">
      (async() => {
        const response = await fetch('main.wasm');
        const bytes = await response.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(bytes);

        console.log('The answer is: ' + instance.exports.add(1, 2));
      })();
    </script>
  </body>
</html>
```

```sh
# 如果报 `no available targets are compatible`，可以查看一下后面章节的常见问题
$ clang --target=wasm32 --no-standard-libraries -Wl,--export-all -Wl,--no-entry -o main.wasm main.c

# 启动静态资源服务器
$ npx serve .

# 打开页面
$ open http://localhost:5000/main.html
```

# WebAssembly 二进制逐字解析

  新建 `main.wat` 文件，实现一个最简单的 `1 + 2 = 3` 的程序，因为正常的打印输出涉及 `import`， 所以，为简单起见，直接 return pop 最后一个元素了。

  PS: start 函数是不支持返回值的，所以外部获取不到最终的 return 结果。

```wat
(module
  (func
    i32.const 1
    i32.const 2
    i32.add
    return
  )
  (start 0)
)
```

  使用 `wat2wasm` 编译上述文件，并查看最终的二进制文件。

```sh
$ wat2wasm main.wat

$ xxd -c 8 hello.wasm
00000000: 0061 736d 0100 0000  .asm....
00000008: 0104 0160 0000 0302  ...`....
00000010: 0100 0801 000a 0a01  ........
00000018: 0800 4101 4102 6a0f  ..A.A.j.
00000020: 0b                   .
```

  字节码与指令对应分析，参考 [WebAssembly Opcodes](https://pengowray.github.io/wasm-ops/), [learning-webassembly-2-wasm-binary-format](https://blog.ttulka.com/learning-webassembly-2-wasm-binary-format/)


<table>
<thead>
<tr>
<th align="center">地址</th>
<th align="center">1</th>
<th align="center">2</th>
<th align="center">3</th>
<th align="center">4</th>
<th align="center">5</th>
<th align="center">6</th>
<th align="center">7</th>
<th align="center">8</th>
</tr>
</thead>
<tbody><tr>
<td align="center">00000000</td>
<td align="center">00</td>
<td align="center">61</td>
<td align="center">73</td>
<td align="center">6d</td>
<td align="center">01</td>
<td align="center">00</td>
<td align="center">00</td>
<td align="center">00</td>
</tr>
<tr>
<td align="center">备注</td>
<td align="center" colspan="4">asm 文件类型标记</td>
<td align="center" colspan="4">版本标记</td>
</tr>
<tr>
<td align="center">00000008</td>
<td align="center">01</td>
<td align="center">04</td>
<td align="center">01</td>
<td align="center">06</td>
<td align="center">00</td>
<td align="center">00</td>
<td align="center">03</td>
<td align="center">02</td>
</tr>
<tr>
<td align="center">备注</td>
<td align="center"><b>类型区块<sup>[1]</sup></b></td>
<td align="center">总 4 字节<sup>[1]</sup></td>
<td align="center">类型向量 1 个<sup>[2]</sup></td>
<td align="center">类型为函数<sup>[3]</sup><sup>[4]</sup></td>
<td align="center">0 个入参<sup>[4]</sup></td>
<td align="center">0 个出参<sup>[4]</sup></td>
<td align="center"><b>函数区块<sup>[1]</sup><sup>[5]</sup></b></td>
<td align="center">共 2 字节<sup>[1]</sup></td>
</tr>
<tr>
<td align="center">00000010</td>
<td align="center">01</td>
<td align="center">00</td>
<td align="center">08</td>
<td align="center">01</td>
<td align="center">00</td>
<td align="center">0a</td>
<td align="center">0a</td>
<td align="center">01</td>
</tr>
<tr>
<td align="center">备注</td>
<td align="center">函数数量为1<sup>[2]</sup><sup>[5]</sup></td>
<td align="center">函数编号为 0<sup>[5]</sup></td>
<td align="center"><b>开始区块<sup>[1]</sup><sup>[6]</sup></b></td>
<td align="center">共 1 字节<sup>[1]</sup></td>
<td align="center">调用函数编号为 0<sup>[6]</sup></td>
<td align="center"><b>代码区块<sup>[1]</sup></b></td>
<td align="center">共 10 字节<sup>[1]</sup></td>
<td align="center">代码向量个数为1<sup>[7]</sup></td>
</tr>
<tr>
<td align="center">00000018</td>
<td align="center">08</td>
<td align="center">00</td>
<td align="center">41</td>
<td align="center">01</td>
<td align="center">41</td>
<td align="center">02</td>
<td align="center">6a</td>
<td align="center">0f</td>
</tr>
<tr>
<td align="center">备注</td>
<td align="center">代码共 8 字节<sup>[7]</sup></td>
<td align="center">本地变量数量为 0<sup>[7]</sup></td>
<td align="center">i32.const 指令<sup>[8]</sup></td>
<td align="center">值为 1</td>
<td align="center">i32.const 指令<sup>[8]</sup></td>
<td align="center">值为 2</td>
<td align="center">i32.add 指令<sup>[8]</sup></td>
<td align="center">return 指令<sup>[8]</sup></td>
</tr>
<tr>
<td align="center">00000020</td>
<td align="center">0b</td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
</tr>
<tr>
<td align="center">备注</td>
<td align="center">end 指令<sup>[8]</sup></td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
<td align="center"></td>
</tr>
</tbody>
</table>



表格参考:

1. [https://webassembly.github.io/spec/core/binary/modules.html#sections](https://webassembly.github.io/spec/core/binary/modules.html#sections)
> Each section consists of
> - a one-byte section _id_,
> - the u32 _size_ of the contents, in bytes,
> - the actual _contents_, whose structure is depended on the section id.
>
> For most sections, the contents B encodes a [vector](https://webassembly.github.io/spec/core/binary/conventions.html#binary-vec).
>
> 每个区块由【区块 ID (即类型)】+ 【区块大小】 + 【区块内容】组成，区块内容在大多数情况下为向量。0x01 为类型、0x03 为函数、0x08 为开始、0x0a 为代码。

2. [https://webassembly.github.io/spec/core/binary/conventions.html#binary-vec](https://webassembly.github.io/spec/core/binary/conventions.html#binary-vec)
> [Vectors](https://webassembly.github.io/spec/core/syntax/conventions.html#syntax-vec) are encoded with their u32 length followed by the encoding of their element sequence.
>
> 每个向量由【向量个数】+ 【向量】组成

3. [https://webassembly.github.io/spec/core/appendix/index-types.html](https://webassembly.github.io/spec/core/appendix/index-types.html)
> 类型为 0x60 为函数类型

4. [https://webassembly.github.io/spec/core/syntax/types.html#syntax-functype](https://webassembly.github.io/spec/core/syntax/types.html#syntax-functype)
> _Function types_ classify the signature of [functions](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-func), mapping a vector of parameters to a vector of results.
>
> 函数类型，后续跟两个类型，分别为入参和出参。

5. [https://webassembly.github.io/spec/core/binary/modules.html#binary-funcsec](https://webassembly.github.io/spec/core/binary/modules.html#binary-funcsec)
> It decodes into a vector of [type indices](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-typeidx) that represent the type fields of the [functions](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-func) in the funcs component of a [module](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-module).
>
> 函数区块后面跟一个代码函数编码的向量。

6. [https://webassembly.github.io/spec/core/binary/modules.html#binary-startsec](https://webassembly.github.io/spec/core/binary/modules.html#binary-startsec)
> The _start section_ has the id 8. It decodes into an optional [start function](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-start) that represents the start component of a [module](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-module).
>
> 开始区块，可以通过直接指定函数 id 编号来执行。

7. [https://webassembly.github.io/spec/core/binary/modules.html#code-section](https://webassembly.github.io/spec/core/binary/modules.html#code-section)
> They represent the locals and body field of the [functions](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-func) in the funcs component of a [module](https://webassembly.github.io/spec/core/syntax/modules.html#syntax-module).
> codedesc = vec(code)
> code = size + func
> func = locals + expr
>
> 由于没有本地变量，所以直接是函数个数说明，已经后续跟进的函数体的大小。

8. [https://webassembly.github.io/spec/core/appendix/index-instructions.html](https://webassembly.github.io/spec/core/appendix/index-instructions.html)
>
> 表达式指令集

# Debug on Browser

  Chrome 已原生支持 WASM 调试，当上述代码执行之后，可以看到 stack 的最终 value 为 3，符合预期。

  ![image](https://user-images.githubusercontent.com/7157346/207794582-144e7e5c-8a67-4f15-8ccd-eb25760747c1.png)

# 常见问题

* 执行 clang 的时候，报 `no available targets are compatible`
  * 参考 [172](https://github.com/WebAssembly/wasi-sdk/issues/172), 需要安装最新的 llvm： `brew install llvm`，而非 mac 自带的 clang 工具。

# 参考

* https://wasmbyexample.dev/examples/hello-world/hello-world.c.en-us.html
* https://pengowray.github.io/wasm-ops/
* https://depth-first.com/articles/2019/10/16/compiling-c-to-webassembly-and-running-it-without-emscripten/
* https://developer.mozilla.org/en-US/docs/WebAssembly/Text_format_to_wasm
* https://github.com/webassembly/wabt
* https://webassembly.github.io/spec/core/binary/index.html#high-level-structure
* http://troubles.md/wasm-is-not-a-stack-machine/
