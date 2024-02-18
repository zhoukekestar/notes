---
layout: post
title:  "WASM 二进制格式简析"
date:  2024-02-18
tags: [note]
---

  使用 wat 编写一个加法函数，编译到 wasm，解析二进制文件，并运行输出结果。

# wat

  新建一个 `1plus1.wat` 文件，编写 wat 的加法代码：

```wat
(module
  (func
    i32.const 23
    i32.const 45
    i32.add
    return
  )
  (start 0)
)
```

* 定义一个匿名函数
* 定义两个变量分别是 23、45
* 然后加一起
* return 用于忽略加法结果，因为 start 函数不能返回值
  * 加法结果，直接用运行的上下文中获取，来判断是否正确
* start 0 表示运行第一个函数


  为了尽量避免引入其他概念比如入参、出参、导出等，以上代码尽可能保持简洁。

  其他一些语法可参考 [wat](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format)


# 编译为 wasm

  在安装好 [wat2wasm](https://github.com/WebAssembly/wabt/releases) 后，使用 `wat2wasm` 命令将 wat 代码编译为 wasm：

```sh
$ wat2wasm ./1plus1.wat
```

  通过 `xxd ./1plus1.wasm` 可以查看其二进制格式：

```
$ xxd ./1plus1.wasm
00000000: 0061 736d 0100 0000 0104 0160 0000 0302  .asm.......`....
00000010: 0100 0801 000a 0a01 0800 4101 4101 6a0f  ..........A.A-j.
00000020: 0b
```



# 二进制

## 模块

  一个二进制 WASM 文件，就是一个 [Moudle](https://webassembly.github.io/spec/core/binary/modules.html#binary-module)。

  一个模块的组成由以下内容组成：
- magic = 0x00 61 73 6d = "\0asm" 4字节固定字符串
- version = 0x01 00 00 00 = 4字节固定版本，目前仅有 1.0 版本
- sections 段落，一般有类型段落、函数段落、代码段落等等。均可为空。

  所以一个最简单的 wasm 模块（没有任何段落）的代码如下：`(module)`
  其二进制文件格式：`0x0061 736d 0100 0000`


## 段落

  [Sections](https://webassembly.github.io/spec/core/binary/modules.html#sections)

  一个段落由以下三部分组成
- 段落标识符 ID，比如：0x01 表示类型段落、0x03 表示函数段落。
- 段落长度，由一个 `u32` 表示。
- 段落内容，由具体的段落描述来决定。

  有一个特殊说明是：函数段落的个数和代码段落的个数是相同，且一一对应的。

#### u32 说明

  根据文档 [integers](https://webassembly.github.io/spec/core/syntax/values.html#integers) 的说明，u32 的含义为 32 位的 unsigned integer （无符号整型）

  其格式编码根据 [LEB128](https://webassembly.github.io/spec/core/binary/values.html#integers) 来进行。所以，此处需要特别注意，不是常规意义上直接使用 4 个字节来表示。[types-signed-unsigned-integers](https://www.ibm.com/docs/en/aix/7.2?topic=types-signed-unsigned-integers)，当然也有比较多的讨论：

* https://github.com/WebAssembly/design/issues/601
* https://news.ycombinator.com/item?id=11263378

  采用 LEB128 可变长度的数字编码，主要优势是：
- 节省字节（正常的 32 位在数字较小的情况下，可直接用一个字节表示）
- 更好的数字位数扩展，后续需引入 128 位的整型，也可直接使用此编码扩展

```js
function leb128(bytes) {
  let bytesIndex = 0;
  let result = 0;
  let shift = 0;
  while (true) {
    const byte = bytes[bytesIndex++]

    // 将当前 byte 左移 7 的倍数后
    // 然后和 result 做或运算
    result |= (byte & 0b01111111) << shift;
    shift += 7;

    console.log(result.toString(2).padStart(28, '0').replace(/(\d{7})/g, '$1,'))
    if ((0b10000000 & byte) === 0) {

      // 最后一个字节的第二位为 1，说明是一个负数
      if (shift < 32 && (byte & 0b01000000) !== 0) {
        console.log('32 位负数处理')
        console.log(result.toString(2).padStart(32, '0'))
        // 打印负数二进制
        // https://stackoverflow.com/questions/16155592/negative-numbers-to-binary-string-in-javascript
        console.log((-123456 >>> 0).toString(2))

        // 仅需 shift 前的位数都置为 1 就是当前的负数
        return result | (-1 << shift);
      }

      return result;
    }
  }
}
console.log('leb128: 624485')
console.log(leb128([0xe5, 0x8e, 0x26]))
/*
leb128: 624485
0000000,0000000,0000000,1100101,
0000000,0000000,0001110,1100101,
0000000,0100110,0001110,1100101,
*/
console.log('leb128: -123456')
console.log(leb128([0xc0, 0xbb, 0x78]))
/*
leb128: -123456
0000000,0000000,0000000,1000000,
0000000,0000000,0111011,1000000,
0000000,1111000,0111011,1000000,
32 位负数处理
00000000000111100001110111000000
11111111111111100001110111000000
*/
```



## 详细标注


- magic: `0061 736d` 二进制文件识别码 (0x61 73 6d 解析为 ASCII 码为 "asm")
- version: `0100 0000` wasm 二进制文件的版本号

- sections:
  - section
    - type: `01` FunctionSection 类型段落
    - size: `04` 段落内容长度为 4
    - content:
      - verctor number: `01` 向量个数为 1
        - function types: `60` 函数类型，固定值
          - result type input: `00` 没有入参
          - retult type output: `00` 没有出参
  - section
    - type: `03` FunctionSection 函数段落
    - size: `02` 段落内容长度为 2
    - content:
      - vector number: `01` 向量个数为 1
        - type index: `00` 在类型段落中的向量索引下标
  - section
    - type: `08` StartSection 开始段落
    - size: `01` 段落内容长度为 1
    - content:
      - funcidx: `00` 启动函数索引下标值（即启动第一个函数）
  - section
    - type: `0a` CodeSection 代码段落
    - size: `0a`  段落内容长度为 10
    - content:
      - vector number: `01` 向量个数为 1
        - code size: `08` 代码长度为 8
        - code content:
          - locals: `00`  本地变量为 0 个
          - instructions:
            - i32.const: `41 01` 往栈中加入 1
            - i32.const: `41 01` 往栈中加入 1
            - i32.add: `6a`      执行加法函数
            - return: `0f`       返回空（否则默认返回加法结果 2）
            - end: `0b`          结束


# 运行源码

 [toy-wasm/1plus1](https://github.com/zhoukekestar/toy-wasm/tree/1plus1)

# References

* [wat](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format)
* [wat2wasm](https://github.com/WebAssembly/wabt/releases)
* [LEB128](https://en.wikipedia.org/wiki/LEB128)
* [types-signed-unsigned-integers](https://www.ibm.com/docs/en/aix/7.2?topic=types-signed-unsigned-integers)
