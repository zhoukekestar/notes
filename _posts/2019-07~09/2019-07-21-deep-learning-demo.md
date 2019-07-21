---
layout: post
title:  "Deep Learning 之 Hello World Demo"
date:  2019-07-21
tags: [AI, math]
commentIssueId: 100
use_math: true
---



数字识别 Demo，基于 [Python](https://github.com/mnielsen/neural-networks-and-deep-learning) 训练出的模型，将 b 和 w 取出，并将 feedForward 函数用 JS 实现。效果并不是太好，但在模拟训练集的笔画后，大体上能识别出来。
* 效果展现
* 核心代码
* 在线 Demo
* Python 参数获取



## 效果展现


<img src="https://img.alicdn.com/tfs/TB1relZa1H2gK0jSZFEXXcqMpXa-844-928.gif" alt="" width="400">



## Demo JS 代码

最核心的代码如下，通过 [numjs](https://www.npmjs.com/package/numjs) 用于实现


$$
a^{(L)} = \sigma (w^{(L)}a^{(L - 1)} + b^{(L)})
$$




```js
class NetWork {
  constructor(sizes, biases, weights) {
    this.num_layers = sizes.length;
    this.sizes = sizes;
    this.biases = biases;
    this.weights = weights;
  }

  feedForward(input) {
    var a = nj.array(input);
    for (var layer = 1; layer < this.num_layers; layer++) {
      var weights = nj.array(this.weights[layer - 1]);
      var biases = nj.array(this.biases[layer - 1]);

      a = nj.sigmoid(
        nj.add(
          nj.dot(weights, a).reshape(biases.shape),
          biases
        )
      );
    }

    return a;
  }
}
```









## 在线Demo



<iframe height='400' src="https://zhoukekestar.github.io/notes/HTML/2019-07~09/deep-learning-demo/index.html"></iframe>
## Python 取出参数代码



```python

fo = open('w0.txt', 'w')
np.set_printoptions(threshold = np.prod(self.weights[0].shape))
fo.write(repr(self.weights[0]));
fo.close();

fo = open('w1.txt', 'w')
np.set_printoptions(threshold = np.prod(self.weights[1].shape))
fo.write(repr(self.weights[1]));
fo.close();

fo = open('b0.txt', 'w')
np.set_printoptions(threshold = np.prod(self.biases[0].shape))
fo.write(repr(self.biases[0]));
fo.close();

fo = open('b1.txt', 'w')
np.set_printoptions(threshold = np.prod(self.biases[1].shape))
fo.write(repr(self.biases[1]));
fo.close();
```





## References

* [Canvas 画数字](https://stackoverflow.com/questions/22891827/how-do-i-hand-draw-on-canvas-with-javascript)

* [numjs](https://www.npmjs.com/package/numjs)

* [Python 代码](https://github.com/mnielsen/neural-networks-and-deep-learning)

  