---
layout: post
title:  "逻辑电路的实现"
date:   2018-05-05
tags: [computer]
commentIssueId: 77
---

了解完二极管和 PM 结原理后，就可以看懂简单的逻辑电路了
* 载流子
* 场效应管
* 与门 AND
  * 二极管实现
  * 继电器实现
  * CMOS 实现
  * NMOS 实现
* 或门 OR
* 或非 NOR
* 与非 NAND


## 载流子

> 在[物理学](https://zh.wikipedia.org/wiki/%E7%89%A9%E7%90%86%E5%AD%A6)中，**载流子**（charge carrier）简称**载子**（carrier），指可以自由移动的带有[电荷](https://zh.wikipedia.org/wiki/%E7%94%B5%E8%8D%B7)的物质微粒，如[电子](https://zh.wikipedia.org/wiki/%E7%94%B5%E5%AD%90)和[离子](https://zh.wikipedia.org/wiki/%E7%A6%BB%E5%AD%90)。在[半导体](https://zh.wikipedia.org/wiki/%E5%8D%8A%E5%AF%BC%E4%BD%93)物理学中，电子流失导致共价键上留下的空位（[空穴](https://zh.wikipedia.org/wiki/%E7%A9%BA%E7%A9%B4)）被视为载流子。
>
> — Wiki

> 在半导体中，电子和空穴作为载流子。数目较多的载流子称为**多数载流子**；在[N型半导体](https://zh.wikipedia.org/wiki/N%E5%9E%8B%E5%8D%8A%E5%AF%BC%E4%BD%93)中多数载流子是[电子](https://zh.wikipedia.org/wiki/%E7%94%B5%E5%AD%90)，而在[P型半导体](https://zh.wikipedia.org/wiki/P%E5%9E%8B%E5%8D%8A%E5%AF%BC%E4%BD%93)中多数载流子是[空穴](https://zh.wikipedia.org/wiki/%E7%A9%BA%E7%A9%B4)。数目较少的载流子称为**少数载流子**；在[N型半导体](https://zh.wikipedia.org/wiki/N%E5%9E%8B%E5%8D%8A%E5%AF%BC%E4%BD%93)中少数载流子是空穴，而在[P型半导体](https://zh.wikipedia.org/wiki/P%E5%9E%8B%E5%8D%8A%E5%AF%BC%E4%BD%93)中少数载流子是电子。[[1\]](https://zh.wikipedia.org/wiki/%E8%BD%BD%E6%B5%81%E5%AD%90#cite_note-1)
>
> — Wiki



## 场效应管

> 场效应管**（英语：**f**ield-**e**ffect **t**ransistor，缩写：**FET**）是一种通过电场效应控制电流的电子元件。
>
> 它依靠[电场](https://zh.wikipedia.org/wiki/%E7%94%B5%E5%9C%BA)去控制导电沟道形状，因此能控制[半导体材料](https://zh.wikipedia.org/wiki/%E5%8D%8A%E5%AF%BC%E4%BD%93%E6%9D%90%E6%96%99)中某种类型[载流子](https://zh.wikipedia.org/wiki/%E8%BD%BD%E6%B5%81%E5%AD%90)的沟道的[导电性](https://zh.wikipedia.org/wiki/%E5%AF%BC%E7%94%B5%E6%80%A7)。
>
> — Wiki

G 栅极通过控制电压，控制 P 沟道的载流子，从而控制 PN 结的宽度，参考：[场效应管及其放大电路](https://wenku.baidu.com/view/af0f46f6ff00bed5b8f31dc5.html)

![](https://user-images.githubusercontent.com/7157346/39669895-2c8bb7a2-512b-11e8-8da4-89891b3ee889.png)

在 Vgs 为 0 时，PN 结最小，导电 N 沟道最宽，导电性能最好

![](https://user-images.githubusercontent.com/7157346/39669896-2cd3973e-512b-11e8-9dbe-599ef71d016c.png)

当 Vgs 负电压增大，电子流入 P 沟道，P 沟道载流子减少，N 沟道为平衡 PN 结的内电场，N 沟道的载流子也变小，从而导致 PN 结变宽。

![](https://user-images.githubusercontent.com/7157346/39669897-2d1a3248-512b-11e8-8598-edabd33db2ed.png)

Vds 的原理大致与 Vgs 相同

![](https://user-images.githubusercontent.com/7157346/39669898-2d7f1e1a-512b-11e8-8286-9be19deed2b0.png)

当 Vds 增强时，也会出现沟道夹断的情况。

![](https://user-images.githubusercontent.com/7157346/39669899-2dca9fe8-512b-11e8-9655-59081c004527.png)

此处还待进一步思考

![](https://user-images.githubusercontent.com/7157346/39669900-2e1509ca-512b-11e8-9b75-f199c0978d31.png)

## 与门

#### 二极管电路实现

vcc：电路供电电压 为10v，假设 3v 以上为高电平，3v 以下为低电平。参考：[二极管与门电路原理](https://blog.csdn.net/gdt_a20/article/details/7229989)

![0_1328201398t6qs](https://user-images.githubusercontent.com/7157346/39664844-8b6045c8-50bc-11e8-8eaa-7b09dd6fbe23.gif)

| ua             | ub             | uy       |
| -------------- | -------------- | -------- |
| 0（正偏）/ 0   | 0（正偏）/ 0   | 0.7v / 0 |
| 3v （反偏）/ 1 | 0 （正偏）/ 0  | 0.7v / 0 |
| 0 （正偏）/ 0  | 3v （反偏）/ 1 | 0.7v / 0 |
| 3v （正偏）/ 1 | 3v （正偏）/ 1 | 3.7v / 1 |

#### 继电器实现

* 仅 A、B 都为高电平，使继电器将开关闭合，从而使得 Y 导通为高电平。

![200px-relay_and svg](https://user-images.githubusercontent.com/7157346/39669460-cb4e7774-511e-11e8-91b2-1e3512934cc3.png)



#### CMOS与门

PN结指向内的为NMOS管, PN 结指向外部的为 PMOS [4]

> NMOS的特性，Vgs大于一定的值就会导通，适合用于源极接地时的情况（低端驱动），只要栅极电压达到4V或10V就可以了。
>   PMOS的特性，Vgs小于一定的值就会导通，适合用于源极接VCC时的情况（高端驱动）。但是，虽然PMOS可以很方便地用作高端驱动，但由于导通电阻大，价格贵，替换种类少等原因，在高端驱动中，通常还是使用NMOS。[5]



T1, T2, T5 为 PMOS，0 导通，1 不导通

T3，T4，T6 为 NMOS，1 导通，0 不导通

| A，B | T1，T2，T3，T4     | T5，T6 栅极 | T5，T6   | Y    |
| ---- | ------------------ | ----------- | -------- | ---- |
| 0，0 | 通，通，不通，不通 | 1           | 不通，通 | 0    |
| 1，0 | 不通，通，通，不通 | 1           | 不通，通 | 0    |
| 0，1 | 通，不通，不通，通 | 1           | 不通，通 | 0    |
| 1，1 | 不通，不通，通，通 | 0           | 通，不通 | 1    |



![500px-cmos_and svg](https://user-images.githubusercontent.com/7157346/39670137-ac0f34d6-5130-11e8-8001-351b6b6d7748.png)

#### NMOS 与门

假设与 a 直连的 NMOS 为 T1，与 b 直连的 NMOS 为 T2，与 F 直连的为 T3

* 仅 a、b 都为 1 时，T3 栅极为低电平，从而 T3 不导通，导致 F 为高电平
* 其余情况，任意 a、b 为 0 时，与 T3 栅极为高电平并导通，使得 F 接地，为低电平。

![nmos_and_gate](https://user-images.githubusercontent.com/7157346/39670138-ad4438b0-5130-11e8-9c9f-b4ed43d4b3ae.png)

## 或门

![5bafa40f4bfbfbed37bb4ed672f0f736aec31fbc](https://user-images.githubusercontent.com/7157346/39664893-7563558e-50bd-11e8-8e5a-8af85ebab2dc.jpg)

| A              | B              | L      |
| -------------- | -------------- | ------ |
| 0（正偏）/ 0   | 0（正偏）/ 0   | 0v / 0 |
| 5v （正偏）/ 1 | 0 （反偏）/ 0  | 5v / 1 |
| 0 （反偏）/ 0  | 5v （正偏）/ 1 | 5v / 1 |
| 5v （正偏）/ 1 | 5v （正偏）/ 1 | 5v / 1 |

## 非门

* a 高电平时，F 接地为低电平，反之成立

![nmos_not](https://user-images.githubusercontent.com/7157346/39670175-81f94fb4-5131-11e8-9880-ab8e83372978.png)



## 或非 NOR

或非门具有[函数完备性](https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0%E5%AE%8C%E5%A4%87%E6%80%A7)，和与非门一样可以仅用其实现其他所有的逻辑功能。

电路图如下，并假设与 a 直连的 MOS 为 T1，与 b 直连的 MOS 为 T2

![](https://upload.wikimedia.org/wikipedia/commons/a/ab/NMOS_NOR.png)

当 a、b 中任意一个为高电平，则 F 和 GND 连接为低电平，只有 a、b 都为低电平时，F 才为高电平。


| **输入**A | B    | **输出**A NOR B |
| --------- | ---- | --------------- |
| 0         | 0    | 1               |
| 0         | 1    | 0               |
| 1         | 0    | 0               |
| 1         | 1    | 0               |

## 与非 NAND

| NMOS                                                         | CMOS                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![](https://upload.wikimedia.org/wikipedia/commons/e/e8/Nmos_enhancement_saturated_nand.svg) | ![](https://upload.wikimedia.org/wikipedia/commons/d/d7/Cmos_nand.svg) |

NMOS, 仅 A，B 都为高电平使得 T2，T3 导通，Y 才为低电平

CMOS 如下：

| A，B | T1，T2，T3，T4     | Y    |
| ---- | ------------------ | ---- |
| 0，0 | 通，通，不通，不通 | 1    |
| 0，1 | 通，不通，不通，通 | 1    |
| 1，0 | 不通，通，通，不通 | 1    |
| 1，1 | 不通，不通，通，通 | 0    |



## References

1. [二极管与门电路原理](https://blog.csdn.net/gdt_a20/article/details/7229989)
2. [场效应管及其放大电路](https://wenku.baidu.com/view/af0f46f6ff00bed5b8f31dc5.html)
3. [逻辑门](https://zh.wikipedia.org/wiki/%E9%82%8F%E8%BC%AF%E9%96%98)
4. [如何判断NMOS管和PMOS管？](https://jingyan.baidu.com/article/ceb9fb10c220a18cac2ba045.html)
5. [NMOS & PMOS](http://www.360doc.com/content/13/1115/17/532901_329468225.shtml)

   ​