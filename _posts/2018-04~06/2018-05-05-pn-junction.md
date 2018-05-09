---
layout: post
title:  "【加法笔记系列】PN 结和单向导通原理"
date:   2018-05-05
tags: [computer]
commentIssueId: 78
---

PN 结是二极管中最基本的单向导通原理
* 化学键
  * 离子键
  * 共价键
* 元素周期表
* PN 结
  * 原理
  * 形成
  * 正向偏置
  * 反向偏置

# PN 结



## 化学键

> 化学键有3种类型 ，即离子键、[共价键](https://baike.baidu.com/item/%E5%85%B1%E4%BB%B7%E9%94%AE)、[金属键](https://baike.baidu.com/item/%E9%87%91%E5%B1%9E%E9%94%AE)（氢键不是化学键，它是分子间力的一种）。
>
> — Baidu



#### 离子键

> 带相反[电荷](https://baike.baidu.com/item/%E7%94%B5%E8%8D%B7)离子之间的互相作用叫做离子键(Ionic Bond)，成键的本质是阴阳离子间的静电作用。
>
> — Baidu

> [阳离子](https://zh.wikipedia.org/wiki/%E6%AD%A3%E9%9B%A2%E5%AD%90)、[阴离子](https://zh.wikipedia.org/wiki/%E8%B2%A0%E9%9B%A2%E5%AD%90)通过静电作用形成的化学键称作**离子键**。两个原子间的[电负性](https://zh.wikipedia.org/wiki/%E7%94%B5%E8%B4%9F%E6%80%A7)相差极大时，一般是金属与非金属，例如：[氯](https://zh.wikipedia.org/wiki/%E6%B0%AF)与[钠](https://zh.wikipedia.org/wiki/%E9%88%89)，若他们要结合，电负性大的氯会从电负性小的钠抢走一个[电子](https://zh.wikipedia.org/wiki/%E9%9B%BB%E5%AD%90)，以符合[八隅体](https://zh.wikipedia.org/wiki/%E5%85%AB%E9%9A%85%E9%AB%94)。之后氯会以-1价的方式存在，而钠则以+1价的方式存在，两者再以[库仑静电力](https://zh.wikipedia.org/wiki/%E5%BA%93%E4%BB%91%E5%AE%9A%E5%BE%8B)因正负相吸而结合在一起。
>
> — Wiki

`Na` 在元素周期表中为 11，意味着有 11 个质子，根据外层电子排布，分别为 2, 8, 1, 所以，Na 容易失去电子呈现 `+1` ，`F` 同理容易得到电子，由此得到的 `NaF` 就形成了离子键。

![7c1ed21b0ef41bd5be1c647a58da81cb38db3df4](https://user-images.githubusercontent.com/7157346/39663298-5ea091f0-50a3-11e8-8944-4eb0988362ab.jpg)



#### 共价键

> 共价键（Covalent Bond）是原子间通过共用电子对（[电子云](https://baike.baidu.com/item/%E7%94%B5%E5%AD%90%E4%BA%91)重叠）而形成的相互作用
>
> — Baidu

> 原子间通过共用电子形成的化学键，叫做**共价键**。它通过两个电负度相近的原子，例如两个[氧](https://zh.wikipedia.org/wiki/%E6%B0%A7)，互相共用其外围电子以符合八隅体的键结方式结合，因此也有人说这是非金属原子间的结合方式。
>
> — Wiki



#### 金属键

>  化学键的一种，主要在金属中存在。由[自由电子](https://baike.baidu.com/item/%E8%87%AA%E7%94%B1%E7%94%B5%E5%AD%90)及排列成晶格状的金属离子之间的[静电](https://baike.baidu.com/item/%E9%9D%99%E7%94%B5)吸引力组合而成。由于电子的自由运动，金属键没有固定的方向，因而是[非极性键](https://baike.baidu.com/item/%E9%9D%9E%E6%9E%81%E6%80%A7%E9%94%AE)。
>
> — Baidu

#### 极性键

> [极性键](https://baike.baidu.com/item/%E6%9E%81%E6%80%A7%E9%94%AE)是在化合物分子中，不同种[原子](https://baike.baidu.com/item/%E5%8E%9F%E5%AD%90)形成的[共价键](https://baike.baidu.com/item/%E5%85%B1%E4%BB%B7%E9%94%AE)，由于两个原子吸引电子的能力不同，[共用电子对](https://baike.baidu.com/item/%E5%85%B1%E7%94%A8%E7%94%B5%E5%AD%90%E5%AF%B9)必然偏向吸引电子能力较强的原子一方，因而吸引电子能力较弱的原子一方相对的显正电性。这样的共价键叫做**极性共价键**，简称**极性键。**
>
> — Baidu



## 元素周期表

单一元素可以以共价键形式组成，如 H2，O2

NaCl 以离子键（极性键）组成。Na 电子层排布：2-8-1，Cl 电子层排布：2-8-7，一个容易失去电子，一个容易得到电子。

同位素：由于元素周期表是以质子数数量为排序依据，而未考虑中子数，所以，中子数不同，而质子数不同的元素称为同位素。

![timg](https://user-images.githubusercontent.com/7157346/39663267-c034e6ba-50a2-11e8-9b29-80097589a0b5.jpeg) 



## PM 结

>  一块半导体晶体一侧[掺杂](https://zh.wikipedia.org/wiki/%E6%8E%BA%E6%9D%82_(%E5%8D%8A%E5%AF%BC%E4%BD%93))成P型半导体，另一侧掺杂成N型半导体，中间二者相连的接触面称为**PN结**（英语：**pn junction**）。PN结是[电子技术](https://zh.wikipedia.org/wiki/%E7%94%B5%E5%AD%90%E6%8A%80%E6%9C%AF)中许多元件，例如半导体[二极管](https://zh.wikipedia.org/wiki/%E4%BA%8C%E6%A5%B5%E7%AE%A1)、[双极性晶体管](https://zh.wikipedia.org/wiki/%E5%8F%8C%E6%9E%81%E6%80%A7%E6%99%B6%E4%BD%93%E7%AE%A1)的物质基础。
>
> — Wiki

![600px-pn_junction_open_circuited_zh_hans svg](https://user-images.githubusercontent.com/7157346/39663990-e7a3abee-50ae-11e8-94aa-5d16a19d447e.png)

### PM 结的基本原理

> 掺入少量杂质[硼](https://zh.wikipedia.org/wiki/%E7%A1%BC)元素（或[铟](https://zh.wikipedia.org/wiki/%E9%93%9F)元素）的硅晶体（或锗晶体）中，由于半导体原子（如硅原子）被杂质原子取代，硼原子外层的三个外层电子与周围的半导体原子形成共价键的时候，会产生一个“空穴”，这个空穴可能吸引束缚电子来“填充”，使得硼原子成为带负电的离子。这样，这类半导体由于含有较高浓度的“空穴”（“相当于”正电荷），成为能够导电的物质。

`Si` 电子层排布：`2-8-4`，纯 `Si` 在四周和 4 个 `Si` 元素共用 4 个外层电子，组成 4 个共价键，形成 4 + 4 的 8 电子数稳定结构。在此基础上，加入 `B` （电子排布：2-3），使其产生一个空穴。



![203446wdw3d3k86rkdw2bd](https://user-images.githubusercontent.com/7157346/39663970-9bc62c7e-50ae-11e8-814d-8c894707b206.gif)

> 掺入少量杂质[磷](https://zh.wikipedia.org/wiki/%E7%A3%B7)元素（或[锑](https://zh.wikipedia.org/wiki/%E9%94%91)元素）的[硅](https://zh.wikipedia.org/wiki/%E7%A1%85)晶体（或[锗](https://zh.wikipedia.org/wiki/%E9%94%97)晶体）中，由于半导体原子（如硅原子）被杂质原子取代，磷原子外层的五个外层[电子](https://zh.wikipedia.org/wiki/%E7%94%B5%E5%AD%90)的其中四个与周围的半导体原子形成[共价键](https://zh.wikipedia.org/wiki/%E5%85%B1%E4%BB%B7%E9%94%AE)，多出的一个电子几乎不受束缚，较为容易地成为自由电子。于是，N型半导体就成为了含自由电子浓度较高的半导体，其导电性主要是因为自由电子导电。

![203446hgryvchiyiiye1c7 1](https://user-images.githubusercontent.com/7157346/39663952-59eab9b4-50ae-11e8-837b-b600fa8f6020.gif)



### PN 结的形成

当 PN 级结合的时候，N 极多余电子会往 P 极扩展，形成一个内电场，这个内电场叫做 PN 结，也叫阻挡层、耗尽层、空间电荷区。

![2036580ipxc1cc0lpc3llc](https://user-images.githubusercontent.com/7157346/39663930-f9553bd8-50ad-11e8-83ef-d44521b96cfa.gif)

> 电子受到电场力作用会漂移向N级，但N级电子太多，还是会向P级扩散。两种运动形成了动态平衡，当然，不一定会像下面这个动画一样形成稳定的环形电流。



![203659un503x5u7rxfy09m](https://user-images.githubusercontent.com/7157346/39663929-f8e12a04-50ad-11e8-9986-e468c2b16c8a.gif)



#### 正向偏置

>  电源正极接P，负极接N，电荷会重新分布

![203452o7757o566omr7777](https://user-images.githubusercontent.com/7157346/39663928-f89903be-50ad-11e8-829a-5436b64df554.gif)

> 因为载流子多而且PN结窄,所以会形成比较大的电流。



![203449wxbu4tr2birwzqxn](https://user-images.githubusercontent.com/7157346/39663927-f84ea3aa-50ad-11e8-9fb3-fe0ed2f23191.gif)

负极电子的流入（外加电场）导致 PN 结变窄，从而使得电子的扩散运动得到增强，并形成正向电流

![34](https://user-images.githubusercontent.com/7157346/39663922-f6de3026-50ad-11e8-8dc7-9d02f4396da8.jpg)



#### 反向偏置

反向偏置使得 PN 结变宽

![203449isxbz7llf7plj7pp](https://user-images.githubusercontent.com/7157346/39663926-f807168e-50ad-11e8-8abe-0771db3bebb7.gif)



> 因为载流子少而且PN结太宽，所以电流会很小。

![203447rgw5gw1cwcwm3mg5](https://user-images.githubusercontent.com/7157346/39664635-894f00c0-50b8-11e8-9215-ebe7e0a4c386.gif)





![42](https://user-images.githubusercontent.com/7157346/39663923-f72ce766-50ad-11e8-9956-fa37096b8553.jpg)





## QA

- 同位素

  > **同位素**（英语：Isotope）是某种特定化学[元素](https://zh.wikipedia.org/wiki/%E5%85%83%E7%B4%A0)之下的不同种类，同一种元素下的所有同位素都具有相同[原子序数](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%AD%90%E5%BA%8F%E6%95%B0)，[质子](https://zh.wikipedia.org/wiki/%E8%B3%AA%E5%AD%90)数目相同，但[中子](https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%AD%90)数目却不同。这些同位素在[化学元素周期表](https://zh.wikipedia.org/wiki/%E5%8C%96%E5%AD%B8%E5%85%83%E7%B4%A0%E9%80%B1%E6%9C%9F%E8%A1%A8)中占有同一个位置，因此得名。

  > 例如[氢](https://zh.wikipedia.org/wiki/%E6%B0%AB)元素中[氘](https://zh.wikipedia.org/wiki/%E6%B0%98)和[氚](https://zh.wikipedia.org/wiki/%E6%B0%9A)，它们[原子核](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%AD%90%E6%A0%B8)中都有1个质子，但是它们的原子核中分别有0个中子、1个中子及2个中子，所以它们互为同位素。

- 工业制硅

  > 工业上，通常是在电炉中由[碳](https://zh.wikipedia.org/wiki/%E7%A2%B3)还原[二氧化硅](https://zh.wikipedia.org/wiki/%E4%BA%8C%E6%B0%A7%E5%8C%96%E7%A1%85)而制得：
  >
  > SiO2 + 2C → Si + 2CO

- 半导体

  > **半导体**（英语：Semiconductor）是指一种[导电性](https://zh.wikipedia.org/wiki/%E5%AF%BC%E7%94%B5%E6%80%A7)可受控制，范围可从[绝缘体](https://zh.wikipedia.org/wiki/%E7%B5%95%E7%B7%A3%E9%AB%94)至[导体](https://zh.wikipedia.org/wiki/%E5%B0%8E%E9%AB%94)之间的材料。常见的半导体材料有[硅](https://zh.wikipedia.org/wiki/%E7%A1%85)、[锗](https://zh.wikipedia.org/wiki/%E9%94%97)、[砷化镓](https://zh.wikipedia.org/wiki/%E7%A0%B7%E5%8C%96%E9%95%93)等，而硅更是各种半导体材料中，在商业应用上最具有影响力的一种。

- 二级管

  > [二极管](https://zh.wikipedia.org/wiki/%E4%BA%8C%E6%A5%B5%E7%AE%A1)（英语：**Diode**），是一种具有不对称[电导](https://zh.wikipedia.org/wiki/%E7%94%B5%E5%AF%BC)的双[电极](https://zh.wikipedia.org/wiki/%E7%94%B5%E6%9E%81)[电子元件](https://zh.wikipedia.org/wiki/%E7%94%B5%E5%AD%90%E5%85%83%E4%BB%B6)[[注 1\]](https://zh.wikipedia.org/wiki/%E4%BA%8C%E6%A5%B5%E7%AE%A1#cite_note-5)。理想的二极管在正向导通时两个电极（[阳极](https://zh.wikipedia.org/wiki/%E9%99%BD%E6%A5%B5)和[阴极](https://zh.wikipedia.org/wiki/%E9%99%B0%E6%A5%B5)）间拥有零电阻，而反向时则有无穷大电阻，即电流只允许由单一方向流过二极管。

### 

## References

* [PN 结动画](http://blog.sciencenet.cn/blog-729147-1033899.html)
* [PN 结工作原理](http://www.dgxue.com/chuji/dzjc/pnj/948.html)