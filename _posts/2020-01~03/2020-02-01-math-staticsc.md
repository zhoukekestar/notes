---
layout: post
title:  "标准差"
date:  2020-02-01
tags: [math]
commentIssueId: 110
---



标准差的这个概念，遂搜索之。



## 标准差

* 公式：
  * 总体：![](https://img.alicdn.com/tfs/TB1dpchuG61gK0jSZFlXXXDKFXa-189-65.png)
  * 样本：![](https://img.alicdn.com/tfs/TB1y5ZauFY7gK0jSZKzXXaikpXa-216-65.png)

* 为什么要用标准差？https://www.shuxuele.com/data/standard-deviation.html#WhySquare

* 主要和正态分布一起看，来评估样本整体的分布和离散情况



## 标准分数

*  "标准分数"，英语 "sigma" 或 "Z分数"：数值**离开平均值的距离与标准差的比**（就是离开平均值有几个标准差），参考：https://www.shuxuele.com/data/standard-normal-distribution.html

* ![](https://img.alicdn.com/tfs/TB1h4QruG61gK0jSZFlXXXDKFXa-91-41.png)

  * **z** 是 "Z分数"（标准分数）
  * **x** 是要标准化的数值
  * **μ** 是平均
  * **σ** 是标准差

* 计算标准分数，其实是标准化的过程

  ![](https://img.alicdn.com/tfs/TB1TpsnuUT1gK0jSZFrXXcNCXXa-609-169.png)

  * 以上标准化过程，标准差为 20，平均值为 1010

* 而标准化的意义，在于能快速确定数据所处的概率分布情况

  * 68% 在平均值的 1 个标准差之内
  * 95% 在平均值的 2 个标准差之内
  * 99.7% 在平均值的 3 个标准差之内

  ![](https://img.alicdn.com/tfs/TB1fd.quNv1gK0jSZFFXXb0sXXa-650-329.png)





## 其他意思的笔记

#### 数据的分类



![](https://img.alicdn.com/tfs/TB1l1gauKT2gK0jSZFvXXXnFXXa-351-244.png)



#### 算数平均、几何平均、加权平均

* 几何平均：https://www.shuxuele.com/numbers/geometric-mean.html
  * 其实就是对不同维度的值进行乘法运算，再开几次方跟
  * 换种思考，其实是不同维度的向量，乘积之后的n 维单位矩阵。



#### 四分位数

* 参考：https://www.shuxuele.com/data/quartiles.html

* 之前一直在纠结如何分，其实也蛮简单的

  * 先但中位数求出 Q2，Q2 是中位数或相邻数的平均
  * Q1 和 Q3 是去除中位数之后（如有），剩余数组的各自中位数，方式和 Q2 相同

  

#### 离群值

* https://shuxuele.com/data/central-measures.html
* 如何剔除离群值？参考：https://blog.csdn.net/dulingwen/article/details/97006884
  * 3**σ** 法
  * 百分位法



## 参考

* 数学乐：https://www.shuxuele.com/

* https://zhuanlan.zhihu.com/p/71916111
* https://blog.csdn.net/dulingwen/article/details/97006884