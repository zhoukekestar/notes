---
layout: post
title:  "How to support Math in Jekyll"
date:  2019-01-22
tags: [Note]
commentIssueId: 100
use_math: true
---

通过一些简单的设置，让 Jekyll 支持 Math，以及几个表达式样例

## HOW
Just see the References.

## Some Math Tips
* inline math: $x$, $y$, $x_1$, $y_1​$
* example: $\frac{1}{2\pi}\int_{-\infty}^{\infty}e^{-\frac{x^2}{2}}dx$
* matrix:
$$
\zeta(s) = \sum_{n=1}^\infty \frac{1}{n^s}
  \begin{pmatrix}
  a & b \\
  c & d
  \end{pmatrix}
$$

除了使用 MathJax，还可以使用 [mathurl](http://mathurl.com/) 来内嵌，关于 mathjax 的总结: [mathjax](https://www.zybuluo.com/yangfch3/note/267947#21-%E7%9F%A9%E9%98%B5)

### References
* [how-to-support-latex-in-github-pages](https://stackoverflow.com/questions/26275645/how-to-support-latex-in-github-pages)
* [how-to-use-mathjax-in-jekyll-generated-github-pages](http://haixing-hu.github.io/programming/2013/09/20/how-to-use-mathjax-in-jekyll-generated-github-pages/)
